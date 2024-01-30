const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const test = require('../controllers/tests');
const router = express.Router();

router.use(verifyJWT);

router.get('/canTest/:id', test.canTest)
router.get('/student/:id', test.findAllByStudentId)
router.route('/submit')
    .put(test.submitTest);

router.route('/checkTest/:id')
    .get(test.getTestsToCheck)
    .put(test.checkTest)

router.route('/course_student/:id')
    .get(test.findByCourseStudent)

router.route('/:id')
    .get(test.findOne)
    .delete(test.delete)

router.route('/')
    .get(test.findAll)
    .post(test.createTest)
    .put(test.update)
    

module.exports = router;