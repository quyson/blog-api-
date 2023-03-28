const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {type: String, required: true},
    message: {type: String, required: true},
    likes: {type: Number, default: 0},
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post