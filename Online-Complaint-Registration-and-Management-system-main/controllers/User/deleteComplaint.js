const Complaint = require("../../models/Complaint-schema");
const mongoose = require("mongoose");

exports.deleteComplaint = (req, res) => {
  var dashboard = req.body.dashboard;
  Complaint.findByIdAndDelete(req.params.id, (err, docs) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      if (dashboard == "userDashboard") {
        console.log("userDashboard");
        res.redirect("back");
      } else if (dashboard == "adminDashboard") {
        res.sendFile(__dirname + "/deleteComplaintSuccess.html");

        console.log("Admindashboard");
      } else if (dashboard == "AdminUserDashboard") {
        console.log("AdminUserDashboard");
                res.sendFile(__dirname + "/deleteComplaintSuccess.html");

      }
      console.log("Complaint Deleted Successfully");
    }
  });
};
