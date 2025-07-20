const Complaint = require("../../models/Complaint-schema");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dmkoxe2gk",
  api_key: "274678599356585",
  api_secret: "EL_fj8uawlC4yyVjJ4a0f-v6vzk",
});

exports.update_complaint = (req, res) => {
  console.log(req.body);
  const file = req.files.workStatusImage;
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
      var id = req.body.complaintId;
      var work_status = req.body.workStatus;
      var updated_doc = {
        workDoneImageURL: result.url,
      };
       if (work_status != "~") {
         updated_doc.workStatus = work_status;
       }
    //    console.log(updated_doc);
Complaint.findByIdAndUpdate(id,updated_doc,(err,docs)=>{
    if(err){
        res.sendStatus(500)
    }else{
        res.sendFile(__dirname + "/complaintSuccess.html");
    }
});
    // console.log(updated_doc,id);
  });
// console.log(req.body);
};
