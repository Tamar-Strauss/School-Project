module.exports = (sequlize, Sequelize) => {
    const CourseStudent = sequlize.define('course_students',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            studentId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'students',
                    key: 'id'
                }
            },
            courseId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'courses',
                    key: 'id'
                }
            },
            registerDate: Sequelize.DATEONLY,
            nextLectureNum: {
                type:Sequelize.INTEGER,
                defaultValue: 0
            }
        },
        {
            freezeTableName: true,
            timestamps: false
        })
    return CourseStudent;
}