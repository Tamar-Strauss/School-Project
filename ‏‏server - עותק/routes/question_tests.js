const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const question_test = require('../controllers/question_tests');
const router = express.Router();

router.use(verifyJWT);

router.route('/course_student/:id')
    .get(question_test.findAllByCourseStudent)

router.route('/question/:id')
    .get(question_test.findAllByQuestionId)
    
router.route('/:id')
    .get(question_test.findOne)
    .delete(question_test.delete)
    // .post(question_test.createTest)

router.route('/')
    .get(question_test.findAll)
    .post(question_test.create)
    .put(question_test.update)

module.exports = router;