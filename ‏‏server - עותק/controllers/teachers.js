const dal = require('../dal/teachers');
const course_dal = require('../dal/courses');
const course_student_dal = require('../dal/course_students');
const bcrypt = require('bcrypt');
const mailer = require('../services/mailer');
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {

    console.log('register ', req.body);
    const { name, idNumber, email, password } = req.body;
    if (!idNumber || !email || !password) {
        return res.status(200).send({ message: "All fields are required" });
    }
    const duplicate = await dal.findOne({ where: { idNumber: idNumber } })
    console.log(duplicate);
    if (duplicate) {
        console.log("duplicate");
        return res.status(200).send({ message: "Duplicate teacher" })
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    const teacherObject = { name, idNumber, email, password: hashedPwd }
    const teacher = await dal.create(teacherObject);
    if (teacher) {
        const subject = 'Welcome to our school';
        const body = 'Dear Teacher, Thank you for joining 👍,\nHappy to see you with us.\nWish you beneficial experience!\n😊';
        mailer.sendEmail(email, subject, body)
            .then(info => {
                console.log('Email sent: ', info.response);
            })
            .catch(error => {
                return res.status(500).send('Failed to send email');
            });
        return res.status(201).json({
            message: `New teacher ${name} created`
        })
    }
    return res.status(400).send({ message: 'Invalid teacher data received' })
}

exports.login = async (req, res) => {

    const { idNumber, password } = req.query;
    if (!idNumber || !password) {
        return res.status(400).send({ message: "All fields are required" })
    }
    console.log(idNumber, password);
    const finduser = await dal.findOne({ where: { idNumber: idNumber } })
    if (!finduser) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    const match = await bcrypt.compare(password, finduser.password);
    if (!match) {
        return res.status(402).send({ message: 'The password is mistake' });
    }
    const userInfo = {
        id: finduser.id,
        name: finduser.name,
        idNumber: finduser.idNumber,
        email: finduser.email,
        status: 'teachers'
    };
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken, userInfo: userInfo });
}

exports.findAll = async (req, res) => {
    await dal.findAll()
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send(err.message); });
}

exports.findById = async (req, res) => {
    const id = req.params.id;
    await dal.findOne({ where: { id: id } })
        .then(data => {
            if (data)
                res.send(data);
            else res.status(404).send({ message: `Cannot find teacher by id = ${id}` });
        })
}
exports.findByEmail = async (req, res) => {
    const email = req.params.email;
    if (!email)
        res.status(204).send({message: `email is required`});
    await dal.findOne({ where: { email: email } })
        .then(data => {
            if (data)
                res.send(data);
            else res.status(404).send({ message: `Cannot find teacher by email ${email}` });
        })
}
const courses = require('./courses');
const { loadavg } = require('os');
exports.findCoursesByTeacherId = async (req, res) => {
    return await courses.findByTeacherId(req, res);
}
exports.update = async (req, res) => {
    const id = req.body.id;
    teacher = req.body;
    await dal.update(teacher, id)
        .then(num => {
            if (num == 1)
                res.send({ message: "Teacher was updated successfully." })
            else res.send({
                message:
                    `Cannot update teacher with id ${id}. Maybe teacher was not found or req.body is empty!`
            })
        });
}
exports.delete = async (req, res) => {
    //לבדוק האם יש קורס בתוקף בבעלות המורה
    const id = req.params.id;
    if (activeCourses(id))
        return res.status(500).json({ message: `There are active courses for teacher with id ${id}.\nHe cannot be deleted!` })
    await dal.delete(id)
        .then(num => {
            if (num == 1) {
                res.send({ message: `Teacher was deleted successfully! 👍` });
                const to = req.body.email;
                const subject = 'Deleted Successfully';
                const body = 'You will be required to sign up again, \nif you want to upload a new course or anything else.\n\nGood Luck!';
                mailer.sendEmail(to, subject, body)
                    .then(info => {
                        console.log('Email sent: ', info.response);
                    })
                    .catch(error => {
                        console.log('Error sending email: ', error);
                        res.status(500).send('Failed to send email');
                    });
            }
            else res.status(404).send({ message: `Cannot delete teacher with id ${id}` })
        })
}

const activeCourses = async (id) => {
    await course_dal.findAll({ where: { teacherId: id } })
        .then(async courses => {
            for (let i = 0; i < courses.length; i++) {
                if (courses[i].untilDate < new Date()) {
                    await course_student_dal.findAll({ where: { courseId: courses[i].id } })
                        .then(coursesStudents => {
                            if (coursesStudents)// there is an active course for this teacher
                                return true;
                        })
                }
            }
            return false;
        });
}
 