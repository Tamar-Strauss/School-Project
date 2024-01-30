const dal = require('../dal/courses');
const lectures_dal = require('../dal/lectures');

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
            res.status(500).send({ message: err.message || "Some errors occured while creating the course." });
        })
}

// find a course by its name
exports.findByName = async (req, res) => {
    const courseName = req.params.name;
    await dal.findOneByName(courseName)
        .then(course => {
            if (course) {
                res.send(course);
            }
            else {
                res.status(404).send({
                    message: `cannot find course by name: ${courseName}`
                });
            }
        })
};
// find a course by its id 
exports.findById = async (req, res) => {
    const id = req.params.id;
    await dal.findOneById(id)
        .then(data => {
            if (data)
                res.send(data);
            else res.status(404).send({ message: `Cannot find course by id = ${id}` })
        })
}
exports.findAll = async (req, res) => {
    await dal.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: "Some error occurred while retrieving courses." });
        })
}
exports.findByCategoryId = async (req, res) => {
    const categoryId = req.params.id;
    await dal.findAll(categoryId)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({ message: "Some error occurred while retrieving courses." });
        })
}
exports.findByTeacherId = async (req, res) => {
    const teacherId = req.params.id;
    await dal.findAllByTeacherId(teacherId)
        .then(data => { res.send(data) })
        .catch(err => {
            res.status(500).send({ message: "Some error occurred while retrieving courses." });
        })
}
exports.update = async (req, res) => {
    const id = req.body.id;
    await dal.update(req.body, id)
        .then(num => {
            if (num == 1)
                res.send({ message: "Courses was updated successfully." });
            else res.send({ message: `Cannot update Course with id = ${id}.Maybe Course was not found or req.body is empty!` });
        });
}
exports.delete = async (req, res) => {
    const id = req.params.id;
    await dal.delete(id)
        .then(num => {
            if (num == 1)
                res.send({ message: `Course was deleted successfully! 👍` })
            else res.send({ message: `Cannot delete Course with id = ${id}. Maybe Course was not found!` })
        })
        .catch(err => {
            res.status(500).send({ message: `Could not delete course with id ${id}` })
        })
}

exports.getNextLectureNum = async (req, res) => {
    const id = req.params.id;
    const lectures = await lectures_dal.findAllByCourseId(id);
    if (lectures.length < 1) {
        return res.send({lectureNum: 1});
    }
    const sorted = lectures.sort((l1, l2) => {
        return l1.lectureNum - l2.lectureNum
    })
    const lastLectureNum = sorted[sorted.length - 1].lectureNum;
    res.send({lectureNum: lastLectureNum + 1});

}