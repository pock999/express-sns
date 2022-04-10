const Joi = require('joi');

const dbModels = require('../models');

module.exports = {
  async Create(req, res) {
    try {
      const { error, value } = Joi.object({
        PostId: Joi.number().integer().required(),
        comment: Joi.string().required(),

        PostCommentId: Joi.number().integer(),
      }).validate({
        ...req.body,
        ...req.params,
      });

      if (error) {
        throw {
          error: error.message,
        };
      }

      const { PostId, comment, PostCommentId } = value;
      const { user } = req;

      let postComment = null;

      const tx = await dbModels.sequelize.transaction();
      try {
        postComment = await dbModels.PostComment.create(
          {
            comment,
            PostId,
            UserId: user.id,
            ...(PostCommentId ? { PostCommentId } : {}),
          },
          {
            transaction: tx,
          }
        );
        await tx.commit();
      } catch (err) {
        await tx.rollback();
        throw err;
      }

      return res.status(200).json({
        message: 'success',
        statusCode: 200,
        data: {
          ..._.pick(postComment, ['id', 'comment', 'PostId']),
        },
      });
    } catch (e) {
      console.log('e => ', e);
      if (e.error === 'target not found') {
        return res.status(400).json({
          message: 'error',
          statusCode: 400,
          data: e,
        });
      }
      if (e.error === 'not allow') {
        return res.status(403).json({
          message: 'error',
          statusCode: 403,
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
  async Update(req, res) {
    try {
      const { error, value } = Joi.object({
        id: Joi.number().integer().required(),
        PostId: Joi.number().integer().required(),
        comment: Joi.string().required(),
      }).validate({
        ...req.body,
        ...req.params,
      });

      if (error) {
        throw {
          error: error.message,
        };
      }

      const { id, PostId, comment } = value;
      const { user } = req;

      let postComment = await dbModels.PostComment.findOne({
        where: {
          id,
          UserId: user.id,
          PostId,
        },
      });

      if (!postComment) {
        throw {
          error: 'target not found',
        };
      }

      const tx = await dbModels.sequelize.transaction();
      try {
        postComment.comment = comment;
        await postComment.save({ transaction: tx });

        await tx.commit();
      } catch (err) {
        await tx.rollback();
        throw err;
      }

      return res.status(200).json({
        message: 'success',
        statusCode: 200,
        data: {
          ..._.pick(postComment, ['id', 'comment', 'PostId']),
        },
      });
    } catch (e) {
      console.log('e => ', e);
      if (e.error === 'target not found') {
        return res.status(400).json({
          message: 'error',
          statusCode: 400,
          data: e,
        });
      }
      if (e.error === 'not allow') {
        return res.status(403).json({
          message: 'error',
          statusCode: 403,
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
};
