const dayjs = require('dayjs');

module.exports = {
  async GetStatus(req, res, next) {
    return res.status(200).json({
      message: 'success',
      statusCode: 200,
      data: {
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      },
    });
  },
};
