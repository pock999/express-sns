// 標籤(Hashtag)
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      code: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // options
      paranoid: true,

      hooks: {},
    }
  );
  Tag.associate = function (models) {};

  return Tag;
};
