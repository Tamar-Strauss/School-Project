const dal = require('../dal/questions');

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    await dal.create(req.body)
        .then(data => { res.status(201).send(data); })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while creating the question." });
        });
}
exports.findAll = async (req, res) => {
    await dal.findAll()
        .then(data => { res.send(data) })
        .catch(err =>
            res.status(500).send({ message: err.message || "Some errors occured while retrieving questions." }))
}
exports.findAllByCourseId = async (req, res) => {
    const courseId = req.params.id;
    await dal.findAllByCourseId(courseId)
        .then(data => { res.send(data) })
        .catch(err =>
            res.status(500).send({ message: err.message || "Some errors occured while retrieving questions." }))
}
exports.findOne = async (req, res) => {
    const id = req.params.id;
    await dal.findOneById(id)
        .then(data => {
            if (data)
                res.send(data);
            else res.status(404).send({ message: `Cannot find question by id ${id}.` })
        })
}
exports.update = async (req, res) => {
    const id = req.body.id;
    await dal.update(req.body, id)
        .then(num => {
            if (num == 1)
                res.send({ message: "Question was updated successfully." })
            else res.send({ message: `Cannot update question with id ${id}. Maybe its not found or req.body is empty.` })
        })

}
exports.delete = async (req, res) => {
    const id = req.params.id;
    await dal.delete(id)
        .then(num => {
            if (num == 1)
                res.send({ message: `Question was deleted successfully! 👍` })
            else res.send({ message: `Cannot delete question with id = ${id}. Maybe question was not found!` })
        })
        .catch(err => {
            res.status(500).send({ message: err.message || `Could not delete question with id ${id}` });
        });
}