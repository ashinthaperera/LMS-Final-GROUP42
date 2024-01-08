const mongoose = require("mongoose");

const lecturerMaterialSchema = new mongoose.Schema({
    moduleName:String,
    title:String,
    description:String,
    pdf:String,
    dateUploaded:Date,
},{collection:"LectureMaterial"})

const LectureMaterial = new mongoose.model("LectureMaterial",lecturerMaterialSchema)

module.exports=LectureMaterial;


    