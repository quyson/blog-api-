const Comment = require('../models/commentModel');

const createComment = (req, res) => {
    const newComment = new Comment(req.body);
    console.log(newComment);
    newComment.save().then((result) => {
        res.send({
            success: true,
            message: "Commented Successfully!"
        });
    })
    .catch((err) => {
        res.send({
            success: false,
            message: "Comment Failed!"
        });
    });
};

const editComment = (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((result) => {
        res.status(200).send({
            success: true,
            result: result
        });
    })
    .catch((err) => {
        res.status(400).send({
            success: false,
            message: "Unable to update comment."
        });
    });
};

const likeComment = async (req, res) => {
    const result = await Comment.findById(req.body.id, 'likes');
    const updateLikes = result.likes + 1;
    Comment.findByIdAndUpdate(req.body.id, {likes: updateLikes}, {new: true}).then((result) => {
        res.status(200).send({
            success: true,
            result: result
        });
    })
    .catch((err) => {
        res.status(400).send({
            success: false,
            message: "Unable to like Comment."
        });
    });
};

const deleteComment = (req, res) => {
    Comment.findByIdAndDelete(req.body.id).then((result) => {
        res.status(200).send({
            success: true,
            message: "Successfully deleted comment."
        });
    })
    .catch((err) => {
        res.status(401).send({
            success: false,
            message: "Unable to delete comment"
        });
    });
};

module.exports = {createComment, editComment, likeComment, deleteComment};