const Post = require("../../../models/postSchema");
const Comment = require('../../../models/commentSchema');

module.exports.postapi = async function (req, res) {

    try {
        console.log(req.params.id);
        let post = await Post.findById(req.params.id);
        // if (post.user == req.user.id) {
        post.remove();
        // console.log("Successfully Deleted");
        Comment.deleteMany({ post: { $in: req.params.id } });



        return res.json(200, {
            message: "Post Deleted Successfully"

        });
    } catch (err) {
        console.log(err);
        return res.json(500, {
            message: "Post Not Deleted"
        });
    }

}