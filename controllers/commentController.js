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

module.exports = {createComment};