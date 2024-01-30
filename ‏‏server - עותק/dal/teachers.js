const db = require('../models');
const Teachers = db.Teachers;

exports.create = async (teacher) => {
    return await Teachers.create(teacher);
}
exports.findAll = async () => {
    return await Teachers.findAll();
}
exports.findOne = async (condition) => {
    return await Teachers.findOne(condition);
}
exports.update = async (teacher, id) => {
    return await Teachers.update(teacher, { where: { id: id } });
}
exports.delete = async (id) => {
    return await Teachers.destroy({ where: { id: id } })
}