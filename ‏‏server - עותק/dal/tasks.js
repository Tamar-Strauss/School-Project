const db = require('../models');
const Tasks = db.Tasks;

exports.create = async (task) => {
    return await Tasks.create(task);
}
exports.findAll = async () => {
    return await Tasks.findAll();
}
exports.findAll = async (condition) => {
    return await Tasks.findAll(condition);
}
exports.findOne = async (condition) => {
    return await Tasks.findOne(condition);
}
exports.findOneByLectureId = async (lectureId) => {
    return await Tasks.findOne({ where: { lectureId: lectureId } });
}
exports.update = async (task, id) => {
    return await Tasks.update(task, { where: { id: id } });
}
exports.delete = async (id) => {
    return await Tasks.destroy({ where: { id: id } });
}