const { response } = require('express');
var express = require('express');
var multer  = require('multer')
var upload = multer({ dest: './public/images/' })
var router = express.Router();
var { addClassroom, getClassrooms, getClassroomByYear } = require('../services/classroom');
var { addStudent, getStudents, getStudentById } = require('../services/students');
var fs = require('fs-extra');
var styles;
fs.readJson('./config.json').then(res => {
	styles = res.styles;
}).catch(err => {
	console.error(err);
});

router.get('/', function (req, res, next) {
	res.render('admin', { title: 'Admin' });
});

router.post('/upload', upload.single('image'), function (req, res, next) {
	res.send('/images/'+req.file.filename);
});

router.get('/new/class', function (req, res, next) {
	res.render('adminClass', { styles });
});

router.post('/new/class', function (req, res, next) {
	addClassroom(req.body).then((response) => {
		res.send(response);
	});
});

router.get('/new/student', function (req, res, next) {
	getClassrooms().then((classrooms) => {
		res.render('adminStudent', { classrooms });
	});
});

router.post('/new/student', function (req, res, next) {
	addStudent(req.body).then((response) => {
		res.send(response);
	});
});

router.get('/edit/class/:classroom', function (req, res, next) {
	getClassroomByYear(req.params.classroom).then((classroom) => {
		res.render('adminClass', { styles, class: classroom });
	})
});

router.post('/edit/class/:classroom', function (req, res, next) {
	addClassroom(req.body).then((response) => {
		res.send(response);
	});
});

router.get('/edit/student/:student', function (req, res, next) {
	getClassrooms().then((classrooms) => {
		getStudentById(req.params.student).then((student) => {
			res.render('adminStudent', { classrooms, student });
		})
	});
});

router.post('/edit/student/:student', function (req, res, next) {
	addStudent(req.body).then((response) => {
		res.send(response);
	});
});

module.exports = router;
