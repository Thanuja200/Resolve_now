const express = require("express");
const router = express.Router();
const user_dashboard_delete = require("../../controllers/Admin/userDashboard-and-delete");
router.post("/admin-user-dashboard-delete", user_dashboard_delete.userDashboard);
module.exports = router;
