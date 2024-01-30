module.exports = (sequelize, Sequelize) => {
    const QuestionTests = sequelize.define('question_tests',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            testId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'tests',
                    key: 'id'
                }
            },
            questionId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'questions',
                    key: 'id'
                }
            },
            answerText: {
                type: Sequelize.TEXT
            },
            isChecked: {
                type: Sequelize.INTEGER,
                defaultValue: false
            }
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );
    return QuestionTests;
}