module.exports = (sequelize, Sequelize) => {
    const TestCourse = sequelize.define('test_courses',
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
                },
                allowNulls: false
            },
            numOfQuestions: Sequelize.INTEGER,
            hoursOfTest: {
                type: Sequelize.FLOAT,
                defaultValue: 3
            }
        },
        {
            freezeTableName: true,
            timestamps: false
        });
    return TestCourse;
}