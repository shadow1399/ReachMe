const UserCollection = require("../models/userSchema");
const fs = require("fs");
const path = require("path");
const signupMailer = require("../mailers/signup_mailers");
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
        signupMailer.newSignup(newContact);
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
    return res.redirect("/");
}

module.exports.update = async function (req, res) {

    try {
        // console.log("PRint parama", req.params);

        let user_found = await UserCollection.findOne({ _id: req.params.id });
        // console.log("***", req.user.id, user_found.id);
        if (user_found && req.user.id == user_found.id) {
            UserCollection.uploadAvatar(req, res, function (err) {

                // console.log(req.file, req.body);
                user_found.name = req.body.name;
                user_found.email = req.body.email;
                if (req.file) {
                    if (user_found.avatar) {
                        // console.log(user_found.avatar);
                        fs.unlinkSync(path.join(__dirname, "..", user_found.avatar));
                    }
                    user_found.avatar = UserCollection.uploadPath + "/" + req.file.filename;
                }
                user_found.save();
                return res.redirect("back");
            })

            // user_found.name = req.body.name;
            // user_found.email = req.body.email;
            // user_found.save();
            // if (user_found.email != req.body.email) {
            //     console.log("Email Already Exists");
            // }

        }
        else {
            return res.redirect("back");
        }

    } catch (err) {
        console.log("Error in updating info", err);
        return res.redirect("back");
    }

}