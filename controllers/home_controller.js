const Post = require("../models/postSchema");
const User = require("../models/userSchema");

module.exports.home = async function (req, res) {

    try {
        let post = await Post.find({})
            .populate('user')
            .populate({
                path: "comment",
                populate: {
                    path: "user"
                }
            });
        let user_async = await User.find({});

        return res.render("home", {
            post_list: post,
            all_friends: user_async

        });

    }
    catch (err) {
        console.log("Error", err);
        return;
    }


}