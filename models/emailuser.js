module.exports = (sequelize, DataTypes) => {
  const EmailUser = sequelize.define(
    'EmailUser',
    {
      userId: DataTypes.INTEGER,
      emailId: DataTypes.INTEGER,
    },
    {},
  );
  return EmailUser;
};
