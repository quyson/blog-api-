const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

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

module.exports = {signup}