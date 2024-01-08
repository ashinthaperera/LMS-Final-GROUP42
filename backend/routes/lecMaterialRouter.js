const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');

const lecMaterialRouter = express.Router();
const app = express();

const multer = require("multer");
// const upload = multer({dest:"./files"});// do this and comment it

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./files"); //file loc
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
  });


const files = require('../models/lectureMaterial');
require("../models/lectureMaterial");
const PdfSchema = mongoose.model("LectureMaterial"); //name of collection

const upload = multer({ storage: storage });//location where the files will be stored

lecMaterialRouter.post("/upload-files", upload.single("file"), async (req, res) => {
    
    try {
      // const addfile = new files({});
      // const lecData = await addfile.save(fileName,title);
      // res.status(201).json(lecData);
      
      //console.log(req.file);
    console.log(req.body);
    // res.send("Hii");
    const moduleName = req.body.moduleName;
    const title = req.body.title;
    const description = req.body.description;
    const fileName = req.file.filename; 
    const dateUploaded = req.body.dateUploaded;

  // const title = req.body.title;
  // const fileName = req.file.filename;
  console.log(moduleName,title,description,fileName,dateUploaded);
  
        await PdfSchema.create({ moduleName: moduleName,title: title,description: description, pdf: fileName,dateUploaded:dateUploaded });
        // await PdfSchema.create({ title: title, pdf: fileName });
        res.send({ status: "ok" });
    } catch (error) {
        res.json({ status: error });
    }
});

lecMaterialRouter.get("/get-files",async (req,res)=>{
    try{
        PdfSchema.find({}).then((data)=>{
            res.send({status : "ok", data : data});
        });
    }catch(error){
        
    }
});

lecMaterialRouter.get("/file/view", (req, res) => {
  res.sendFile(path.join(__dirname, 'C:/Users/Dell/Documents/Group42-LMS/front-end/public/index.html'));
});

lecMaterialRouter.get("/",async(req,res)=>{
    res.send("Success!!!");
});

lecMaterialRouter.delete("/deletefile/:id",async(req,res)=>{
  try{
      const id = req.params.id;
      const file = await files.findByIdAndDelete({_id:id});
      res.send(file);
  }catch(error){
      res.send(error);
  }
})

module.exports = lecMaterialRouter;