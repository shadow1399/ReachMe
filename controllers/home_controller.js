const Post = require("../models/postSchema");

module.exports.home = function (req, res) {
    Post.find({}).populate('user').exec(function (err, post) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(post)
        return res.render("home", {
            post_list: post
        });
    });

}