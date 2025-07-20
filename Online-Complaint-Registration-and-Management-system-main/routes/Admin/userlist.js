const express = require("express");
const router = express.Router();
const user_list = require("../../controllers/Admin/userList");
router.get("/", user_list.userList);
module.exports = router;
