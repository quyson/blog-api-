const express = require('express');
const router = express.Router();
const authentication = require('../controllers/authentication');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');


router.post('/signup', authentication.signup);
router.get('/', postController.latestPosts);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.oneUser);
router.get('/posts', postController.getPosts);
router.post('/posts/create', postController.createPost);
router.get('/posts/:id', postController.onePost);
router.post('/posts/:id/createComment', commentController.createComment);




module.exports = router