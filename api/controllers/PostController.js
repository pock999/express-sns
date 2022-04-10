const Joi = require('joi');

const dbModels = require('../models');

module.exports = {
  async List(req, res) {
    try {
      let { user } = req;

      // 有token才驗證
      if (user) {
        user = await dbModels.User.findOne({
          where: {
            id: user.id,
          },
        });
        if (!user) {
          throw {
            error: 'user not found',
          };
        }
      }
      // 找出所有文章(包含 評論以及標籤)
      const posts = await dbModels.Post.findAll({
        include: [
          {
            model: dbModels.User,
            as: 'Critics',
          },
          {
            model: dbModels.Tag,
            attributes: ['code', 'name'],
          },
        ],
      });

      return res.status(200).json({
        message: 'success',
        statusCode: 200,
        data: posts
          ? posts.map((p) => ({
              ..._.pick(p, [
                'title',
                'content',
                'createdAt',
                'updatedAt',
                'likeCount',
                'dilikeCount',
                'commentCount',
              ]),
              Tags: p.Tags.map((t) => ({
                ..._.pick(t, ['code', 'name']),
              })),
              isAuhor: user ? user.id === p.UserId : false,
            }))
          : null,
      });
    } catch (e) {
      console.log('e => ', e);
      return res.status(500).json({
        message: 'error',
        statusCode: 500,
        data: e,
      });
    }
  },

  async Detail(req, res) {
    try {
      const { error, value } = Joi.object({
        id: Joi.number().integer().required(),
      }).validate(req.params);

      if (error) {
        throw {
          error: error.message,
        };
      }

      const { id } = value;

      let { user } = req;

      // 有token才驗證
      if (user) {
        user = await dbModels.User.findOne({
          where: {
            id: user.id,
          },
        });
        if (!user) {
          throw {
            error: 'user not found',
          };
        }
      }

      // 找出文章(包含 評論以及標籤)
      const post = await dbModels.Post.findOne({
        where: {
          id,
        },
        include: [
          {
            model: dbModels.User,
            as: 'Critics',
          },
          {
            model: dbModels.Tag,
            attributes: ['code', 'name'],
          },
        ],
      });

      return res.status(200).json({
        message: 'success',
        statusCode: 200,
        data: {
          ..._.pick(post, [
            'title',
            'content',
            'createdAt',
            'updatedAt',
            'likeCount',
            'dilikeCount',
            'commentCount',
          ]),
          isAuhor: user ? user.id === post.UserId : false,
        },
      });
    } catch (e) {
      console.log('e => ', e);
      if (e.error == 'user not found') {
        return res.status(401).json({
          message: 'user not login',
          statusCode: 401,
          data: e,
        });
      }
      return res.status(500).json({
        message: 'error',
        statusCode: 500,
        data: e,
      });
    }
  },

  async Create(req, res) {
    try {
      const { error, value } = Joi.object({
        title: Joi.string().required(),
        content: Joi.string(),
        Tags: Joi.array().items(Joi.number().integer()),
      }).validate(req.body);

      if (error) {
        throw {
          error: error.message,
        };
      }

      const { user } = req;
      const { title, content, Tags } = value;

      const tags = await dbModels.Tag.findAll({
        where: {
          id: _.isArray(Tags) ? Tags : [],
        },
      });

      let post = null;

      const tx = await dbModels.sequelize.transaction();
      try {
        post = await dbModels.Post.create(
          {
            title,
            content,
            UserId: user.id,
          },
          {
            transaction: tx,
          }
        );

        for (const tag of tags) {
          await dbModels.PostTag.create(
            {
              PostId: post.id,
              TagId: tag.id,
            },
            {
              transaction: tx,
            }
          );
        }

        await tx.commit();
      } catch (err) {
        await tx.rollback();
        throw err;
      }

      return res.status(200).json({
        message: 'success',
        statusCode: 200,
        data: post
          ? {
              ..._.pick(post, [
                'title',
                'content',
                'createdAt',
                'updatedAt',
                'likeCount',
                'dilikeCount',
                'commentCount',
              ]),
              isAuhor: user ? user.id === post.UserId : false,
            }
          : null,
      });
    } catch (e) {
      console.log('e => ', e);
      return res.status(500).json({
        message: 'error',
        statusCode: 500,
        data: e,
      });
    }
  },
};
