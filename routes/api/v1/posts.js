const express = require("express");
const router = express.Router();

const postapi_controller = require("../../../controllers/api/v1/postapi_controller");

router.delete("/:id", postapi_controller.postapi);
module.exports = router;