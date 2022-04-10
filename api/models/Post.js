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

      // 讚數
      likeCount: {
        type: DataTypes.VIRTUAL,
        get() {
          let sum = 0;
          if (!this.LikeUser) {
            return null;
          }
          for (const likeUser of this.LikeUser) {
            if (likeUser.PostLike.isLike === 1) {
              sum += 1;
            }
          }

          return sum;
        },
        set(value) {
          throw new Error('Do not try to set the `likeCount` value!');
        },
      },
      // 倒讚數
      dislikeCount: {
        type: DataTypes.VIRTUAL,
        get() {
          let sum = 0;
          // console.log('this.LikeUsers => ', this.LikeUsers);
          if (!this.LikeUser) {
            return null;
          }
          for (const likeUser of this.LikeUser) {
            if (likeUser.PostLike.isLike === -1) {
              sum += 1;
            }
          }

          return sum;
        },
        set(value) {
          throw new Error('Do not try to set the `dislikeCount` value!');
        },
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

    // 1文章可能會有多個使用者評論, 1使用者可能會對多文章評論
    Post.hasMany(models.PostComment);
    models.PostComment.belongsTo(Post);

    models.User.hasMany(models.PostComment);
    models.PostComment.belongsTo(models.User);

    // 1文章可能會有多個使用者按讚, 1使用者可能會對多文章按讚
    Post.belongsToMany(models.User, {
      through: models.PostLike,
      // 按讚者
      as: 'LikeUser',
    });
    models.User.belongsToMany(Post, {
      through: models.PostLike,
      // 按讚文
      as: 'LikePost',
    });
  };

  return Post;
};
