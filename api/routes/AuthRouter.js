var express = require('express');
var router = express.Router();

const AuthController = require('../controllers/AuthController');

router.post('/login', AuthController.Login);
router.get('/profile', AuthController.Profile);

module.exports = router;
