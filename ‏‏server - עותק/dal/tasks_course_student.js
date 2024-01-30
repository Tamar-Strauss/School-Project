const db = require('../models');
const TaskCourseStudent = db.TaskCourseStudent;

exports.create = async (task) => {
    return await TaskCourseStudent.create(task);
}
exports.findAll = async (condition) => {
    return await TaskCourseStudent.findAll(condition);
}
exports.findAll = async () => {
    return await TaskCourseStudent.findAll();
}
exports.findByCourseStudentIdAndTaskId = async (courseStudentId, taskId) => {
    return await TaskCourseStudent.findOne({ where: { courseStudentId: courseStudentId, taskId: taskId } });
}
exports.findOne = async (condition) => {
    return await TaskCourseStudent.findOne(condition);
}
exports.findOneByTaskId = async (taskId) => {
    return await TaskCourseStudent.findOne({ where: { taskId: taskId } });
}
exports.update = async (task, id) => {
    return await TaskCourseStudent.update(task, { where: { id: id } });
}
exports.delete = async (id) => {
    return await TaskCourseStudent.destroy({ where: { id: id } });
}