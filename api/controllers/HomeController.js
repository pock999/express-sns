const dayjs = require('dayjs');

module.exports = {
  async GetStatus(req, res, next) {
    return res.json({
      message: 'success',
      data: {
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      },
    });
  },
};