const Post = require('../models/postModel');

const createPost = (req, res) => {
    const newPost = new Post(req.body);
    console.log(newPost)
    newPost.save().then((result) => {
        res.send({
            success: true,
            message: "Posted Successfully!"
        });
    })
    .catch((error) => {
        res.send({
            success: false,
            message: "Post Failed!"
        })
    })   
};

module.exports = {createPost}