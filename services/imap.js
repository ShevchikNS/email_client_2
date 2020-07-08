process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const Imap = require('imap');
const { inspect } = require('util');
const { simpleParser } = require('mailparser');
const logger = require('../utils/logger');
// const models = require('../models');
const crypto = require('./crypto');
const conf = require('../config/config.json');

const getEmailHost = (email) => {
  const host = email.substr(email.indexOf('@') + 1, email.length);
  return `imap.${host}`;
};

let imap = null; // TODO fix
const init = ({ username, password }) => { 
  console.log(crypto.decrypt(password), 'asdasd', password)
  const config = {
    user: username,
    password: 'ra2sub3w',
    host: getEmailHost(username),
    port: conf.imap.port,
    tls: true,
  };
  console.log(config);
  imap = new Imap(config);

  imap.connect();

  return new Promise(resolve => {
    imap.once('ready', () => resolve());
  });
};

const openInbox = () => {
  return new Promise((resolve, reject) => {
    imap.openBox('INBOX', true, (err, box) => {
      if (err) return reject(err)

      return resolve(box);
    });
  });
};

const fetchMessages = (start, count) => {
  const fetchedData = imap.seq.fetch(`${start}:${count}`, {
      bodies: '',
      struct: true
    });

  const messages = [];
  return new Promise(resolve => {
    fetchedData.on('message', (msg, seqno) => {
      //logger.info('Message #%d', seqno);

      msg.on('body', (stream) => {
        simpleParser(stream, (err, mail) => {
          // console.log(mail);
          if (err) {
            // logger
            return
          }
          const data = {
            subject: mail.subject,
            // text: mail.text,
            date: mail.date,
            from: mail.from.text,
          }
          messages.push(data);
          // saveMsg(mail)

          // logger.info(mail.headers.get('subject'));
          // logger.info(mail.text);
        });
      });

      msg.once('attributes', (attrs) => {
        // logger.info(`${prefix}Attributes: %s`, inspect(attrs, false, 8));
      });
      msg.once('end', () => {
        // logger.info(`${prefix}Finished`);
      });
    });
    fetchedData.once('error', (err) => {
      logger.info(`Fetch error: ${err}`);
    });
    fetchedData.once('end', () => {
      logger.info('Done fetching all messages!');
      resolve(messages);
    });
  });
};

module.exports = {
  openInbox,
  init,
  fetchMessages,
};
