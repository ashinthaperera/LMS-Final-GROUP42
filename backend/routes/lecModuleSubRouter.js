const express = require('express');
const { default: mongoose } = require('mongoose');

const lecModuleSubRouter = express.Router();
const app = express();

const multer = require("multer");
// const upload = multer({dest:"./modSubfiles"}); //do this and comment it

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./modSubfiles"); //file loc
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
    },
  });

const files = require('../models/lectureModuleSub');
require("../models/lectureModuleSub");
const PdfSchema = mongoose.model("LectureModuleSub"); //name of collection

const upload = multer({ storage: storage });//location where the files will be stored

lecModuleSubRouter.post("/modulesub/upload-modSubfiles", upload.single("file"), async (req, res) => {
    
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
    const dueDate = req.body.dueDate;
    const dateUploaded = req.body.dateUploaded;

  // const title = req.body.title;
  // const fileName = req.file.filename;
  console.log(moduleName,title,description,fileName,dueDate,dateUploaded);
  
        await PdfSchema.create({ moduleName: moduleName,title: title,description: description, pdf: fileName,dueDate:dueDate,dateUploaded:dateUploaded });
        // await PdfSchema.create({ title: title, pdf: fileName });
        res.send({ status: "ok" });
    } catch (error) {
        res.json({ status: error });
    }
});


lecModuleSubRouter.get("/modulesub/get-modSubfiles",async (req,res)=>{
    try{
        PdfSchema.find({}).then((data)=>{
            res.send({status : "ok", data : data});
        });
    }catch(error){

    }
});

lecModuleSubRouter.get("/modulesub/",async(req,res)=>{
    res.send("Success!!!");
});

lecModuleSubRouter.delete("/modulesub/deletefile/:id",async(req,res)=>{
  try{
      const id = req.params.id;
      const file = await files.findByIdAndDelete({_id:id});
      res.send(file);
  }catch(error){
      res.send(error);
  }
})

module.exports = lecModuleSubRouter;