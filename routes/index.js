var express = require('express');
var router = express.Router();
var { getClassrooms, getClassroomByYear } = require('../services/classroom');
var { getStudentsByClassroom, getStudentById } = require('../services/students');
var title = '«Մխիթար Սեբաստացի» կրթահամալիրի շրջանավարտներ';
 
router.get('/', function (req, res, next) {
  getClassrooms().sort({year: 'desc'}).exec((err, classrooms) => {
    res.render('index', { title, classrooms });
  });
});

router.get('/class/:classroom', function (req, res, next) {
  getClassroomByYear(req.params.classroom).then((classroom) => {
    getStudentsByClassroom(req.params.classroom).sort({name: 1}).exec((err, students) => {
      res.render('classroom', { title, classroom, students });
    });
  });
});

router.get('/student/:student', function (req, res, next) {
  getStudentById(req.params.student).then((student) => {
    getClassroomByYear(student.class).then((classroom) => {
      res.render('student', { title, classroom, student });
    });
  });
});

module.exports = router;
