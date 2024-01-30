const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const tasks = require('../controllers/tasks');
const router = express.Router();

router.use(verifyJWT);

router.route('/')
    .get(tasks.findAll)
    .put(tasks.update)
    .post(tasks.create)

router.get('/lecture/:id', tasks.findByLectureId);

router.route('/:id')
    .get(tasks.findOne)
    .delete(tasks.delete)

module.exports = router;