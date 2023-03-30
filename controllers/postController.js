const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

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

const getPosts = (req, res) => {
    Post.find()
    .sort({created_at: -1})
    .populate('user', ['_id', 'username'])
    .then((result) => {
        res.send({
            message: "Success",
            result: result
        });
    })
    .catch((err) => {
        return next(err);
    })
};

const latestPosts = (req, res) => {
    Post.find()
    .sort({created_at: -1})
    .limit(6)
    .populate('user', ['username', '_id', 'first_name', 'last_name'])
    .then((result) => {
        res.send({
            message: "Success",
            result: result
        });
    })
    .catch((err) => {
        return next(err);
    })
};

const onePost = async (req, res) => {
    try{
        let results = await Promise.all([
            Post.findById(req.params.id).populate('user', ['_id', 'username', 'first_name', 'last_name']),
            Comment.find({post: req.params.id}).populate('user', ['_id', 'username', 'first_name', 'last_name'])
        ]);
        res.send({
            success: true,
            result: results
        });
    } catch(error) {
        res.send({
            success: false,
            message: "Post not found."
        })
    };
};

const likePost = async (req, res) => {
    const result = await Post.findById(req.params.id, 'likes');
    const updateLikes = result.likes + 1;
    Post.findByIdAndUpdate(result.id, {likes: updateLikes}, {new: true}).then((result) => {
        res.status(200).send({
            success: true,
            updatedLikes: result.likes
        });
    })
    .catch((error) => {
        res.status(401).send({
            success: false,
            message: "Cannot Like Post!"
        })
    })
};

const editPost = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((result) => {
        res.status(200).send({
            result: result
        })
    })
    .catch((err) => {
        res.status(401).send({
            success: false,
            message: "Unable to Update!"
        });
    });
};

const deletePost = (req, res) => {
    const messageObj = {}
    Comment.deleteMany({post: req.params.id}).then((result) => {
        messageObj.commentMsg = "All related comments deleted!"
    })
    .catch((err) => {
        messageObj.commentMsg = "Unable to delete related comments."
    });
    Post.findByIdAndDelete(req.params.id).then((result) => {
        messageObj.success = true;
        messageObj.message = "Successfully Deleted Post!";
        res.status(200).send(messageObj);
    })
    .catch((err) => {
        res.status(401).send({
            success: false,
            message: "Unable to Delete Post."
        });
    });
};


module.exports = {createPost, getPosts, latestPosts, onePost, likePost, editPost, deletePost}