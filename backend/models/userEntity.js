const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// const ROLE = {
//     STUDENT: 'student',
//     ADMIN: 'admin',
//     LECTURER: 'lecturer'
// };

const userSchema = new mongoose.Schema({
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
    role: {
        type: String,
        // enum: Object.values(ROLE),
        // default: ROLE.STUDENT,
        required: true,
    },
    // createdAt: {
    //     type: Date,
    //     required: true,
    // },
    // updatedAt: {
    //     type: Date,
    //     required: true,
    // },
});

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    try {
        // Hash the password only if it's modified or new
        if (this.isModified('password') || this.isNew) {
            const hashedPassword = await bcrypt.hash(this.password, 8);
            this.password = hashedPassword;
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', userSchema);


