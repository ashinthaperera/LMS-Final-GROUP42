const mongoose = require('mongoose');


const moduleSchema = new mongoose.Schema({
 
    moduleCode :{
        type:String,
        required:true
    },
    moduleName :{
        type:String,
        required:true
    },
    degreeName:{
        type: mongoose.Schema.Types.Mixed,
        ref: "degree",
        required: true
    },
    firstName:{
        type: mongoose.Schema.Types.Mixed,
        ref: "lecturerSchema",
        required: true
    }
   
})

const modules = new mongoose.model("modules",moduleSchema);

module.exports=modules;