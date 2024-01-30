import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { UseCreate } from '../../services/usePostAxios';
import { Image } from 'primereact/image';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Panel } from 'primereact/panel';
import { Tag } from 'primereact/tag';

import Answer from '../Answer';
import readyForExamImg from '../../images/exams.jpg';
import Menu from '../menu/menu';
import StudentTest from './StudentTest';
import { UseGetAllById, UseGetOneById } from '../../services/useGetAxios';

const CreateTest = (props) => {

    const { courseStudentId } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('userInfo'));

    const [test, setTest] = useState({});
    const [startTest, setStartTest] = useState(false);
    const [answers, setAnswers] = useState({});
    const [questions, setQuestions] = useState();
    const [visibleTest, setVisibleTest] = useState(false);
    const [timeToTest, setTimeToTest] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await UseCreate('tests', { courseStudentId: courseStudentId });
            const resCourseStudent = await UseGetOneById('course_students', courseStudentId);
            const resTestToCourse = await UseGetOneById('test_courses/course', resCourseStudent.data.courseId);
            setTest(res.data);
            setQuestions(res.data.map(e => e.question));
            setTimeToTest(resTestToCourse.data.hoursOfTest);
            localStorage.setItem('test', JSON.stringify(res.data));
        }
        fetchData();
    }, []);
    console.log(questions);

    const confirm = () => {
        navigate(`/start-test/${courseStudentId}`);
        localStorage.setItem('startHour', new Date().toLocaleTimeString());
        setVisibleTest(false);
        setStartTest(true);
    }

    const dialogFooter = <div className="flex flex-column align-items-center" style={{ flex: '1' }}>
        <div className="flex gap-2">
            <Button onClick={() => confirm()} type="button" label="Confirm" className="p-button-success w-6rem" />
            <Button onClick={(e) => setVisibleTest(false)} type="button" label="Cancel" className="p-button-warning w-6rem" />
        </div>
    </div>

    const getSeverity = (question) => {
        if (question.scores <= 5)
            return 'success';
        if (question.scores <= 10)
            return 'warning';
        if (question.scores > 10)
            return 'danger';
        else return null;
    };

    const setAnswersCallBack = (ans) => {
        let _answers = answers;
        _answers[ans.questionId] = ans.text;
        setAnswers(_answers);
    }

    let count;
    const itemTemplate = (question) => {
        count++;
        return (
            <div className="col-12">
                <Panel id={question.id} header={`Question #${count / 2}`} toggleable>
                    <p className="m-0">{question.text}</p>
                    <Tag
                        value={question.scores}
                        severity={getSeverity(question)}
                    />
                    <Answer questionId={question.id} setAnswersCallBack={setAnswersCallBack} />
                </Panel>
            </div>
        );
    };
    return (
        <>
            <Menu />
            {!startTest && <div className='card' style={{ textAlign: 'center' }}>
                <Image src={readyForExamImg} width='40%' />
                <br />
                <p>
                    Rules Of Test in our school:<br />
                    ...<br />
                    Are you ready? <br /><br />
                    <div className="flex flex-column align-items-center" style={{ flex: '1' }}>
                        <div className="flex gap-2">
                            <Button onClick={() => setVisibleTest(true)} type="button" label="Yes" className="p-button-success w-6rem" />
                            <Button onClick={(e) => navigate(`/home-students`)} type="button" label="No" className="p-button-warning w-6rem" />
                        </div>
                    </div>
                    {visibleTest &&
                        <Dialog visible={visibleTest} onHide={() => setVisibleTest(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                            <div className="flex align-items-center flex-column pt-6 px-3">
                                <i className="pi pi-exclamation-triangle" style={{ fontSize: '5rem', color: 'var(--red-400)' }}></i>
                                <h3>Pay Attention!</h3>
                                <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                                    After confirming you would move to the test and time is limited to { }.
                                    <br />Are you ready to start?
                                    <br />
                                </p>
                            </div>
                        </Dialog>}
                </p>
            </div>}
            {

                startTest &&
                <>
                    <DataView
                        value={questions}
                        itemTemplate={itemTemplate}
                        paginator
                        row={5}
                    />
                </>
            }
        </>
    )
}

export default CreateTest;