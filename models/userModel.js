const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    password: {type: String, required: true},
    bio: {type: String}
});

UserSchema.virtual("name").get(function () {
    return `${this.first_name} ${this.last_name}`;
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
