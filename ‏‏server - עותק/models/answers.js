module.exports = (sequelize, Sequelize) => {
    const Answers = sequelize.define('answers',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            questionId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'questions',
                    key: 'id'
                }
            },
            text: Sequelize.STRING(255),
            isCorrect: {
                type: Sequelize.INTEGER,
                allowNulls: false
            }

        },
        {
            freezeTableName: true,
            timestamps: false
        });

    return Answers;
}