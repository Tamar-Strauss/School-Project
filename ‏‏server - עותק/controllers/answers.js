const dal = require('../dal/answers');

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }
    await dal.create(req.body)
        .then(data => { res.status(201).send(data); })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while creating the Answer." })
        });
}
exports.findAll = async (req, res) => {
    await dal.findAll()
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({ message: err.message || `Some Errors occured while retriving answers.` })
        });
}
exports.findAllByQuestionId = async (req, res) => {
    const questionId = req.params.id;
    dal.joinByQuestionId(questionId)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({ message: err.message || `Some Errors occured while retriving answers for questionId ${questionId}` })
        });
    // await dal.findAllByQuestionId(questionId)

}
exports.findOne = async (req, res) => {
    const id = req.params.id;
    await dal.findOneById(id)
        .then(data => {
            if (data)
                res.send(data);
            else res.status(404).send({ message: `Cannot find answer by id: ${id}` })
        })
}
exports.findCorrectAnswer = async (req, res) => {
    const questionId = req.body.qestionId;
    await dal.findCorrectAnswer(questionId);
}
exports.update = async (req, res) => {
    const id = req.body.id;
    await dal.update(req.body, id)
        .then(num => {
            if (num == 1)
                res.send({ message: 'Answer was updated successfully 👍.' })
            else {
                res.send({ message: `Cannot update answer by id ${id}. Maybe answer was not found or req.body is empty!` })
            }
        })
}
exports.delete = async (req, res) => {
    await dal.delete(id)
        .then(num => {
            if (num == 1)
                res.send({ message: `Answer was deleted successfully! 👍` })
            else res.send({ message: `Cannot delete answer with id ${id}. Maybe answer was not found!` })
        })
        .catch(err => {
            res.status(500).send({ message: `Could not delete answer with id ${id}` })
        })
}