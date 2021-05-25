const Comment = require("../models/commentSchema");
const Post = require("../models/postSchema");
module.exports.create = function (req, res) {
    Post.findById(req.body.comment_postId, function (err, post) {
        if (err) {
            console.log("Error in comment controller", err);
            return;
        }

        if (post) {
            Comment.create({
                content: req.body.comment_content,
                user: req.user.id,
                post: req.body.comment_postId
            }, function (err, comment) {
                if (err) {
                    console.log("Error", err);
                    return;
                }
                console.log("***", comment);
                post.comment.push(comment);
                post.save();

            })
        }
        return res.redirect("/");
    })

}