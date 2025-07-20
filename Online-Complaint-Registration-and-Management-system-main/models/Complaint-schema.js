const mongoose = require("mongoose");
const complaintSchema = new mongoose.Schema({
  userID: String,
  date: String,
  title: String,
  address: String,
  gMapURL: String,
  imageName: String,
  imageURL: String,
  officerAppointed: String,
  workStatus: String,
  workDoneImageName: String,
  workDoneImageURL: String,
  approvalStatus: String,
});
module.exports = mongoose.model("complaint", complaintSchema);
