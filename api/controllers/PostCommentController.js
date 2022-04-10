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

      const tx = await dbModels.sequelize.transaction();
      try {
        const postComment = await dbModels.PostComment.create(
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
        data: null,
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
