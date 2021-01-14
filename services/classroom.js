const Classroom = require('../models/classroom');

exports.getClassrooms = () => {
    return Classroom.find();
}

exports.getClassroomByYear = (year) => {
    return Classroom.findOne({ 'year': year });
}

exports.addClassroom = (obj) => {
    const classroom = new Classroom(obj);
    return classroom.save();
}