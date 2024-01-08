const express = require('express');
const Degree = require('../models/degree');


const degreeRouter = express.Router();


degreeRouter.get("/degree",async(req,res)=>{
    try{
        const degreeData =await Degree.find({});
        res.send(degreeData);
    }catch (error){
        res.send(error);
    }
});

module.exports = degreeRouter;