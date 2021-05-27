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
module.exports.create = async function (req, res) {

    try {
        if (req.body.password != req.body.cpassword) {
            req.flash("error", "Password and Confirm Password should be same.");
            return res.redirect("/user/signup");
        }

        let newContact = await UserCollection.create(req.body);

        // console.log("*******", newContact);
        // console.log("Error here");
        return res.redirect("/user/signin");
    } catch (err) {
        req.flash("error", "Email already exists");
        // console.log("Error on add contacts");
        return res.redirect("back");
    }

}

module.exports.signin = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    return res.render("user_signin");
}
module.exports.createSession = function (req, res) {
    req.flash("success", "Logged In Successfully!!");
    return res.redirect("/");
}

module.exports.signout = function (req, res) {
    req.logout();
    req.flash("success", "Logged Out Successfully!!");
    res.redirect("/");
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