const classroom = require('../models/classroom');
const Classroom = require('../models/classroom');

exports.getClassrooms = () => {
    return Classroom.find();
}

exports.addClassroom = (name_, image, quote, body) => {
    const classroom = new Classroom({ name: name_, image, quote, body});

    return classroom.save();
}