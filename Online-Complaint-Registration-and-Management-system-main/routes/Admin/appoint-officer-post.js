const express = require("express");
const router = express.Router();
const appoint_officer = require("../../controllers/Admin/appoint-officer-post");
router.post("/", appoint_officer.appoint_officer);
module.exports = router;
