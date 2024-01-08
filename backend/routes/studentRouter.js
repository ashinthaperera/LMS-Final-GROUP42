const express = require('express');
const Student = require("../models/studentSchema");


const studentRouter = express.Router();


studentRouter.post("/student/addstud",async(req,res)=>{
    const {firstName, lastName, email, password, dob, contactNumber, address, degreeName} = req.body;

    if(!firstName || !lastName || !email || !password || !dob || !contactNumber || !address || !degreeName){
        res.status(404).json("please fill the Data");
    }
    
    try{
        const student=await Student.findOne({contactNumber:contactNumber});
        if(student){
            res.status(404).json("This student already present");
        }
        else{
            const addstudent = new Student({firstName, lastName, email, password, dob, contactNumber, address, degreeName});
            const studentData = await addstudent.save();
            res.status(201).json(studentData);
        }
    }catch(error){
        res.status(404).json(error);
    }
});


studentRouter.get("/student",async(req,res)=>{
    try{
        const studentData =await Student.find({});
        res.send(studentData);
    }catch (error){
        res.send(error);
    }
});

studentRouter.get("/student/viewstud/:id", async (req,res)=>{
    try{
        const id =req.params.id;
        const student = await Student.findById({ _id : id });
        res.send(student);
    }catch(error){
        res.send(error);
    }
});

studentRouter.put("/student/editstud/:id",async(req,res)=>{
    try{
        const id =req.params.id;
        const student = await Student.findByIdAndUpdate({_id : id }, 
            req.body,{
                new:true
            }
        );
        res.send(student);
    }catch(error){
        res.send(error);
    }
});

studentRouter.delete("/student/deletestud/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const student = await Student.findByIdAndDelete({_id:id});
        res.send(student);
    }catch(error){
        res.send(error);
    }
});


module.exports = studentRouter;