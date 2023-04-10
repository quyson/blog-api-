const express = require('express');
const router = express.Router();
const authentication = require('../controllers/authentication');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');
const passport = require('passport');


router.get('/getCurrentUser', passport.authenticate('jwt', {session: false}), (req, res) => res.send({currentUser: req.user}));
router.post('/login', authentication.login);
router.post('/signup', authentication.signup);
router.get('/', postController.latestPosts);
router.get('/users', passport.authenticate('jwt', {session: false}), userController.getUsers);
router.get('/users/:id',passport.authenticate('jwt', {session: false}) ,userController.oneUser);
router.get('/posts', postController.getPosts);
router.get('/posts/create',passport.authenticate('jwt', {session: false}), (req, res) => res.send({success: true, user: req.user}));
router.post('/posts/create',passport.authenticate('jwt', {session: false}), postController.createPost);
router.get('/posts/:id',passport.authenticate('jwt', {session: false}), postController.onePost);
router.post('/posts/:id/createComment',passport.authenticate('jwt', {session: false}), commentController.createComment);
router.post('/posts/like', passport.authenticate('jwt', {session: false}), postController.likePost);
router.put('/posts/edit/:id', passport.authenticate('jwt', {session: false}), postController.editPost);
router.delete('/posts/:id',passport.authenticate('jwt', {session: false}), postController.deletePost);
router.patch('/comment/edit/:id', passport.authenticate('jwt', {session: false}), commentController.editComment);
router.post('/comment/delete', passport.authenticate('jwt', {session: false}), commentController.deleteComment);
router.post('/comment/like', passport.authenticate('jwt', {session: false}), commentController.likeComment);

router.put('/users/:id', passport.authenticate('jwt', {session: false}), userController.updateUser);
router.delete('/users/:id', passport.authenticate('jwt', {session: false}), userController.deleteUser);





module.exports = router