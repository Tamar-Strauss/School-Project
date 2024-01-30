const db = require('../models');
const Questions = db.Questions;

exports.create = async (question) => {
    return await Questions.create(question);
}
exports.findAll = async () => {
    return await Questions.findAll();
}
exports.findAllByCourseId = async (courseId) => {
    return await Questions.findAll({ where: { courseId: courseId } });
}
exports.findAll = async (condition) => {
    return await Questions.findAll(condition);
}
exports.findOne = async (condition) => {
    return await Questions.findOne(condition);
}
exports.findOneById = async (id) => {
    return await Questions.findOne({ where: { id: id } });
}
exports.update = async (question, id) => {
    return await Questions.update(question, { where: { id: id } });
}
exports.delete = async (id) => {
    return await Questions.destroy({ where: { id: id } });
}