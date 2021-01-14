const { response } = require('express');
var express = require('express');
const classroom = require('../models/classroom');
var router = express.Router();
var { addClassroom, getClassrooms, getClassroomByYear } = require('../services/classroom');
var { addStudent, getStudentsByClassroom, getStudentById } = require('../services/students');

router.get('/', function (req, res, next) {
  res.render('admin', { title: 'Admin' });
});

router.get('/new/class', function (req, res, next) {
  res.render('adminClass', { styles: ['simple.css', 'modern.css'] });
});

router.post('/new/class', function (req, res, next) {
  addClassroom(req.body).then((response) => {
    res.send(response);
  });
});

router.get('/new/student', function (req, res, next) {
  getClassrooms().then((classrooms) => {
    console.log(classrooms);
    res.render('adminStudent', {classrooms});
  });
});

router.post('/new/student', function (req, res, next) {
  addStudent(req.body).then((response) => {
    res.send(response);
  });
});

module.exports = router;
