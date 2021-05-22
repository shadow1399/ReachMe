const UserCollection = require("../models/userSchema");
module.exports.user = function (req, res) {
    res.send("<h1>Welcome User</h1>");
}

module.exports.profile = function (req, res) {
    return res.render("profile", {
        userName: "Satyansh Vaish"
    });
}

module.exports.signup = function (req, res) {
    return res.render("user_signup");
}
module.exports.create = function (req, res) {

    UserCollection.create(req.body, function (err, newContact) {
        if (err) {
            console.log(`Error on adding Contact ${err}`);
            return;
        }
        console.log("*******", newContact);
    })
    return res.redirect("back");
}

module.exports.signin = function (req, res) {
    return res.render("user_signin");
}