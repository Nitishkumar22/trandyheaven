const express = require("express");
const { homepage } = require("../controllers/indexControllers");
const router = express.Router();

//Get /

router.get("/", homepage);

module.exports = router;