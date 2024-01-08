
const modules = require('../models/moduleSchema');
const lecturers = require('../models/lecturerSchema');
const students = require('../models/studentSchema');



before(async () => {
    await modules.deleteMany();
});

after(async () => {
    await modules.deleteMany();
});