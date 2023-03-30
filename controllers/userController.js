const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

const getUsers = (req, res) => {
    User.find()
    .sort({name: 1})
    .then((result) => {

        // this loop will remove password from user in result to prevent sending unnecessary information to client

        const resultArray = [];
        result.forEach((element) => {
            let objectHolder = {
                _id: element._id,
                username: element.username,
                first_name: element.first_name,
                last_name: element.last_name
            };
            resultArray.push(objectHolder)
        });
        res.send({
            success: true,
            result: resultArray
        });
    })
    .catch((err) => {
        return next(err);
    });
};

const oneUser = async (req, res) => {
    try{
        let results = await Promise.all([
            User.findById(req.params.id, ['username', 'first_name', 'last_name']),
            Post.find({user: req.params.id})
        ]);
        res.send({
            success: true,
            result: results
        });
    } catch(error) {
        res.send({
            success: false,
            message: "User not found."
        })
    };
};

const updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((result) => {
        res.status(200).send({
            success: true,
            result: result
        });
    })
    .catch((err) => {
        res.status(400).send({
            success: false,
            message: "Unable to update user."
        });
    });
};

const deleteUser = (req, res) => {
    const messageObj = {}
    Comment.deleteMany({user: req.params.id}).then((result) => {
        messageObj.commentMsg = "All related comments deleted!"
    })
    .catch((err) => {
        messageObj.commentMsg = "Unable to delete related comments."
    });
    Post.deleteMany({user: req.params.id}).then((result) => {
        messageObj.postMsg = "All related Posts deleted!"
    })
    .catch((err) => {
        messageObj.postMsg = "Unable to delete related Posts."
    });
    User.findByIdAndDelete(req.params.id).then((result) => {
        messageObj.success = true;
        messageObj.message = "Successfully Deleted User!";
        res.status(200).send(messageObj);
    })
    .catch((err) => {
        res.status(401).send({
            success: false,
            message: "Unable to Delete User."
        });
    });
};

module.exports = {getUsers, oneUser, deleteUser, updateUser}