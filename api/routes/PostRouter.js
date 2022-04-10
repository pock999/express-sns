var express = require('express');
var router = express.Router();

const PostController = require('../controllers/PostController');

const jwtDecode = require('../middlewares/jwtDecode');
const isUser = require('../middlewares/isUser');

router.get('/list', jwtDecode, PostController.List);
router.get('/:id', jwtDecode, PostController.Detail);
router.post('', jwtDecode, isUser, PostController.Create);
router.put('/:id', jwtDecode, isUser, PostController.Update);

module.exports = router;
