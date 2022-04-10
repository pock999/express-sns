// 文章(按讚、倒讚)
module.exports = (sequelize, DataTypes) => {
  const PostLike = sequelize.define(
    'PostLike',
    {
      // 1 => 喜歡
      // -1 => 不喜歡
      isLike: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      // options
      paranoid: true,

      hooks: {},
    }
  );
  PostLike.associate = function (models) {};

  return PostLike;
};
