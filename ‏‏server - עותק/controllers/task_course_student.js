const dal = require('../dal/tasks_course_student');

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }
    const duplicate = await dal.findByCourseStudentIdAndTaskId(req.body.courseStudentId, req.body.taskId);
    if (duplicate) return res.send({message: `Exist already`});
    await dal.create(req.body)
        .then(data => { res.status(201).send(data) })
        .catch(err => { res.status(500).send(err.message) });
}
exports.findAll = async (req, res) => {
    await dal.findAll()
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err.message); });
}
exports.findByCourseStudentId = async (req, res) => {
    const id = req.params.id;
    await dal.findAll({ where: { courseStudentId: id } })
        .then(data => {
            if (data)
                res.send(data);
            else res.status(404).send({ message: `Cannot find task student by course student ${id}` });
        })
}
exports.findByCourseStudentIdAndTaskId = async (req, res) => {
    const courseStudentId = req.query.courseStudentId;
    const taskId = req.query.taskId;
    if (!courseStudentId || !taskId) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }
    await dal.findByCourseStudentIdAndTaskId(courseStudentId, taskId)
        .then(data => {
            if (data)
                res.send(data);
            else res.status(404).send({ message: `Cannot find task student` });
        })
}
exports.isDone = async (req, res) => {
    const courseStudentId = req.query.courseStudentId;
    const taskId = req.query.taskId;
    if (!courseStudentId || !taskId) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }
    const isDone = await dal.findByCourseStudentIdAndTaskId(courseStudentId, taskId);
    if (!isDone) return res.send(false);
    return res.send(true);
}
exports.findOne = async (req, res) => {
    const id = req.params.id;
    await dal.findOne({ where: { id: id } })
        .then(data => {
            if (data)
                res.send(data);
            else res.status(404).send({ message: `Cannot find task student by id ${id}` });
        })
}
exports.update = async (req, res) => {
    const id = req.body.id;
    await dal.update(req.body, id)
        .then(num => {
            if (num == 1)
                res.send({ message: "Task student was updated successfully." })
            else res.send({
                message:
                    `Cannot update task student with id ${id}. Maybe task student was not found or req.body is empty!`
            })
        });
}
exports.delete = async (req, res) => {
    const id = req.params.id;
    await dal.delete(id)
        .then(num => {
            if (num == 1)
                res.send({ message: `Task student was deleted successfully! 👍` })
            else res.status(404).send({message: `Cannot delete task student with id ${id}`})
        })
}