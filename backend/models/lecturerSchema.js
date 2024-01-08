const mongoose = require('mongoose');


const lecturerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    moduleName: {
        type: mongoose.Schema.Types.Mixed,
        ref: "moduleSchema",
        required: true
    }

})


const lecturers = new mongoose.model("lecturers",lecturerSchema);

module.exports=lecturers;