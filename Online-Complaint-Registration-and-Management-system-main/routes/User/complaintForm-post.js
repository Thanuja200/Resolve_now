const express = require("express");
const router = express.Router();
const add_complaint = require("../../controllers/User/complaintForm-post");
router.post("/:id/register-complaint", add_complaint.addComplaint);
module.exports = router;
