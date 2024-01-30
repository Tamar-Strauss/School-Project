module.exports = (sequelize, Sequelize) => {
    const QuestionTypes = sequelize.define('question_types',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: Sequelize.STRING(15),//open or multiple choise
        },
        {
            freezeTableName: true,
            timestamps: false
        });
    return QuestionTypes;
}