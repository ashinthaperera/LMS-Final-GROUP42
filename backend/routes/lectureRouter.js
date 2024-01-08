const express = require('express');
const Lecturer = require('../models/lecturerSchema');


const lecturerRouter = express.Router();


lecturerRouter.post("/lecturer/addlec",async(req,res)=>{

    const {firstName, lastName, email, password, contactNumber, moduleName} = req.body;
    
    if(!firstName || !lastName || !email || !password || !contactNumber || !moduleName ){
        res.status(404).json("please fill the Data");
    }

    try{
        
        const lecturer=await Lecturer.findOne({contactNumber:contactNumber});
        if(lecturer){
            res.status(404).json("This Lecture already present")
        }
        else{
        const addlecturer = new Lecturer({firstName, lastName, email, password, contactNumber, moduleName});
        const lecurerData = await addlecturer.save();
        console.log(addlecturer);
        res.status(201).json(lecurerData);
        }
    }catch(error){
        res.status(404).json(error);
    }
    
});


lecturerRouter.get("/lecturer",async(req,res)=>{
    try{
        const lecurerData =await Lecturer.find({});
        res.send(lecurerData);
    }catch (error){
        res.send(error);
    }
});

lecturerRouter.get("/lecturer/viewlec/:id", async (req,res)=>{
    try{
        const id =req.params.id;
        const lecurer = await Lecturer.findById({ _id : id });
        res.send(lecurer)
    }catch(error){
        res.send(error);
    }
});

lecturerRouter.put("/lecturer/editlec/:id",async(req,res)=>{
    try{
        const id =req.params.id;
        const lecurer = await Lecturer.findByIdAndUpdate({_id : id }, req.body,{
            new:true,
        });
        res.send(lecurer);
    }catch(error){
        res.send(error);
    }
});

lecturerRouter.delete("/lecturer/deletelec/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const lecurer = await Lecturer.findByIdAndDelete({_id:id});
        res.send(lecurer);
    }catch(error){
        res.send(error);
    }
});


module.exports = lecturerRouter;