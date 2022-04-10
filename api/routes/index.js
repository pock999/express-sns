var express = require('express');
var router = express.Router();

const HomeController = require('../controllers/HomeController');

const AuthRouter = require('./AuthRouter');
const PostRouter = require('./PostRouter');

/**
 * @swagger
 * /:
 *   get:
 *     description: 確認api端正常運作
 */
router.get('/', HomeController.GetStatus);

router.use('/auth', AuthRouter);
router.use('/post', PostRouter);

router.all('*', (req, res) => {
  return res.status(404).json({
    message: 'not found',
    statusCode: 404,
    data: null,
  });
});

module.exports = router;
