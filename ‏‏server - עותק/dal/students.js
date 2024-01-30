const db = require('../models');
const Students = db.Students;

exports.create = async (student) => {
    return await Students.create(student)
}
exports.findAll = async () => {
    return await Students.findAll();
}
exports.findOne = async (condition) => {
    return await Students.findOne(condition);
}
exports.findOneById = async (id) => {
    return await Students.findOne({ where: { id: id } });
}
exports.findOneByIDNumber = async (idNumber) => {
    return await Students.findOne({ where: { idNumber: idNumber } });
}
exports.findOneByPassword = async (password) => {
    return await Students.findOne({ where: { password: password } });
}
exports.update = async (student, id) => {
    return await Students.update(student, { where: { id: id } });
}
exports.delete = async (id) => {
    return await Students.destroy({ where: { id: id } });
}