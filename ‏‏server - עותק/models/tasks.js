module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define('tasks',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            lectureId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
                references: {
                    model: 'lectures',
                    key: 'id'
                }
            },
            submitLastDate: Sequelize.INTEGER, //number of days after registering to course
            taskFile: Sequelize.STRING(1000) //save file - how?
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );
    return Task;
}