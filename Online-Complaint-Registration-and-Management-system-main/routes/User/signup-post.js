const express = require("express");
const router = express.Router();
const signup_post = require("../../controllers/User/signup-post");
router.post("/", signup_post.signup_post);
module.exports = router;
