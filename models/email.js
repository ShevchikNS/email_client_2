module.exports = (sequelize, DataTypes) => {
  const Email = sequelize.define(
    'Email',
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.TEXT,
    },
    {},
  );
  Email.associate = (models) => {
    Email.belongsToMany(models.User, {
      through: 'EmailUser',
      as: 'user',
      foreignKey: 'emailId',
    });
  };
  return Email;
};
