const UserCollection = require("../models/userSchema");
module.exports.user = function (req, res) {
    res.send("<h1>Welcome User</h1>");
}

module.exports.profile = function (req, res) {
    if (req.cookies.userId) {
        return res.render("profile", {
            userName: "Satyansh Vaish"
        });
    }
    return res.redirect("/user/signin");

}

module.exports.signup = function (req, res) {
    if (req.cookies.userId) {
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
    return res.redirect("back");
}

module.exports.signin = function (req, res) {
    if (req.cookies.userId) {
        return res.redirect("/user/profile");
    }
    return res.render("user_signin");
}

module.exports.createSession = function (req, res) {
    // console.log(req.body);
    UserCollection.find({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log("Erro in creating Session", err);
            return;

        }
        // console.log(user);
        if (user[0].password != req.body.password) {
            // console.log(user[0].password, req.body.password);
            return res.redirect("back");
        }
        // console.log("YEahhh!!");
        res.cookie("userId", user[0]._id);
        return res.redirect("/user/profile");

    })
}

module.exports.signout = function (req, res) {
    // console.log(req.cookies);
    res.clearCookie('userId');
    return res.redirect("/user/signin");
}