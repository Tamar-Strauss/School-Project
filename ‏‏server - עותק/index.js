// בסיעתא דשמיא
require('dotenv').config();
const cors = require("cors");
const express = require('express');

const answerRouter = require('./routes/answers');
const questionTestRouter = require('./routes/question_tests');
const categoryRouter = require('./routes/categories');
const testRouter = require('./routes/tests');
const courseRouter = require('./routes/courses');
const courseStudentRouter = require('./routes/course_student');
const lectureRouter = require('./routes/lectures');
const questionRouter = require('./routes/questions');
const studentRouter = require('./routes/students');
const taskRouter = require('./routes/tasks');
const taskStudentRouter = require('./routes/task_course_student');
const teacherRouter = require('./routes/teachers');
const testCourseRouter = require('./routes/test_courses');

const app = express();
const PORT = process.env.PORT || 8000;

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '150mb', extended: true }));

app.use('/answers', answerRouter);
app.use('/question_tests', questionTestRouter);
app.use('/categories', categoryRouter);
app.use('/courses', courseRouter);
app.use('/course_students', courseStudentRouter);
app.use('/lectures', lectureRouter);
app.use('/questions', questionRouter);
app.use('/students', studentRouter);
app.use('/tasks', taskRouter);
app.use('/teachers', teacherRouter);
app.use('/tests', testRouter);
app.use('/test_courses', testCourseRouter);
app.use('/task_course_student', taskStudentRouter);

const db = require('./models');

db.sequelize.sync({ force: false })
    .then(() => { console.log('yes re-sync done!') })
    .catch((err) => { console.log("Failed to sync db: " + err.message); });

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });