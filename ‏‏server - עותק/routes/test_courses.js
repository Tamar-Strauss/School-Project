const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const test_course = require('../controllers/test_courses');
const router = express.Router();

router.use(verifyJWT);

router.route('/course/:id')
    .get(test_course.findByCourseId)

router.route('/:id')
    .get(test_course.findOne)
    .delete(test_course.delete)

router.route('/')
    .get(test_course.findAll)
    .post(test_course.create)
    .put(test_course.update)

module.exports = router;