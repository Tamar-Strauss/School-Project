const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const course = require('../controllers/courses');
const router = express.Router();

router.use(verifyJWT);

router.route('/name/:name')
    .get(course.findByName);
    
router.route('/teacher/:id')
    .get(course.findByTeacherId)

router.route('/category/:id')
    .get(course.findByCategoryId)
    
router.route('/lecture_num/:id')
    .get(course.getNextLectureNum)
    
router.route('/:id')
    .get(course.findById)
    .delete(course.delete)

router.route('/')
    .get(course.findAll)
    .post(course.create)
    .put(course.update);

module.exports = router;