const db = require('../models');
const Lectures = db.Lectures;
const { Op } = require("sequelize");

exports.create = async (lecture) => {
    return await Lectures.create(lecture);
}
exports.findAllByCourseId = async (courseId) => {
    return await Lectures.findAll({ where: { courseId: courseId } });
}
exports.findAllInCourseUntilLectureNum = async (courseId, nextLectureNum) => {
    return await Lectures.findAll({ where: { courseId: courseId, lectureNum: { [Op.lt]: nextLectureNum } } });
}
exports.findAllByCourseId = async (courseId) => {
    return await Lectures.findAll({where: {courseId: courseId}});
}
exports.findOneById = async (id) => {
    return await Lectures.findOne({ where: { id: id } })
}
exports.findByLectureNumOfCourse = async (courseId, lectureNum) => {
    return await Lectures.findOne({ where: { courseId: courseId, lectureNum: lectureNum } })
}
exports.update = async (lecture, id) => {
    return await Lectures.update(lecture, { where: { id: id } })
}
exports.delete = async (id) => {
    return await Lectures.destroy({ where: { id: id } })
}