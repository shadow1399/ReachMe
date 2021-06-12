const keys = require("../config/keys");
const nodemailer = require("../config/nodemailer");

exports.newSignup = (newuser) => {
    // console.log('inside newUser mailer', newuser);

    nodemailer.transporter.sendMail({
        from: keys.user, // sender address
        to: newuser.email, // list of receivers
        subject: "Registration To ReachME", // Subject line
        html: "<b>Yupp,Signup successfully</b>", // html body
    }, (err, info) => {
        if (err) {
            console.log("Error in sending mail", err);
            return;
        }
        // console.log("Message Sent", info);
        return;
    });
}