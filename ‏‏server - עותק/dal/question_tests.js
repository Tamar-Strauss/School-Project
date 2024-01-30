const db = require('../models');
const QuestionTests = db.QuestionTests;

exports.create = async (questions) => {
    return await QuestionTests.create(questions);
}
exports.findAll = async () => {
    return await QuestionTests.findAll();
}
exports.findAll = async (condition) => {
    return await QuestionTests.findAll(condition);
}
exports.findAllByCourseStudentId = async (courseStudentId) => {
    return await QuestionTests.findAll({ where: { courseStudentId: courseStudentId } });
}
exports.findAllByQuestionId = async (questionId) => {
    return await QuestionTests.findAll({ where: { questionId: questionId } });
}
exports.findOne = async (condition) => {
    return await QuestionTests.findOne(condition);
}
exports.findOneById = async (id) => {
    return await QuestionTests.findOne({ where: { id: id } });
}
exports.update = async (ans, id) => {
    return await QuestionTests.update(ans, { where: { id: id } });
}
exports.delete = async (id) => {
    return await QuestionTests.destroy({ where: { id: id } });
}