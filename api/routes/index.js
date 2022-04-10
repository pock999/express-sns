var express = require('express');
var router = express.Router();

const HomeController = require('../controllers/HomeController');

const AuthRouter = require('./AuthRouter');
const PostRouter = require('./PostRouter');

/* GET home page. */
router.get('/', HomeController.GetStatus);

router.use('/auth', AuthRouter);
router.use('/post', PostRouter);

module.exports = router;
