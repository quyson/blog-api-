const express = require('express');
const router = express.Router();
const authentication = require('../controllers/authentication');


router.post('/signup', authentication.signup);
/*router.get('/',  this function sends back the top 6 liked posts  );
router.get('users', this will load all users protected)
router.get('users/id', load specific user protected )
router.get('posts', this will show all posts)
router.post('posts/create', create post protected )
router.get('posts:id', load post and comment)
router.post('posts/:id/createComment', create new comment to post protected))*/




module.exports = router