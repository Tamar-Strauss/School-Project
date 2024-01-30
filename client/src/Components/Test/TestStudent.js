import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import { UseCreate } from '../../services/usePostAxios';
import { useParams } from 'react-router-dom';
import Answer from '../Answer';
import { UseUpdate } from '../../services/UsePutAxios';
import Stopwatch from './Stopwatch';
import testImage from '../../images/test.png'
import Menu from '../menu/menu';
const StudentTest = (props) => {

    const { courseStudentId } = useParams();

    const user = JSON.parse(localStorage.getItem('userInfo'));

    const [test, setTest] = useState({});
    const [storedTest, setStoredTest] = useState((key = 'test', initial = null) => {
        const stored = JSON.parse(localStorage.getItem(key));
        return stored ?? null;
    })
    const [answers, setAnswers] = useState({});
    const [questions, setQuestions] = useState();
    const [submit, setSubmit] = useState(false);
    const [afterTest, setAfterTest] = useState(false);

    const toast = useRef(null);
    const toastBC = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const res = await UseCreate('tests', { courseStudentId: courseStudentId });
            setTest(res.data);
            setQuestions(res.data.map(e => e.question));
            localStorage.setItem('test', JSON.stringify(res.data));
        }
        if (storedTest == null)
            fetchData();
        else {
            setTest(storedTest);
            setQuestions(storedTest.map(e => e.question));
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            let questionTest = [];
            for (let i = 0; i < test.length; i++) {
                console.log(test[i]);
                questionTest[i] = test[i].questionTest;
                questionTest[i].answerText = answers[test[i].question.id];
            }
            console.log(questionTest);
            console.log(test)
            const res = await UseUpdate(`tests/submit`, { test: questionTest });
            debugger;
            console.log(res);
            setSubmit(false);
            // navigate('/home-students');
        }
        if (submit)
            fetchData();
    }, [submit]);

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

    let count = 0;
    const itemTemplate = (question) => {
        count++;
        return (
            <div className="col-12">
                <br />
                <div id={question.id} header={`Question #${count / 2}`} toggleable>
                    <p className="m-0">{question.text}</p>
                    <Tag
                        value={question.scores}
                        severity={getSeverity(question)}
                    />
                    <Answer questionId={question.id} setAnswersCallBack={setAnswersCallBack} />
                </div>
                <br />
            </div>
        );
    };

    const submitTest = () => {
        console.log(answers);
        setSubmit(true);
    }
    const confirm = () => {
        submitTest();
        setShowMessage(false);
        setAfterTest(true)
    }

    const [showMessage, setShowMessage] = useState(false);
    const dialogFooter = <div className="flex flex-column align-items-center" style={{ flex: '1' }}>
        <div className="flex gap-2">
            <Button onClick={confirm} type="button" label="Confirm" className="p-button-success w-6rem" />
            <Button onClick={(e) => setShowMessage(false)} type="button" label="Cancel" className="p-button-warning w-6rem" />
        </div>
    </div>

    console.log(answers);
    return (
        <>
            <div className="card">
                <div className='flex justify-content-between'>
                    <Image src={testImage} width='20%' />
                </div>
                <Divider />
                {/* <Stopwatch /> */}
                {showMessage &&
                    <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                        <div className="flex align-items-center flex-column pt-6 px-3">
                            <i className="pi pi-exclamation-triangle" style={{ fontSize: '5rem', color: 'var(--red-400)' }}></i>
                            <h3>Pay Attention!</h3>
                            <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                                After submitting the test it would be impossible to try it again.
                                <br />Are you sure you want to submit?
                            </p>
                        </div>
                    </Dialog>}
                {!afterTest && <>
                    <DataView
                        value={questions}
                        itemTemplate={itemTemplate}
                        paginator
                        rows={5}
                    />
                    <br />
                    <div className="card flex justify-content-center">
                        <Toast ref={toast} />
                        <Toast ref={toastBC} position="bottom-center" />
                        <Button type="button" onClick={() => { setShowMessage(true); }} label="Submit" />
                    </div>
                </>}
                {afterTest &&
                    <Dialog visible={afterTest} position="top" showHeader={false}>
                        <div className="flex align-items-center flex-column pt-6 px-3">
                            <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-400)' }}></i>
                            <h3>successfully submition your test</h3>
                            <Button label='Go Home' onClick={() => { navigate('/home-students') }} />
                            {/* <Button label=''/>  */}
                        </div>
                    </Dialog>}
            </div>
        </>

    );
}

export default StudentTest;
// limited time !!!