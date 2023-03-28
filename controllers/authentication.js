const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretOrKey = process.env.secretOrKey;

const signup = (req, res) => {
	const newUser = new User(req.body);
	bcrypt.hash(newUser.password, 10, (err, hashedPassword) => {
		if(err){
			return err;
		}
		newUser.password = hashedPassword;
		newUser.save()
		.then((result) => res.send({
			Success: true,
			message: "User saved successfully"
		}))
		.catch((err) => {
			console.log(err);
			res.send({
				Success: false,
				message: "User save has failed"
			});
		});
	});
};

const login = (req, res) => {
	console.log(req.body);
	User.findOne({username: req.body.username}).then((result) => {
		if(!result){
			res.status(401).send({
				success: false,
				message: "Cannot find User!"
			})
		};
		bcrypt.compare(req.body.password, result.password, (err, match) => {
			if (match) {
			  const payload = {id: result.id, username: req.body.username}
			  const token = jwt.sign(payload, secretOrKey, {expiresIn: "1d"});
			  return res.status(200).send({
				success: true,
				message: "Logged in successfully",
				token: "Bearer " + token
			  });
			} else {
			  return res.status(401).send({
				success: false,
				message: "Incorrect Password"
			  });
			};
		});
	});	
};

module.exports = {signup, login}