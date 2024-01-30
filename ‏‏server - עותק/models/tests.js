module.exports = (sequelize, Sequelize) => {
    const Tests = sequelize.define('tests',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            courseStudentId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'course_students',
                    key: 'id'
                }
            },
            date: Sequelize.DATE,
            secureVideo: {
                type: Sequelize.STRING(255)
            },
            maxScores: Sequelize.FLOAT,
            scores: Sequelize.FLOAT,
            isSubmitted: {
                type: Sequelize.TINYINT(1),
                defaultValue: false
            }  
        },
        {
            freezeTableName: true,
            timestamps: false
        });
    return Tests;
}