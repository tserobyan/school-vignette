const Student = require('../models/students');

exports.getStudents = () => {
    return Student.find();
}

exports.getStudentsByClassroom = (year) => {
    return Student.find({ 'class': year });
}

exports.getStudentById = (id) => {
    return Student.findById(id);
}

exports.addStudent = (obj) => {
    const student = new Student(obj);
    return student.save();
}