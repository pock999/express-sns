const Joi = require('joi');
const jwt = require('jsonwebtoken');

const dbModels = require('../models');

module.exports = {
  async Register(req, res) {
    /* #swagger.parameters['obj'] = { 
          in: 'body', 
          description: '註冊',
          '@schema': { 
              "required": ["name", "email", "password"], 
              "properties": { 
                  "name": { 
                      "example": "大帥哥" 
                  },
                  "email": { 
                      "example": "test001@test.com" 
                  },
                  "password": { 
                      "example": "test001" 
                  },
              } 
          } 
      } */
    try {
      const { error, value } = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }).validate(req.body);

      if (error) {
        throw {
          error: error.message,
        };
      }

      let user = await dbModels.User.findOne({
        where: {
          email: value.email,
        },
      });

      if (user) {
        throw {
          error: 'email is already in use',
        };
      }

      user = await dbModels.User.create({
        ...value,
      });

      return res.status(200).json({
        message: 'success',
        statusCode: 200,
        data: {},
      });
    } catch (e) {
      return res.status(500).json({
        message: 'error',
        statusCode: 500,
        data: e,
      });
    }
  },

  async Login(req, res) {
    /* #swagger.parameters['obj'] = { 
          in: 'body', 
          description: '登入',
          '@schema': { 
              "required": ["email", "password"], 
              "properties": { 
                  "email": { 
                      "example": "ming123@google.com" 
                  },
                  "password": { 
                      "example": "abcd1234" 
                  },
              } 
          } 
      } */
    try {
      const { error, value } = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }).validate(req.body);

      if (error) {
        throw {
          error: error.message,
        };
      }

      const { email, password } = value;

      let user = await dbModels.User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw {
          error: 'the user not found',
        };
      }

      const isVerify = await user.validatePassword(password);

      if (!isVerify) {
        throw {
          error: 'password error',
        };
      }

      user = {
        ..._.pick(JsonReParse(user), ['id', 'email', 'name']),
      };

      const token = jwt.sign(user, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
      });

      return res.status(200).json({
        message: 'success',
        statusCode: 200,
        data: {
          token,
          user,
        },
      });
    } catch (e) {
      return res.status(500).json({
        message: 'error',
        statusCode: 500,
        data: e,
      });
    }
  },

  async Profile(req, res) {
    try {
      const { user } = req;

      return res.status(200).json({
        message: 'success',
        statusCode: 200,
        data: {
          ..._.pick(user, ['id', 'email', 'name']),
        },
      });
    } catch (e) {
      return res.status(500).json({
        message: 'error',
        statusCode: 500,
        data: e,
      });
    }
  },
};
