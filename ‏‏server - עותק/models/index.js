const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)


const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Answers = require('./answers')(sequelize, DataTypes);
db.Categories = require('./categories')(sequelize, DataTypes);
db.Tests = require('./tests')(sequelize, DataTypes);
db.Courses = require('./courses')(sequelize, DataTypes);
db.CourseStudents = require('./course_students')(sequelize, DataTypes);
db.Lectures = require('./lectures')(sequelize, DataTypes);
db.Questions = require('./questions')(sequelize, DataTypes);
db.QuestionTests = require('./question_tests')(sequelize, DataTypes);
db.Students = require('./students')(sequelize, DataTypes);
db.Tasks = require('./tasks')(sequelize, DataTypes);
db.Teachers = require('./teachers')(sequelize, DataTypes);
db.TestCourse = require('./test_courses')(sequelize, DataTypes);
db.TaskCourseStudent = require('./task_course_students')(sequelize, DataTypes);

db.CourseStudents.belongsTo(db.Courses, { foreignKey: 'courseId' });
db.Answers.belongsTo(db.Questions, { foreignKey: 'questionId' });
module.exports = db;