const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const teacher = require('../controllers/teachers');
const router = express.Router();

router.route('/login')
    .get(teacher.login);

router.route('/email')
    .get(teacher.findByEmail);

router.route('/course/:id')
    .get(verifyJWT, teacher.findCoursesByTeacherId);
    
router.route('/:id')
    .delete(verifyJWT, teacher.delete);

router.route('/')
    .get(teacher.findAll)
    .post(teacher.register)
    .put(verifyJWT, teacher.update)

module.exports = router;