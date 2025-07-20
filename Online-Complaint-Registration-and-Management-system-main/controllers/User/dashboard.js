const Complaint = require("../../models/Complaint-schema");
const User = require("../../models/Authentication/User-schema");
const mongoose = require("mongoose");
exports.dashboard = async (req, res) => {
  // res.send("User DashBoard")
  // res.send(req.paras);
  // console.log(req.params.id);
  // using params.id -- search in database
  //   res.render("UserDashboard", { userID: req.params.id });
  try {
    var username = await User.find({ userId: req.params.id }).exec();
    // console.log(username);
    Complaint.find({ userID: req.params.id }, function (err, docs) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.render("UserDashboard", {
          complaints: docs,
          userID: req.params.id,
          userName: username[0].username.slice(0, 2),
        });

        // console.log(docs);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
