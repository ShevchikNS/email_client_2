process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const models = require('./models');
const config = require('./config/config.json');
const routes = require('./routes');
//const sendmail = require('./services/sendmail');


const app = express();

// For BodyParser
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// For Passport
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// For Handlebars
app.set('views', './views');
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: 'views/layouts',
    defaultLayout: 'layout',
  }),
);
app.set('view engine', '.hbs');

// load passport strategies
require('./lib/passport')(passport, models.user); // TODO rename model "user -> User"

app.use('/', routes);

app.listen(config.server.port, (err) => {
  if (err) {
    console.error(err, ['server error']);
  } else {
    console.info('Site is live');
  }
});
