// 文章(回覆、評論)
module.exports = (sequelize, DataTypes) => {
  const PostComment = sequelize.define(
    'PostComment',
    {
      comment: {
        type: DataTypes.STRING(9999),
        allowNull: false,
      },
    },
    {
      // options
      paranoid: true,

      hooks: {},
    }
  );
  PostComment.associate = function (models) {
    // 回覆可以顯示最多2層

    // 1回覆可以有多個回覆
    PostComment.hasMany(models.PostComment, {
      foreignKey: 'PostCommentId',
    });
    models.PostComment.belongsTo(PostComment, {
      foreignKey: 'PostCommentId',
    });
  };

  return PostComment;
};
