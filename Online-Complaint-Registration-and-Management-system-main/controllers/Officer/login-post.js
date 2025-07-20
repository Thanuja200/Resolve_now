const Officers = require("../../models/Authentication/Officer-schema");
const Complaints = require("../../models/Complaint-schema");

const mongoose = require("mongoose");

exports.login_post = async (req, res) => {
  try {
    var assigned_complaints_for_officer = await Complaints.find({ officerAppointed: req.body.officername }).exec();
    // console.log(assigned_complaints_for_officer);
    Officers.findOne({ officerName: req.body.officername }, (err, docs) => {
      if (err) {
        res.sendStatus(500);
      } else {
        if (docs == null) {
          res.sendFile(__dirname + "/unauthorized.html");
        } else if (docs.officerId == req.body.password) {
          // res.send(docs);
          res.render("OfficerDashboard", {complaints:assigned_complaints_for_officer});
        } else {
          res.sendFile(__dirname + "/unauthorized.html");
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};
