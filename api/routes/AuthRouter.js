var express = require('express');
var router = express.Router();

const AuthController = require('../controllers/AuthController');

const isUser = require('../middlewares/isUser');

router.post('/login', AuthController.Login);
router.get('/profile', isUser, AuthController.Profile);

module.exports = router;
