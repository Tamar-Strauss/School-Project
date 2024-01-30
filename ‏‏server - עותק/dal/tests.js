const db = require('../models');
const Tests = db.Tests;

exports.create = async (test) => {
    return await Tests.create(test);
}
exports.findAll = async () => {
    return await Tests.findAll();
}
exports.findAll = async (condition) => {
    return await Tests.findAll(condition);
}
exports.findOne = async (condition) => {
    return await Tests.findOne(condition);
}
exports.findOneByCourseStudentId = async (courseStudentId) => {
    return await Tests.findOne({ where: { courseStudentId: courseStudentId } });
}
exports.update = async (test, id) => {
    return await Tests.update(test, { where: { id: id } });
}
exports.delete = async (id) => {
    return await Tests.destroy({ where: { id: id } });
}