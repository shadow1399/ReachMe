const express = require('express');
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

const passportLocal = require("passport-local");
const app = express();
const routes = require("./routes");
const db = require("./config/mongoose");
const passportLocalStrategy = require("./config/passport_local_strategy");
const passportGoogle = require("passport-google-oauth");
const passportGoogleStrategy = require("./config/passport_google_strategy");
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded());
app.use(express.static("assets"));
app.use("/uploads", express.static("uploads"));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600000 }
}));
app.use(flash());
app.use(function (req, res, next) {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})
app.use(passport.initialize());
app.use(passport.session());
app.use(passportLocalStrategy.setAuthentication);
app.use("/", routes);
app.listen(5000, function (err) {
    if (err) {
        console.log(`Error :${err}`);
        return;
    }
    console.log("Server Is Running");
})