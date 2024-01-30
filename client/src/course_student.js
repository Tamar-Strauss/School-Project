const dal = require('../dal/course_students');
const task_student_dal = require("../dal/tasks_course_student")
const test_dal = require("../dal/tests")
const tasks_dal = require('../dal/tasks');
const lectures_dal = require('../dal/lectures')

exports.create = async (req, res) => {
    const { studentId, courseId, registerDate } = req.body;
    if (!studentId || !courseId || !registerDate)
        return res.status(400).json({ message: "All fields are required" });

    const duplicate = await dal.findDuplicate(studentId, courseId);
    if (duplicate) {
        res.status(400).send({ message: 'Already registered.' })
    }
    else
        await dal.create(req.body)
            .then(data => res.status(201).send(data))
            .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the question." }))

}
exports.findAll = async (req, res) => {
    // only manager can access
    await dal.findAll()
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(404).send({ message: err.message || "Failed retrieving courses for students." })
        })
}
// According to studentID
exports.findAllByStudentId = async (req, res) => {
    const studentId = req.params.id;
    if (!studentId) {
        res.status(401).send({ message: 'StudentID is required!' })
    }
    await dal.findAllByStudentId(studentId)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(404).send({ message: err.message || "Failed retrieving courses for students." })
        })
}
exports.findAllByCourseId = async (req, res) => {
    const courseId = req.params.id;
    if (!courseId) {
        return res.status(401).send({ message: 'courseId is required!' })
    }
    await dal.findAllByCourseId(courseId)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(404).send({ message: err.message || "Failed retrieving courses for students." })
        })
}
exports.findByStudentAndCourseId = async (req, res) => {
    console.log(req.query);
    const courseId = req.query.courseId;
    const studentId = req.params.id;
    if (!studentId || !courseId) {
        res.status(402).send({ message: 'StudentID & CourseID are required!' })
    }
    else
        await dal.findByStudentAndCourseId(studentId, courseId)
            .then(data => { res.send(data); })
            .catch(err => {
                res.status(404).send({ message: err.message || "Failed retrieving courses for students." })
            })
}
exports.findOne = async (req, res) => {
    const id = req.params.id;
    await dal.findOne(id)
        .then(data => {
            if (data)
                res.send(data);
            else res.status(404).send({ message: `Could not find course for student by id ${id}` });
        })
}
exports.services = async (req, res) => {
    const id = req.body.id;
    if(! id) return res.status(400).send({message: 'Required field is empty'})
    await dal.services(req.body, id)
        .then(num => {
            if (num == 1)
                res.send(`Successfully Updating course for student by id ${id}`);
            else res.status(500).send('Failed Updating');
        });
}
exports.delete = async (req, res) => {
    const id = req.params.id;
    await dal.delete(id)
        .then(num => {
            if (num == 1)
                res.send(`Successfully deletion course for student by id ${id}`)
            else res.status(500).send('Failed Deletion');
        })
}

exports.viewDetails = async (req, res) => {
    const courseStudentId = req.params.id;
    let details = [];
    let numOfLectures = 0;
    const courseStudent = await dal.findOneById(courseStudentId);
    if (courseStudent) {
        const nextLectureNum = courseStudent.nextLectureNum;
        const lectures = await lectures_dal.findAllByCourseId(courseStudent.courseId);
        if (lectures) {
            numOfLectures = lectures.length;
            for (let i = 0; i < lectures.length; i++) {
                const task = await tasks_dal.findOneByLectureId(lectures[i].id);
                if (!task) {
                    details.push({ lectureNum: i + 1, existTask: false, isDone: false, isViewed: i < nextLectureNum });
                }
                else {
                    const taskStudent = await task_student_dal.findOneByTaskId(task.id);
                    if (taskStudent)
                        details.push({ lectureNum: i + 1, existTask: true, isDone: taskStudent.isDone, isViewed: i < nextLectureNum });
                    if (numOfLectures <= nextLectureNum) {
                        const test = await test_dal.findOneByCourseStudentId(courseStudentId);
                        if (test) {
                            details.push({ testScores: test.scores });
                        }
                        else details.push({ testScores: 'Unsubmitted' });
                    }
                }
            }

        }
        return res.send(details);
    }
    return res.status(500).json({ message: `ERROR view details` });
}

exports.canTest = async (courseStudentId) => {
    const courseStudent = await dal.findOne({ where: { id: courseStudentId } });
    if (courseStudent) {
        const nextLectureNum = courseStudent.nextLectureNum;
        const lectures = await lectures_dal.findAllByCourseId(courseStudent.courseId);
        console.log(lectures);
        console.log(nextLectureNum);
        console.log(lectures.length);
        if (lectures) {
            if (nextLectureNum > lectures.length)
                return true;
        }
    }
    return false;
}