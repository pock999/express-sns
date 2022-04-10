// 文章
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(9999),
      },
    },
    {
      // options
      paranoid: true,

      hooks: {},
    }
  );
  Post.associate = function (models) {
    // 1使用者會有多個文章
    models.User.hasMany(Post);
    Post.belongsTo(models.User);

    // 文章可能有多個tag, tag同時也存在於多個文章
    Post.belongsToMany(models.Tag, {
      through: models.PostTag,
    });
    models.Tag.belongsToMany(Post, {
      through: models.PostTag,
    });

    // 1文章可能會有多個使用者按讚、評論, 1使用者可能會對多文章按讚、評論
    Post.belongsToMany(models.User, {
      through: models.PostComment,
    });
    models.User.belongsToMany(Post, {
      through: models.PostComment,
    });
  };

  return Post;
};
