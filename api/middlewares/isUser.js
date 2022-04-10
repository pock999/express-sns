const jwt = require('jsonwebtoken');
const { TokenExpiredError } = jwt;

const config = require('../../config/config');
const dbModels = require('../models');

module.exports = async (req, res, next) => {
  console.log('==== isUser ====');
  try {
    let token = req.headers.Authorization || req.headers.authorization;
    if (token && typeof token !== 'undefined') {
      if (token.includes('Bearer')) {
        token = token.replace('Bearer ', '');
      }

      const decodeToken = jwt.verify(token, config.jwt.secret);

      console.log('decodeToken => ', decodeToken);

      const user = await dbModels.User.findOne({
        where: {
          id: decodeToken.id,
        },
      });

      if (!user) {
        throw {
          error: 'user not found',
        };
      }

      req.user = JSON.parse(JSON.stringify(user));

      console.log('isUser');

      next();
    } else {
      throw {
        error: 'user not login',
      };
    }
  } catch (e) {
    console.log('e => ', e);
    if (e instanceof TokenExpiredError) {
      return res.status(401).json({
        message: 'Unauthorized',
        statusCode: 401,
        data: 'token expired',
      });
    }

    return res.status(401).json({
      message: 'Unauthorized',
      statusCode: 401,
      data: e,
    });
  }
};
