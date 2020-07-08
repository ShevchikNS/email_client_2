module.exports = (sequelize, DataTypes) => {
  const Contacts = sequelize.define(
    'Contacts',
    {
      contactName: DataTypes.STRING,
      contactEmail: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {},
  );
  return Contacts;
};
