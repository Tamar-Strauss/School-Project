const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const category = require('../controllers/categories');
const router = express.Router();

router.use(verifyJWT);

router.route('/name')
    .get(category.findByName)

router.route('/:id')
    .get(category.findById)
    .delete(category.delete);

router.route('/')
    .get(category.findAll)
    .post(category.create)
    .put(category.update)

module.exports = router;