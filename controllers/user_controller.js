const UserCollection = require("../models/userSchema");
module.exports.user = function (req, res) {
    res.send("<h1>Welcome User</h1>");
}

module.exports.profile = function (req, res) {

    console.log(res.locals);
    return res.render("profile", {
        userName: res.locals.user.name
    });
}

module.exports.signup = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/user/profile");
    }
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
    return res.redirect("/user/signin");
}

module.exports.signin = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/user/profile");
    }
    return res.render("user_signin");
}
module.exports.createSession = function (req, res) {

    return res.redirect("/user/profile");
}

module.exports.signout = function (req, res) {
    req.logout();
    res.redirect("/user/signin");
}