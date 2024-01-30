const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const tasks_course_student = require('../controllers/task_course_student');
const router = express.Router();

router.use(verifyJWT);

router.get('/isDone', tasks_course_student.isDone)
router.get('/task', tasks_course_student.findByCourseStudentIdAndTaskId)

router.route('/courseStudentId/:id')
    .get(tasks_course_student.findByCourseStudentId);

router.route('/:id')
    .get(tasks_course_student.findOne)
    .delete(tasks_course_student.delete)

router.route('/')
    .get(tasks_course_student.findAll)
    .put(tasks_course_student.update)
    .post(tasks_course_student.create)
module.exports = router;