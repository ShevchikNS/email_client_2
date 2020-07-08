

module.exports = (sequelize, DataTypes) => {
  const Folder = sequelize.define(
    'Folder',
    {
      letterGroup: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {},
  );
  return Folder;
};
