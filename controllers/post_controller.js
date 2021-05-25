const Post = require("../models/postSchema");
const Comment = require("../models/commentSchema");
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

module.exports.delete = function (req, res) {

    // console.log(req.params.id);
    Post.findById(req.params.id, function (err, post) {
        if (err) {
            console.log("Error in deleting post", err);
            return;
        }
        if (post.user == req.user.id) {
            post.remove();
            // console.log("Successfully Deleted");
            Comment.deleteMany({ post: { $in: req.params.id } }, function (err) {
                if (err) {
                    console.log("Error in deleting comments", err);
                    return;
                }
                // console.log("Comments Deleted");
            })
        }
        // post.remove();


    });
    return res.redirect("back");
}