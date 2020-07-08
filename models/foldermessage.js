

module.exports = (sequelize, DataTypes) => {
  const FolderMessage = sequelize.define(
    'FolderMessage',
    {
      folderId: DataTypes.INTEGER,
      messageId: DataTypes.INTEGER,
    },
    {},
  );
  return FolderMessage;
};
