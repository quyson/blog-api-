const express = require('express');
const router = express.Router();
const authentication = require('../controllers/authentication');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');

router.post('/login', authentication.login);
router.post('/signup', authentication.signup);
router.get('/', postController.latestPosts);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.oneUser);
router.get('/posts', postController.getPosts);
router.post('/posts/create', postController.createPost);
router.get('/posts/:id', postController.onePost);
router.post('/posts/:id/createComment', commentController.createComment);

/*
router.put( like post)
router.put( like comment)
router.put( update user)
router.put( update comment)
router.put (update post)
router.delete( user)
router. delete(post)
router. delete(comment )
*/




module.exports = router