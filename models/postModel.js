const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    likes: { type: Number, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

PostSchema.virtual("created_formatted").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
