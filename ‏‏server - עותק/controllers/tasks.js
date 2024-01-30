const dal = require('../dal/tasks');

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(204).send({ message: 'Content can not be empty!' });
        return;
    }
    await dal.create(req.body)
        .then(data => { res.status(201).send(data) })
        .catch(err => { res.status(500).send(err.message) });
}
exports.findAll = async (req, res) => {
    await dal.findAll()
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err.message); });
}
exports.findByLectureId = async (req, res) => {
    const id = req.params.id;
    await dal.findOne({ where: { lectureId: id } })
        .then(data => {
            if (data)
                res.send(data);
            else res.status(404).send({ message: `Cannot find task by lectureId ${id}` });
        }).catch(err => {
            res.status(400).send({message: err.message})
        });
}
exports.findOne = async (req, res) => {
    const id = req.params.id;
    await dal.findOne({ where: { id: id } })
        .then(data => {
            if (data)
                res.send(data);
            else res.status(404).send({ message: `Cannot find task by id ${id}` });
        })
}
exports.update = async (req, res) => {
    const id = req.body.id;
    await dal.update(req.body, id)
        .then(num => {
            if (num == 1)
                res.send({ message: "Task was updated successfully." })
            else res.status(500).send({
                message:
                    `Cannot update task with id ${id}. Maybe task was not found or req.body is empty!`
            })
        });
}
exports.delete = async (req, res) => {
    const id = req.params.id;
    await dal.delete(id)
        .then(num => {
            if (num == 1)
                res.send({ message: `Task was deleted successfully! 👍` })
            else res.status(404).send({message: `Cannot delete task with id ${id}`})
        })
}