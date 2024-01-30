const db = require('../models');
const CourseStudents = db.CourseStudents;

exports.create = async (courseStudent) => {
    return await CourseStudents.create(courseStudent);
}
exports.findAll = async () => {
    return await CourseStudents.findAll();
}
exports.findAll = async (condition) => {
    return await CourseStudents.findAll(condition);
}
exports.findAllByStudentId = async (studentId) => {
    return await CourseStudents.findAll({ where: { studentId: studentId } });
}
exports.findAllByCourseId = async (courseId) => {
    return await CourseStudents.findAll({ where: { courseId: courseId } });
}
exports.findOne = async (condition) => {
    return await CourseStudents.findOne(condition);
}
exports.findOneById = async (id) => {
    return await CourseStudents.findOne({ where: { id: id } });
}
exports.findByStudentAndCourseId = async (studentId, courseId) => {
    return await CourseStudents.findOne({ where: { studentId: studentId, courseId: courseId } })
}
exports.update = async (courseStudent, id) => {
    return await CourseStudents.update(courseStudent, { where: { id: id } });
}
exports.delete = async (id) => {
    return await CourseStudents.destroy({ where: { id: id } });
}
exports.findDuplicate = async (studentId, courseId) => {
    return await CourseStudents.findOne({ where: { studentId: studentId, courseId: courseId } })
}
exports.joinByCourseId = async (id) => {
    return await CourseStudents.findAll({
        include: [{
            model: db.Courses,
            attributes: [
                `id`,
                `name`,
                `teacherId`,
                `description`,
                `categoryId`,
                `accessPeriod`,
                `price`,
                `image`
            ]
        }],
        where: { courseId: id },
        attributes: [
            `id`,
            `studentId`,
            `courseId`,
            `registerDate`,
            `nextLectureNum`
        ]
    })
}