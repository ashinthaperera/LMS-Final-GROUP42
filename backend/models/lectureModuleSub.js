const mongoose = require("mongoose");

const lecturerModuleSchema = new mongoose.Schema({
    moduleName:String,
    title:String,
    description:String,
    pdf:String,
    dueDate:Date,
    dateUploaded:Date,
},{collection:"LectureModuleSub"})

const LectureModuleSub = new mongoose.model("LectureModuleSub",lecturerModuleSchema)

module.exports=LectureModuleSub;


    