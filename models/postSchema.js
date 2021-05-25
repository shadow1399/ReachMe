const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserCollection'
    },
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CommentCollection'
        }
    ]

});

const postModel = mongoose.model("PostCollection", postSchema);

module.exports = postModel;