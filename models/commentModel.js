const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    message: {type: String, required: true},
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    likes: {type: Number, default: 0},
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment