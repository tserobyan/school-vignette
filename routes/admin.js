const { response } = require('express');
var express = require('express');
var multer = require('multer')
var upload = multer({ dest: './public/images/' })
var router = express.Router();
var { addClassroom, getClassrooms, getClassroomByYear } = require('../services/classroom');
var { addStudent, getStudents, getStudentById } = require('../services/students');
var { haveAccess, newAccess } = require('../services/access');
var fs = require('fs-extra');
var styles;
fs.readJson('./config.json').then(res => {
	styles = res.styles;
}).catch(err => {
	console.error(err);
});

router.get('/', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		res.render('admin', { title: 'Admin' });
	} else {
		res.redirect('/admin/login')
	}
});

router.get('/login', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		res.render('admin', { title: 'Կառավարակետ' });
	}
	res.render('login', { title: 'Մուտք' });
});

router.get('/access', function (req, res, next) {
	res.send(haveAccess(req.cookies.access))
});
router.post('/get-access', function (req, res, next) {
	res.send("" + newAccess(req.body.username, req.body.password));
});

router.post('/upload', upload.single('image'), function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		res.send('/images/' + req.file.filename);
	} else {
		res.redirect('/admin/login')
	}
});

router.get('/new/class', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		res.render('adminClass', { styles });
	} else {
		res.redirect('/admin/login')
	}
});

router.post('/new/class', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		addClassroom(req.body).then((response) => {
			res.send(response);
		});
	} else {
		res.redirect('/admin/login')
	}
});

router.get('/new/student', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		getClassrooms().then((classrooms) => {
			res.render('adminStudent', { classrooms });
		});
	} else {
		res.redirect('/admin/login')
	}
});

router.post('/new/student', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		addStudent(req.body).then((response) => {
			res.send(response);
		});
	} else {
		res.redirect('/admin/login')
	}
});

router.get('/edit/class/:classroom', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		getClassroomByYear(req.params.classroom).then((classroom) => {
			res.render('adminClass', { styles, class: classroom });
		});
	} else {
		res.redirect('/admin/login')
	}
});

router.post('/edit/class/:classroom', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		addClassroom(req.body).then((response) => {
			res.send(response);
		});
	} else {
		res.redirect('/admin/login')
	}
});

router.get('/edit/student/:student', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		getClassrooms().then((classrooms) => {
			getStudentById(req.params.student).then((student) => {
				res.render('adminStudent', { classrooms, student });
			})
		});
	} else {
		res.redirect('/admin/login')
	}
});

router.post('/edit/student/:student', function (req, res, next) {
	if (haveAccess(req.cookies.access)) {
		addStudent(req.body).then((response) => {
			res.send(response);
		});
	} else {
		res.redirect('/admin/login')
	}
});

module.exports = router;
