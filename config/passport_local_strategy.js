const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/userSchema");

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        User.findOne({ "email": email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password != password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.checkAuthentication = function (req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/user/signin");
}
passport.setAuthentication = function (req, res, next) {
    // console.log(req.locals);
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    // console.log(res.locals);
    next();
}
module.exports = passport;