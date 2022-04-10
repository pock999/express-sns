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

      // 回覆數
      commentCount: {
        type: DataTypes.VIRTUAL,
        get() {
          let sum = 0;
          // console.log('this.Critics => ', this.Critics);
          if (!this.Critics) {
            return null;
          }
          for (const critic of this.Critics) {
            if (
              critic.PostComment.comment !== null &&
              critic.PostComment.comment !== '' &&
              typeof critic.PostComment.comment !== 'undefined'
            ) {
              sum += 1;
            }
          }

          return sum;
        },
        set(value) {
          throw new Error('Do not try to set the `commentCount` value!');
        },
      },

      // 讚數
      likeCount: {
        type: DataTypes.VIRTUAL,
        get() {
          let sum = 0;
          // console.log('this.Critics => ', this.Critics);
          if (!this.Critics) {
            return null;
          }
          for (const critic of this.Critics) {
            if (critic.PostComment.isLike) {
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
      dilikeCount: {
        type: DataTypes.VIRTUAL,
        get() {
          let sum = 0;
          // console.log('this.Critics => ', this.Critics);
          if (!this.Critics) {
            return null;
          }
          for (const critic of this.Critics) {
            if (critic.PostComment.isDislike) {
              sum += 1;
            }
          }

          return sum;
        },
        set(value) {
          throw new Error('Do not try to set the `dilikeCount` value!');
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
    Post.belongsTo(models.User, {
      as: 'Writer',
    });

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
      // 評論者
      as: 'Critics',
    });
    models.User.belongsToMany(Post, {
      through: models.PostComment,
      // 評論標的
      as: 'Target',
    });
  };

  return Post;
};
