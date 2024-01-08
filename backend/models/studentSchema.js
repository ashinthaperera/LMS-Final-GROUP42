const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
 
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
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true
    },
    contactNumber: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true,
    },
    degreeName: {
        type: mongoose.Schema.Types.Mixed, 
        ref: 'degree',
        required: true
    }

});

const students = new mongoose.model("students",studentSchema);

module.exports=students;