const express = require("express");
const router = express.Router();
const dashboard = require("../../controllers/User/dashboard");
const authVerify=require("../../jwt/authverify")
router.get("/:id",authVerify, dashboard.dashboard);
module.exports = router;
