const express = require("express");
const router = express.Router();
const appoint_officer = require("../../controllers/Admin/appoint-officer");
router.get("/", appoint_officer.appoint_officer);
module.exports = router;
