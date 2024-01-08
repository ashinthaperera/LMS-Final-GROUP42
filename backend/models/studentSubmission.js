const mongoose = require("mongoose");

const studentSubSchema = new mongoose.Schema({
    moduleName:String,
    title:String,
    description:String,
    pdf:String,
    dateUploaded:Date,
},{collection:"StudentSubmission"});

const StudentSubmission = mongoose.model("StudentSubmission", studentSubSchema);

module.exports = StudentSubmission;