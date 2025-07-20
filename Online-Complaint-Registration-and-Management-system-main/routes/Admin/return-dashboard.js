const express = require("express");
const router = express.Router();
const return_dashboard = require("../../controllers/Admin/return-dashboard");
router.post("/", return_dashboard.return_dashboard);
module.exports = router;
