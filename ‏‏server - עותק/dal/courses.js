const db = require('../models');
const Courses = db.Courses;

exports.findOne = async (condition) => {
    return await Courses.findOne(condition);
}
exports.findOneById = async (id) => {
    return await Courses.findOne({ where: { id: id } });
}
exports.findOneByName = async (courseName) => {
    return await Courses.findOne({ where: { name: courseName } })
}
exports.findAll = async () => {
    return await Courses.findAll({});
}
exports.findAllByTeacherId = async (teacherId) => {
    return await Courses.findAll({ where: { teacherId: teacherId } });
}
exports.findAllByCategoryId = async (categoryId) => {
    return await Courses.findAll({ where: { categoryId: categoryId } });
}
exports.create = async (course) => {
    return await Courses.create(course);
}
exports.update = async (course, id) => {
    return await Courses.update(course, { where: { id: id } });
}
exports.delete = async (id) => {
    return await Courses.destroy({ where: { id: id } });
}