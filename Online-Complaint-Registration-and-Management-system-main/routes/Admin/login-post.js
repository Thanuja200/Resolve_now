const express = require("express");
const router = express.Router();
const login_post = require("../../controllers/Admin/login-post");
router.post("/", login_post.login);
module.exports = router;
