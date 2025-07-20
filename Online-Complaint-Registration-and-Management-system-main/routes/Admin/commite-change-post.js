const express = require("express");
const router = express.Router();
const commite_change_post = require("../../controllers/Admin/commite-change-post");
router.post("/admin-complaint/:id", commite_change_post.commiteChange);
module.exports = router;
