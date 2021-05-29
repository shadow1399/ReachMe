const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/user_controller");
const passport = require("../config/passport_local_strategy");
router.get("/", user_controller.user);

router.get("/profile/:id", user_controller.profile);
router.get("/signout", user_controller.signout);
router.get("/signin", user_controller.signin);
router.get("/signup", user_controller.signup);
router.post("/create", user_controller.create);
router.post("/update/:id", passport.checkAuthentication, user_controller.update);
router.post("/create-session", passport.authenticate('local', { failureRedirect: '/user/signin' }), user_controller.createSession);
module.exports = router;