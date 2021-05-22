module.exports.user = function (req, res) {
    res.send("<h1>Welcome User</h1>");
}

module.exports.profile = function (req, res) {
    res.send("<h1>Welcome Satyansh</h1>");
}

module.exports.signup = function (req, res) {
    return res.render("user_signup");
}

module.exports.signin = function (req, res) {
    return res.render("user_signin");
}