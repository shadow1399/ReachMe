const UserCollection = require("../models/userSchema");
module.exports.user = function (req, res) {
    res.send("<h1>Welcome User</h1>");
}

module.exports.profile = async function (req, res) {

    // console.log(res.locals);
    try {
        let friends = await UserCollection.findById(req.params.id);
        return res.render("profile", {
            friend: friends
        });
    } catch (err) {
        console.log(err);
        return;
    }

}

module.exports.signup = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    return res.render("user_signup");
}
module.exports.create = function (req, res) {

    UserCollection.create(req.body, function (err, newContact) {
        if (err) {
            console.log(`Error on adding Contact ${err}`);
            return;
        }
        // console.log("*******", newContact);
    })
    return res.redirect("/user/signin");
}

module.exports.signin = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    return res.render("user_signin");
}
module.exports.createSession = function (req, res) {

    return res.redirect("/");
}

module.exports.signout = function (req, res) {
    req.logout();
    res.redirect("/user/signin");
}

module.exports.update = async function (req, res) {

    try {
        let user_found = await UserCollection.findOne({ email: req.body.email });
        // console.log("***", req.user.id, user_found._id);
        if (user_found && req.user.id == user_found.id) {

            user_found.name = req.body.name;
            user_found.email = req.body.email;
            user_found.save();
            if (user_found.email != req.body.email) {
                console.log("Email Already Exists");
            }

        }
        return res.redirect("back");
    } catch (err) {
        console.log("Error in updating info", err);
        return;
    }

}