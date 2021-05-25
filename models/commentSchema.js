const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserCollection"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PostCollection"
    }
});

const CommentModel = mongoose.model("CommentCollection", commentSchema);
module.exports = CommentModel;