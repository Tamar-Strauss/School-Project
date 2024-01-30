const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const courseStudent = require('../controllers/course_student');
const router = express.Router();

router.use(verifyJWT);

router.get('/student/course/:id', courseStudent.findByStudentAndCourseId)

router.get('/student/:id', courseStudent.findAllByStudentId)

router.get('/details/:id', courseStudent.viewDetails)

router.route('/:id')
    .get(courseStudent.findOne)
    .delete(courseStudent.delete)

router.route('/')
    .get(courseStudent.findAll)
    .post(courseStudent.create)//only after payment 
    .put(courseStudent.update)

module.exports = router;