const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const lecture = require('../controllers/lectures');
const router = express.Router();

router.use(verifyJWT);

router.route('/student/:id')
    .get(lecture.findUntilNum)

router.route('/course/:id')
    .get(lecture.findAllByCourseId)

router.route('/teacher/:id')
    .get(lecture.findAllByTeacherId)

router.route('/number')
    .get(lecture.findByNum);

router.route('/:id')
    .get(lecture.findById)
    .delete(lecture.delete);

router.route('/')
    .get(lecture.findAll)
    .post(lecture.create)
    .put(lecture.update)

module.exports = router;