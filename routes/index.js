const express = require("express");
const router = express.Router();

const home_controller = require("../controllers/home_controller");
const users = require("./users");
router.get("/", home_controller.home);
router.use("/user", users);
module.exports = router;