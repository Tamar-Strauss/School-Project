const db = require('../models');
const TestCourse = db.TestCourse;

exports.create = async (test) => {
    return await TestCourse.create(test);
}
exports.findAll = async () => {
    return await TestCourse.findAll();
}
exports.findOne = async (condition) => {
    return await TestCourse.findOne(condition);
}
exports.update = async (test, id) => {
    return await TestCourse.update(test, { where: { id: id } });
}
exports.delete = async (id) => {
    return await TestCourse.destroy({ where: { id: id } });
}