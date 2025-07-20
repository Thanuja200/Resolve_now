const express = require("express");
const router = express.Router();
const delete_complaint = require("../../controllers/User/deleteComplaint");
router.post("/delete-complaint/:id",delete_complaint.deleteComplaint)
module.exports = router;
