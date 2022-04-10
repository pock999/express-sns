var express = require('express');
var router = express.Router();

const AuthController = require('../controllers/AuthController');

const jwtDecode = require('../middlewares/jwtDecode');
const isUser = require('../middlewares/isUser');

router.post('/register', AuthController.Register);
router.post('/login', AuthController.Login);
router.get('/profile', jwtDecode, isUser, AuthController.Profile);

module.exports = router;
