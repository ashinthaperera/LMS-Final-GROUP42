const express = require('express');
const Module = require("../models/moduleSchema");


const moduleRouter = express.Router();

moduleRouter.post("/module/addmod", async(req,res)=>{
    const {moduleCode, moduleName, degreeName, firstName} = req.body;
    if(!moduleCode || !moduleName || !degreeName || !firstName ){
        res.status(404).json("please fill the Data");
    }

    try {
      const module = await Module.findOne({ moduleCode: moduleCode });
      if (module) {
        res.status(404).json("This module code already exist");
      }
      else {
        const addModule = new Module({ moduleCode, moduleName, degreeName, firstName });
        const moduleData = await addModule.save();
        console.log(moduleData);
        res.status(201).json(moduleData);
      }
    } catch (err) {
      res.status(404).json(err);
    }
});

moduleRouter.get("/module",async(req,res)=>{
    try{
        const moduleData =await Module.find({});
        res.send(moduleData);
    }catch (error){
        res.send(error);
    }
});

moduleRouter.get("/module/viewmod/:id", async (req,res)=>{
    try{
        const id =req.params.id;
        const module = await Module.findById({ _id : id });
        res.send(module);
    }catch(error){
        res.send(error);
    }
});

moduleRouter.put("/module/editmod/:id",async(req,res)=>{
    try{
        const id =req.params.id;
        const module = await Module.findByIdAndUpdate({_id : id }, 
            req.body,{
                new:true
            }
        );
        res.send(module);
    }catch(error){
        res.send(error);
    }
});

moduleRouter.delete("/module/deletemod/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const module = await Module.findByIdAndDelete({_id:id});
        res.send(module);
    }catch(error){
        res.send(error);
    }
});

module.exports = moduleRouter;
