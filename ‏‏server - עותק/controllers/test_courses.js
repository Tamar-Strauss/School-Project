const dal = require('../dal/test_courses');

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
        return;
    }
    await dal.create(req.body)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the test for course." }))
}
exports.findAll = async (req, res) => {
    await dal.findAll()
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(404).send({ message: err.message || "Failed retrieving tests for course." })
        })
}
exports.findOne = async (req, res) => {
    const id = req.params.id;
    await dal.findOne({ where: { id: id } })
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(404).send({ message: err.message || `Could not find test for course by id ${id}` })
        })
}
exports.findByCourseId = async (req, res) => {
    const id = req.params.id;
    await dal.findOne({ where: { courseId: id } })
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(404).send({ message: err.message || `Could not find test for course by courseId ${id}` })
        })
}
exports.update = async (req, res) => {
    const id = req.body.id;
    await dal.update(req.body, id)
        .then(num => {
            if (num == 1)
                res.send(`Successfully Updating test for course by id ${id}`);
            else res.status(500).send('Failed Updating');
        })
}
exports.delete = async (req, res) => {
    const id = req.params.id;
    await dal.delete(id)
        .then(num => {
            if (num == 1)
                res.send(`Successfully deletion test for course by id ${id}`)
            else res.status(500).send('Failed Deletion');
        })
}