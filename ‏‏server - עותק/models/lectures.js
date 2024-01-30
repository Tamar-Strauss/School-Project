module.exports = (sequelize, Sequelize) => {
    const Lectures = sequelize.define('lectures',
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
            video: {
                type: Sequelize.STRING(255)
            },
            lectureNum: {
                type: Sequelize.INTEGER
            }
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );
    return Lectures;
}