var express = require('express');
var router = express.Router();

const HomeController = require('../controllers/HomeController');

const AuthRouter = require('./AuthRouter');

/* GET home page. */
router.get('/', HomeController.GetStatus);

router.use('/auth', AuthRouter);

module.exports = router;
