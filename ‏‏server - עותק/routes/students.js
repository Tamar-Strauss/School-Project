const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const student = require('../controllers/students.js');
const router = express.Router();

router.route('/courses/:id')
    .get(verifyJWT, student.findAllCoursesByStudentId)

router.route('/all')
    .get(student.findAll) //? הרשאה רק למנהל המערכת - הכיצד

router.route('/login')
    .get(student.login);

router.route('/:id')
    .get(verifyJWT, student.findOne)
    .delete(verifyJWT, student.delete)

router.route('/')
    .get(student.findOneByIdNumber)
    .put(verifyJWT, student.update)
    .post(student.register);
    
module.exports = router;