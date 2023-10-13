const express = require("express");
const {
  homepage,
  usersignup,
  userlogin,
  userlogout,
  currentuser
} = require("../controllers/indexControllers");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

//Homepage  --Get
router.get("/", homepage);

//CurrentUser  --Post
router.post("/user", isAuthenticated, currentuser);

// Signup  --post
router.post("/signup", usersignup);

// Login  --post
router.post("/login", userlogin);

// Logout  --Get
router.post("/logout",isAuthenticated, userlogout);

module.exports = router;
