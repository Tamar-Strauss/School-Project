const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const answer = require('../controllers/answers');
const router = express.Router();

router.use(verifyJWT);

router.route('/questionId/:id')
    .get(answer.findAllByQuestionId);

router.route('/:id')
    .get(answer.findOne)
    .delete(answer.delete);

router.route('/')
    .get(answer.findAll)
    .put(answer.update)
    .post(answer.create);

module.exports = router;