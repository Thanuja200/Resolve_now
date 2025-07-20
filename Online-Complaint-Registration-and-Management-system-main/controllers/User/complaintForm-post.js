const Complaint = require("../../models/Complaint-schema");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dmkoxe2gk",
  api_key: "274678599356585",
  api_secret: "EL_fj8uawlC4yyVjJ4a0f-v6vzk",
});
var today = new Date();

exports.addComplaint = (req, res) => {
  const file = req.files.image;
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    const complaint = new Complaint({
      userID: req.params.id,
      date: today.toLocaleDateString("en-GB"),
      title: req.body.complaint,
      address: req.body.address,
      gMapURL: req.body.addressURL,
      imageName: result.public_id,
      imageURL: result.url,
      officerAppointed: "-",
      workStatus: "-",
      workDoneImageName: "",
      workDoneImageURL: "",
      approvalStatus: "Pending",
    });
    complaint.save(function (err, result) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log("Scuessfully complaint Saved to database");
        res.render("complaintSuccess", { userID: req.params.id });
      }
    });
    // console.log(result);
  });
};
//  imageURl: result.url,
//       imageName: result.public_id,