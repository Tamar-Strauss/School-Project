import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';                                   // css utility
import './index.css';

import Start from './Components/Start';
import SignUpTeachers from './Components/sign-up/SignUpTeachers';
import SignUpStudents from './Components/sign-up/SignUpStudents';
import HomeStudent from './Components/Home/home-student';
import HomeTeacher from './Components/Home/home-teacher';
import Courses from './Components/course/Courses';
import { SignUp } from './Components/sign-up/SignUp';
import { SignIn } from './Components/sign-in/SignIn';
import Lectures from './Components/lecture/Lecture';
import CoursesForStudent from './Components/course_student/CoursesForStudent';
import { Task } from './Components/task/Task';
import AddCourse from './Components/course/addCourse';
import UploadLecture from './Components/lecture/UploadLecture';
import  Payment from './Components/payment/Payment';
import UserProvider from './Components/UserProvider';
import CreateTest from './Components/Test/CreateTest'
import CoursesForTeachers from './Components/course_teacher/CoursesForTeacher';
import Test from './Components/Test/test'
import PaymentTeacher from './Components/payment/paymentTeacher';
import ViewQuestionForTeacher from './Components/question/viewQuestionForTeacher';
import TeacherTests from './Components/Test/TeacherTests';
import StudentTest from './Components/Test/StudentTest';
import TestStudent from './Components/Test/TestStudent';
import { TestTeacher } from './Components/Test/TestTeacher';

function App() {

  // const [status, setStatus] = useState('');
  // const [userId, setUserId] = useState();

  // const setUserIdCallback = (id) => {
  //   setUserId(id);
  // }

  // const setUserStatusCallback = (status) => {
  //   setStatus(status);
  // }

  return (
    // <UserProvider userId={userId} status={status}> // setUserId={setUserIdCallback} setStatus={setUserStatusCallback}
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Start />} />
          <Route exact path='/sign-in/:code' element={<SignIn />} />
          <Route exact path='/sign-up' element={<SignUp />} />
          <Route exact path='/home-students' element={<HomeStudent />} />
          <Route exact path='/home-teachers' element={<HomeTeacher />} />
          <Route exact path='/sign-up/teacher' element={<SignUpTeachers />} />
          <Route exact path='/sign-up/student' element={<SignUpStudents />} />
          <Route exact path='/courses' element={<Courses />} />
          <Route exact path='/addCourse' element={<AddCourse />} />
          <Route exact path='/courses/students/my-courses' element={<CoursesForStudent />} />
          <Route exact path='/courses/teachers/my-courses' element={<CoursesForTeachers />} />
          <Route exact path='/lectures/:courseId' element={<Lectures />} />
          <Route exact path='/lectures/create/:courseId' element={<UploadLecture />} />
          <Route exact path='/payment/:courseId' element={<Payment />} />
          <Route exact path='addCourse/payment/:numLectures' element={<PaymentTeacher />} />
          <Route exact path='/teacher/viewQuestion/:courseId' element={<ViewQuestionForTeacher />} />
          <Route exact path='questions/add/:courseId' element={<Test />} />
          <Route exact path='/test/:courseStudentId' element={<CreateTest />} />
          <Route exact path='/start-test/:courseStudentId' element={<TestStudent />} />
          <Route exact path='test/start-test' element={<StudentTest />}/>
          {/* מבחנים בדוקים ואו בתהליך בדיקה */}
          {/* <Route exact path='/tests' element={<TeacherTests />} /> */}
          <Route exact path='/tests' element={<TestTeacher />} />
          <Route exact path='/course/payment' element={<h1>Buy a course & Pay</h1>} />
          <Route exact path='/task' element={<Task />} />
          <Route exact path='/*' element={<h1>Not Found, Sorry 😒</h1>} />

        </Routes>
        
      </div>
    </Router>
    // </UserProvider>
  );
}

export default App;