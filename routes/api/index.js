const express = require("express");
const router = express.Router();

const version1 = require("./v1");
router.use("/v1", version1);
module.exports = router;