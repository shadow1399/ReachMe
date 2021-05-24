const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserCollection'
    }
});

const postModel = mongoose.model("PostCollection", postSchema);

module.exports = postModel;