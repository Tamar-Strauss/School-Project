const db = require('../models');
const Answers = db.Answers;

exports.create = async (answer) => {
    return await Answers.create(answer);
}
exports.findAll = async (condition) => {
    if (!condition)
        return await Answers.findAll();
    return await Answers.findAll(condition);
}
exports.findAllByQuestionId = async (questionId) => {
    return await Answers.findAll({ where: { questionId: questionId } })
}
exports.findOne = async (condition) => {
    return await Answers.findOne(condition);
}
exports.findOneById = async (id) => {
    return await Answers.findOne({ where: { id: id } });
}
exports.findCorrectAnswer = async (questionId) => {
    return await Answers.findOne({ where: { questionId: questionId, isCorrect: true } });
}
exports.update = async (answer, id) => {
    return await Answers.update(answer, { where: { id: id } });
}

exports.delete = async (id) => {
    return await Answers.destroy({ where: { id: id } });
}
exports.joinByQuestionId = async (id) => {
    return await Answers.findAll({
        include: [{
            model: db.Questions,
            attributes: [
                `id`,
                `courseId`,
                `text`,
                `scores`,
                `isClosed`
            ]
        }], where: { questionId: id },
        attributes: [
            `id`,
            `questionId`,
            `text`,
            `isCorrect`

        ]
    })
}