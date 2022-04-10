// 文章(回覆、評論)
module.exports = (sequelize, DataTypes) => {
  const PostComment = sequelize.define(
    'PostComment',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
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
