const dal = require('../dal/question_tests');

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty!' });
        return;
    }
    await dal.create(req.body)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while creating the Answer for student." })
        });
}
exports.findAll = async (req, res) => {
    await dal.findAll()
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({ message: err.message || `Some Errors occured while retriving answers for students.` })
        });
}
exports.findAllByCourseStudent = async (req, res) => {
    const courseStudentId = req.params.id;
    await dal.findAllByCourseStudentId(courseStudentId)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({ message: err.message || `Some Errors occured while retriving answers for students for courseStudentId ${courseStudentId}.` })
        });
}
exports.findAllByQuestionId = async (req, res) => {
    const questionId = req.params.id;
    await dal.findAllByQuestionId(questionId)
        .then(data => {
            if (data)
                res.status(200).send(data);
            else res.status(500).send({ message: `Some Errors occured while retriving answers for students.` })
        })
}
exports.findOne = async (req, res) => {
    const id = req.params.id;
    await dal.findOneById(id)
        .then(data => {
            if (data)
                res.send(data);
            else res.status(500).send({ message: `Cannot find answer for student, by id: ${id}` })
        })
}
exports.update = async (req, res) => {
    const id = req.body.id;
    await dal.update(req.body, id)
        .then(num => {
            if (num == 1)
                res.send({ message: 'Answer for Student was updated successfully 👍.' })
            else {
                res.send({ message: `Cannot update answer for Student by id ${id}. Maybe answer was not found or req.body is empty!` })
            }
        })
}
exports.delete = async (req, res) => {
    const id = req.params.id;
    await dal.delete(id)
        .then(num => {
            if (num == 1)
                res.send({ message: `Answer for Student was deleted successfully! 👍` })
            else res.send({ message: `Cannot delete answer for Student with id ${id}. Maybe answer was not found!` })
        })
        .catch(err => {
            res.status(500).send({ message: `Could not delete answer for Student with id ${id}` })
        })
}