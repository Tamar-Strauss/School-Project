module.exports = (sequelize, Sequelize) => {
    const Questions = sequelize.define('questions',
        {

            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            courseId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'courses',
                    key: 'id'
                }
            },
            text: Sequelize.STRING(255),
            scores: Sequelize.FLOAT,
            isClosed: {
                type: Sequelize.INTEGER
            }
        },
        {
            freezeTableName: true,
            timestamps: false
        });
    return Questions;
}