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
    .populate('user')
    .then((result) => {

        // this loop will remove password from user in result to prevent sending unnecessary information to client

        const resultArray = [];
        result.forEach((element) => {
            let objectHolder = {
                _id: element._id,
                title: element.title,
                message: element.message,
                likes: element.likes,
                user: {
                    _id: element.user._id,
                    username: element.user.username
                }
            }
            resultArray.push(objectHolder)
        })
        res.send({
            message: "Success",
            result: resultArray
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
    .populate('user')
    .then((result) => {

        // this loop will remove password from user in result to prevent sending unnecessary information to client

        const resultArray = [];
        result.forEach((element) => {
            let objectHolder = {
                _id: element._id,
                title: element.title,
                message: element.message,
                likes: element.likes,
                user: {
                    _id: element.user._id,
                    username: element.user.username
                }
            }
            resultArray.push(objectHolder)
        })
        res.send({
            message: "Success",
            result: resultArray
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


module.exports = {createPost, getPosts, latestPosts, onePost}