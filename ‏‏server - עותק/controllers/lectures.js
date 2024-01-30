const dal = require('../dal/lectures');
const course_dal = require('../dal/courses');
const course_student_dal = require('../dal/course_students')

exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can't be empty!"
        });
        return;
    }
    await dal.create(req.body)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some errors occured while creating the lecture." });
        })
}
//findAllByCourseId = כל השיעורים לקורס מסויים
exports.findAll = async (req, res) => {
    const courseId = req.body.courseId;
    await dal.findAllByCourseId(courseId)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({ message: `Some error occurred while retrieving courses for courseId ${courseId}.` });
        })
}
// שיעור מקורס מסויים לפי מספר שיעור
exports.findByNum = async (req, res) => {
    const courseId = req.body.courseId;
    const lectureNum = req.body.lectureNum;
    await dal.findByLectureNumOfCourse(courseId, lectureNum)
        .then(data => {
            if (data)
                res.send(data);
            else res.status(404).send({ message: `Cannot find lecture no.${lectureNum} of courseID ${courseId}` })
        });
}
// שיעורים מקורס מסויים לתלמיד עד מספר השיעור הבא של התלמיד בקורס הזה
exports.findUntilNum = async (req, res) => {
    const courseStudentId = req.params.id;
    await course_student_dal.findOneById(courseStudentId)
        .then(async courseStudent => {
            if (!courseStudent) {
                res.send({ message: `No course for student found to courseStudentId ${courseStudentId}` })
            };
            const num = courseStudent.nextLectureNum + 1;            

            courseStudent.nextLectureNum = num;
            course_student_dal.update(courseStudent, courseStudentId);

            await dal.findAllInCourseUntilLectureNum(courseStudent.courseId, num)
                .then(async lecturesUntilNum => {
                    res.send(lecturesUntilNum)
                }).catch(err => {
                        res.send({ message: `No Lectures found to courseID ${courseStudent.courseId}` || err.message })
                    })
        });
}

exports.findAllByCourseId = async (req, res) => {
    const courseId = req.params.id;
    if(! courseId) {
        res.status(400).send({message: 'CourseID is required!'})
    }
    const lectures = await dal.findAllByCourseId(courseId);
    if(lectures){
        res.status(200).send(lectures)
    }
    else res.status(204).send({message: 'No lectures for this course'})
}
exports.findAllByTeacherId = async (req, res) => {
    const teacherId = req.params.id;
    if(! teacherId) {
        res.status(400).send({message: 'TeacherId is required!'})
    }
    const lectures = await dal.findAllByTeacherId(teacherId);
    if(lectures){
        res.status(200).send(lectures)
    }
    else res.status(204).send({message: 'No lectures for this course'})
}
exports.findById = async (req, res) => {
    const id = req.params.id;
    await dal.findOneById(id)
        .then(data => {
            if (data)
                res.send(data);
            else res.status(404).send({ message: `Cannot find lecture with id ${id}` })
        })
}
exports.update = async (req, res) => {
    const id = req.body.id;
    await dal.update(req.body, id)
        .then(num => {
            if (num == 1)
                res.send({ message: "Lecture was updated successfully." });
            else res.send({ message: `Cannot update lecture with id ${id}. Maybe lecture was not found or req.body is empty!` });
        });
}
exports.delete = async (req, res) => {
    const id = req.params.id;
    await dal.delete(id)
        .then(num => {
            if (num == 1)
                res.send({ message: `Course was deleted successfully! 👍` })
            else res.send({ message: `Cannot delete lecture with id ${id}. Maybe lecture was not found!` })
        })
        .catch(err => {
            res.status(500).send({ message: `Could not delete lecture with id ${id}` })
        })
}

// exports.getLecturesByCourseStudentId = async (req, res) => {
//     const courseStudentId = req.params.id;
//     if(!courseStudentId){
//         res.send({message: 'CourseStudentID is required!'});
//     }
//     const courseStudent = await dal.findOneById(courseStudentId);
//     const course = await courses_dal.findOneById(courseStudent.courseId);
//     const lectures = await lectures_dal.findAllByCourseId(course.id);
//     if(!lectures) {
//         res.send({message: 'No Lectures found'});
//     }
//     res.send(lectures);
// }