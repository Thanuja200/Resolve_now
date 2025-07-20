const express = require("express");
const router = express.Router();
const complaintForm = require("../../controllers/User/complaintForm-get");
const authVerify = require("../../jwt/authverify");

router.get("/:id/register-complaint",authVerify, complaintForm.complaintForm);
module.exports = router;
