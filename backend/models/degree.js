const mongoose = require("mongoose");

const degreeSchema = new mongoose.Schema({
    degreeName: {
        type: String,
        required: true,
    },
    degreeType: {
        type: String,
        required: true,
    }


});

const Degree = mongoose.model('degrees', degreeSchema);

module.exports = Degree;

