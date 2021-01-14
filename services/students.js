const Student = require('../models/students');

exports.getStudents = () => {
    return Student.find();
}

exports.addStudent = (name_, image, quote, body, class_) => {
    const student = new Student({ name: name_, image, quote, body, class: class_ });

    return student.save(); 
}