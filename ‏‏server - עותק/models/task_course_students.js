module.exports = (sequelize, Sequelize) => {
    const TaskCourseStudent = sequelize.define('task_course_students',
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
        taskId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'tasks',
                key: 'id'
            } 
        },
        isDone: {
            type: Sequelize.TINYINT
        },
        submitDate: Sequelize.DATE,
        text: Sequelize.STRING(255)
    },
    {
        freezeTableName: true,
        timestamps: false
    });
    return TaskCourseStudent;
}