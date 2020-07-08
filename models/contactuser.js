

module.exports = (sequelize, DataTypes) => {
  const ContactUser = sequelize.define(
    'ContactUser',
    {
      userId: DataTypes.INTEGER,
      contactId: DataTypes.INTEGER,
    },
    {},
  );
  return ContactUser;
};
