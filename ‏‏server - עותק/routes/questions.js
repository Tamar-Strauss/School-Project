const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const question = require('../controllers/questions');
const router = express.Router();

router.use(verifyJWT);

router.get('/course/:id', question.findAllByCourseId)

router.route('/:id')
    .get(question.findOne)
    .delete(question.delete)

router.route('/')
    .get(question.findAll)
    .post(question.create)
    .put(question.update)



module.exports = router;