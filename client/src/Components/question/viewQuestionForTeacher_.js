import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import questionImage from '../../images/questions.jpg';//client\src\images\questions.jpg
import Menu from '../menu/menu';
import { Image } from 'primereact/image';
import { UseGetAllById, UsePutOneById, UseGetOneById } from "../../services/useGetAxios";
import { UseUpdate } from "../../services/UsePutAxios";
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

export default function ViewQuestionForTeacher(props) {
    const toast = useRef(null);
    const [numOfQuestion, setnumOfQuestion] = useState(0);
    const [numQue, setnumQue] = useState(numOfQuestion);
    const [data, setData] = useState(null);
    const [course, setCourse] = useState(-1);
    const [layout, setLayout] = useState('grid');
    const [visible1, setVisible1] = useState(false);
    const [value1, setValue1] = useState(0);
    const [visible, setVisible] = useState(false);
    const [hour, setHour] = useState(0);


    const { courseId } = useParams();
    const navigate = useNavigate();


   
    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>)

    // const accept = () => {
    //     setVisible1(true);
    //     return (
    //         <Dialog header="num. questions" visible={visible1} style={{ width: '50vw' }} onHide={() => setVisible1(false)} footer={footerContent}>
    //             <InputNumber value={numQue} onValueChange={(e) => setnumQue(e.value)} showButtons buttonLayout="vertical" style={{ width: '4rem' }}
    //                 decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
    //         </Dialog>)
    // }


    const message = () => {
        async function fetchData() {
            const res = await UseGetOneById('test_courses/course', courseId);
            console.log(res);
            setnumQue(res.data.numOfQuestions);
            console.log(res.data.numOfQuestions);
        }
        fetchData();
    }
    const updateNumQuestin = () => {
        async function update() {
            const test = {
                courseId: courseId,
                numOfQuestions:numQue,
                hoursOfTest: '03:03:00'
            }
            const res = await UseUpdate('test_courses/update', test);
            if (res && res.status && res.status >= 200)
                console.log(res);
        }
        update()
    }
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await UseGetOneById('courses/teacher', courseId);
    //         if (res.status != 204)
    //             setData(res.data);
    //         else setData(res.statusText)
    //     }
    //     fetchData();
    // }, [])

    const msgs = useRef(null);

    useEffect(() => {
        msgs.current.show([
            { sticky: true, severity: 'info', summary: '', detail: 'In order to produce tests, you need to create a sufficiently large pool of questions, that the randomization of producing a test for each student will carried out with maximum efficiency.', closable: false },
            { sticky: true, severity: 'warn', summary: '', detail: 'Maximum number of questions per course is limited to 100.', closable: false }
        ]);
    }, []);

    const [questions, setQuestions] = useState([]);
    const columns = [
        // { field: 'course_Id', header: 'course_Id' },
        { field: 'Open_Close', header: 'Oepn_Close' },
        { field: 'Question', header: 'Question' },
        { field: 'scores', header: 'score' },
        { field: 'correctAnswer', header: 'correctAnswer' },
        { field: 'WrongAnswer1', header: 'WrongAnswer1' },
        { field: 'WrongAnswer2', header: 'WrongAnswer2' },
        { field: 'WrongAnswer3', header: 'WrongAnswer3' }

    ];

    useEffect(() => {

        const table = [];
        const fetchData = async () => {
            const resQue = await UseGetAllById('questions/course', courseId);
            const question = resQue.data; //arr of questions
            let ans;
            // setQuestions(question)
            if (question) {
                for (let i = 0; i < question.length; i++) {
                    const resAns = await UseGetAllById('answers/questionId', question[i].id);
                    const row = {};
                    const answers = resAns.data;
                    let count = 1;
                    row.Question = question[i].text;
                    row.scores = question[i].scores;
                    row.course_Id = question[i].courseId;
                    row.Open_Close = question[i].isClosed == 1 ? "close" : "open";
                    for (let j = 0; j < answers.length; j++) {
                        if (question[i].isClosed) {
                            if (answers[j].isCorrect) {
                                row.correctAnswer = answers[j].text
                            }
                            else {
                                if (count == 1) {
                                    row.WrongAnswer1 = answers[j].text
                                    count = count + 1;
                                }
                                else if (count == 2) {
                                    row.WrongAnswer2 = answers[j].text
                                    count = count + 1;
                                }
                                else {
                                    row.WrongAnswer3 = answers[j].text
                                    count = count + 1;
                                }
                            }
                        }
                        else {
                            row.correctAnswer = answers[j].text;
                        }
                        console.log(row);

                    }
                    table.push(row)
                }
            }
            setQuestions(table);
        };
        fetchData();
    }, []);
    const addQuestion = (courseId) => {
        navigate(`/questions/add/${courseId}`)
    }

    // console.log(questions.length != 0);
    return (
        <>
            <Menu></Menu>
            <div className='card'>
                <div className="card flex justify-content-center">
                    <Button label="num questions in the test" icon="pi pi-external-link" onClick={() => {message(); setVisible(true)}} />
                    <Dialog header=":)" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                        <label htmlFor="integeronly" className="font-bold block mb-2">num of the questions:</label>
                        <InputNumber inputId="integeronly" value={numQue} onValueChange={(e) => setnumQue(e.value)} />
                        <InputNumber inputId="minmaxfraction" value={hour} onValueChange={(e) => setHour(e.value)} minFractionDigits={2} maxFractionDigits={5} />

                    </Dialog>
                </div>
                <Button label="Add questions" severity="info" text onClick={() => { addQuestion(courseId) }} />
                {questions.length > 0 &&
                    <div className="card">
                        <DataTable value={questions} tableStyle={{ minWidth: '50rem' }}>
                            {columns.map((col, i) => (
                                <Column key={col.field} field={col.field} header={col.header} onClick={() => { navigate('edit') }} />
                            ))}
                        </DataTable>
                    </div>
                }
                <div className="card flex justify-content-center">
                    <Messages ref={msgs} />
                </div>
                <div className="card flex justify-content-center">
                    <Image src={questionImage} width="80%" />
                </div>
                <Button label="Add Question" onClick={() => navigate(`/questions/add/${courseId}`)} />
            </div>
        </>
    )
}