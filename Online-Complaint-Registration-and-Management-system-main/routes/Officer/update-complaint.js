const express = require("express");
const router = express.Router();
const update_complaint = require("../../controllers/Officer/complaint-update-post");
router.post("/", update_complaint.update_complaint);
module.exports = router;
