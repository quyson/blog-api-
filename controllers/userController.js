const User = require('../models/userModel');
const Post = require('../models/postModel');

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

module.exports = {getUsers, oneUser}