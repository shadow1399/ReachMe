const Post = require("../models/postSchema");

module.exports.create = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function (err, newPost) {
        if (err) {
            console.log("Error in Post_Controller", err);
            return;

        }
        // console.log("***", newPost);
        return res.redirect("back");
    })
}