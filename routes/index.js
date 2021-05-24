const express = require("express");
const router = express.Router();

const home_controller = require("../controllers/home_controller");
const users = require("./users");
const posts = require("./posts");
router.get("/", home_controller.home);
router.use("/user", users);
router.use("/post", posts);
module.exports = router;