const mongoose = require("mongoose");

const lecturerSubmissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        // maxlength: [20, "Name cannot be more than 20 characters"]
    },
    file: {
        type: String,
        required: [true, "Please provide a file"]
    },
    lecturerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecturer",
        required: true,
    },
    moduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
        required: true,
    }
});

const LecturerSubmission = mongoose.model("LecturerSubmission", lecturerSubmissionSchema);

module.exports = LecturerSubmission;