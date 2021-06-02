var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const UserCollection = require("../models/userSchema");
const password = require('secure-random-password');

passport.use(new GoogleStrategy({
    clientID: "464089707680-1lvui5gptkngsbk8lvclcggbdl63d56h.apps.googleusercontent.com",
    clientSecret: "70yHG57eOelR44QKMuvLJlSL",
    callbackURL: "http://localhost:5000/user/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        UserCollection.findOne({ email: profile.emails[0].value }, function (err, user) {
            console.log(profile);
            if (err) {
                console.log("Error in Google Auth", err);
                return;
            }
            if (user) {
                return done(null, user);
            }
            else {
                UserCollection.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: password.randomPassword()
                }, function (err, newContact) {
                    if (err) {
                        console.log("Error in creating contact", err);
                        return;
                    }

                })
            }

        });
    }
));