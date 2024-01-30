import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import questionImage from '../../images/questions.jpg';
import Menu from '../menu/menu';
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { UseUpdate } from '../../services/UsePutAxios';
import { Dialog } from 'primereact/dialog';
import { UseGetAllById, UseGetOneById } from "../../services/useGetAxios";
import { DeleteById } from "../../services/useDeleteAxioes";

import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Checkbox } from "primereact/checkbox";


export default function QuestionsForTeacher() {
    const [questions, setQuestions] = useState([]);
    const [Row, setRow] = useState({});

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
    const [hour_, setHour_] = useState(hour);
    const [checked, setChecked] = useState(false);


    const { courseId } = useParams();
    const navigate = useNavigate();


    const columns = [
        { field: 'delete', header: 'delete' },
        { field: 'Open_Close', header: 'Open_Close' },
        { field: 'Question', header: 'Question' },
        { field: 'scores', header: 'score' },
        { field: 'CorrectAnswer', header: 'correctAnswer' },
        { field: 'WrongAnswer1', header: 'WrongAnswer1' },
        { field: 'WrongAnswer2', header: 'WrongAnswer2' },
        { field: 'WrongAnswer3', header: 'WrongAnswer3' }
    ];

    const footerContent = (
        <div>
            <Button label="cancel" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="save" icon="pi pi-check" onClick={() => { setVisible(false); UpdateDetails() }} autoFocus />
        </div>)

    const message = () => {
        async function fetchData() {
            const res = await UseGetOneById('test_courses/course', courseId);
            console.log(res);
            setnumQue(res.data.numOfQuestions);
            console.log(res.data.numOfQuestions);
            setHour_(res.data.hoursOfTest);
            console.log(res.data.hoursOfTest);
        }
        fetchData();
    }
    const UpdateDetails = () => {
        async function update() {
            const test_before = await UseGetOneById('test_courses/course', courseId);
            const test = {
                id: test_before.data.id,
                courseId: courseId,
                numOfQuestions: numQue,
                hoursOfTest: hour_
            }
            const res = await UseUpdate('test_courses', test);
            if (res && res.status && res.status >= 200)
                console.log(res);
        }
        update()
    }

    const table = [];
    useEffect(() => {
        const fetchData = async () => {
            const resQue = await UseGetAllById('questions/course', courseId);
            const question = resQue.data;
            let ans;
            if (question) {
                for (let i = 0; i < question.length; i++) {
                    const resAns = await UseGetAllById('answers/questionId', question[i].id);
                    const row = {};
                    const answers = resAns.data;
                    let count = 1;
                    row.Question = question[i].text;
                    row.scores = question[i].scores;
                    row.course_Id = question[i].courseId;
                    row.QuestionId = question[i].id;
                    row.Open_Close = question[i].isClosed == 1 ? "close" : "open";
                    for (let j = 0; j < answers.length; j++) {
                        if (question[i].isClosed) {
                            // UpdateNumQuestin()
                            if (answers[j].isCorrect) {
                                row.CorrectAnswer = answers[j].text;
                                row.CorrectAnswerId = answers[j].id;
                            }
                            else {
                                if (count == 1) {
                                    row.WrongAnswer1 = answers[j].text
                                    row.WrongAnswer1Id = answers[j].id;
                                    count = count + 1;
                                }
                                else if (count == 2) {
                                    row.WrongAnswer2 = answers[j].text
                                    row.WrongAnswer2Id = answers[j].id;
                                    count = count + 1;
                                }
                                else {
                                    row.WrongAnswer3 = answers[j].text
                                    row.WrongAnswer3Id = answers[j].id

                                    count = count + 1;
                                }
                            }
                        }
                        else {
                            row.WrongAnswer1 = '-----'
                            row.WrongAnswer2 = '-----'
                            row.WrongAnswer3 = '-----'
                            row.CorrectAnswer = answers[j].text;
                            row.CorrectAnswerId = answers[j].id;
                        }
                        console.log(row);
                    }
                    table.push(row)
                    setRow(table);
                }
            }
            setQuestions(table);
        };
        fetchData();
    }, []);

    const onCellEditComplete = (e) => {
        let { rowData, newValue, field, originalEvent: event, rowIndex } = e;
        if (newValue && newValue.length > 0)
            rowData[field] = newValue;
        else event.preventDefault();

        const fetchData = async () => {
            console.log('row');
            console.log(e);

            console.log(Row);
            const obj = Row[rowIndex];
            if (field == 'scores' || field == 'Question') {
                const res = await UseGetAllById('questions', obj.QuestionId);
                const newObj = res.data;
                if (field == 'scores') {
                    newObj.scores = newValue;
                    console.log(newObj);
                }
                else {
                    newObj.text = newValue;
                    console.log(newObj);
                }
                const resUpdate = await UseUpdate('questions', newObj);
                console.log(resUpdate);
            }
            if (field == 'WrongAnswer1') {
                const res = await UseGetAllById('answers', obj.WrongAnswer1Id);
                const newObj = res.data;
                newObj.text = newValue;
                const resUpdate = await UseUpdate('answers', newObj);
                console.log(resUpdate);
                console.log(newObj);
            }
            else if (field == 'WrongAnswer2') {
                const res = await UseGetAllById('answers', obj.WrongAnswer2Id);
                const newObj = res.data;
                newObj.text = newValue;
                const resUpdate = await UseUpdate('answers', newObj);
                console.log(resUpdate);
                console.log(newObj);
            }
            else if (field == 'WrongAnswer3') {
                const res = await UseGetAllById('answers', obj.WrongAnswer3Id);
                const newObj = res.data;
                newObj.text = newValue;
                const resUpdate = await UseUpdate('answers', newObj);
                console.log(resUpdate);
                console.log(newObj);
            }
            else if (field == 'CorrectAnswer') {
                const res = await UseGetAllById('answers', obj.CorrectAnswerId);
                const newObj = res.data;
                newObj.text = newValue;
                const resUpdate = await UseUpdate('answers', newObj);
                console.log(resUpdate);
                console.log(newObj);
            }
            else if (field == 'delete') {
                // if ()
                const resQuestion = await DeleteById('questions', e.newRowData.QuestionId);
                console.log(resQuestion);
                const resCorAns = await DeleteById('questions', e.newRowData.CorrectAnswerId);
                console.log(resCorAns);

                if (e.newRowData.Open_Close == 'close') {
                    const resW1_Ans = await DeleteById('questions', e.newRowData.WrongAnswer1Id);
                    console.log(resW1_Ans);
                    const resW2_Ans = await DeleteById('questions', e.newRowData.WrongAnswer2Id);
                    console.log(resW2_Ans);
                    const resW3_Ans = await DeleteById('questions', e.newRowData.WrongAnswer3Id);
                    console.log(resW3_Ans);
                }
            }

        }
        fetchData();
    }
    const cellEditor = (options) => {
        if (options.field === 'Question') return questionEditor(options);
        else if (options.field === 'CorrectAnswer') return answerCEditor(options);
        else if (options.field === 'WrongAnswer1') return answerW1Editor(options);
        else if (options.field === 'WrongAnswer2') return answerW2Editor(options);
        else if (options.field === 'WrongAnswer3') return answerW3Editor(options);
        else if (options.field === 'scores') return scoreEditor(options);
        else if (options.field === 'delete') return deleteEditor(options);

    };
    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const deleteQuestion = (e) => {
        async function fetchData(e) {
            debugger
            const resQuestion = await DeleteById('questions', e.newRowData.QuestionId);
            console.log(resQuestion);
            const resCorAns = await DeleteById('questions', e.newRowData.CorrectAnswerId);
            console.log(resCorAns);

            if (e.newRowData.Open_Close == 'close') {
                const resW1_Ans = await DeleteById('questions', e.newRowData.WrongAnswer1Id);
                console.log(resW1_Ans);
                const resW2_Ans = await DeleteById('questions', e.newRowData.WrongAnswer2Id);
                console.log(resW2_Ans);
                const resW3_Ans = await DeleteById('questions', e.newRowData.WrongAnswer3Id);
                console.log(resW3_Ans);
            }      
        }
        fetchData(e);
    }
    const confirm2 = () => {
        // deleteQuestion();
        confirmDialog({
            message: 'Do you want to delete this question?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };
    const deleteEditor = (options) => {
        return < Button icon="pi pi-times" onClick={(e) => {

            deleteQuestion(e);
        }
        } />
        //     return <Button icon="pi pi-times" onClick={confirm2}
        //     />
    };

    const questionEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => {
            options.editorCallback(e.target.value)
        }} />
    };
    const answerCEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => {
            console.log(e);
            options.editorCallback(e.target.value)
        }} />
    };
    const answerW1Editor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => {
            options.editorCallback(e.target.value)
        }} />
    };
    const scoreEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => {
            options.editorCallback(e.target.value)
        }} />
    };
    const answerW3Editor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => {
            options.editorCallback(e.target.value)
        }} />
    };
    const answerW2Editor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => {
            options.editorCallback(e.target.value)
        }} />
    };
    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    return (<>

        <Menu /><br></br>
        <div className="card flex justify-content-center">
            <Button label="Details about the test" onClick={() => { message(); setVisible(true) }} />
            <Dialog header="Details about the test" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <label htmlFor="integeronly" className="font-bold block mb-2">num of the questions:</label>
                <InputNumber inputId="integeronly" value={numQue} onValueChange={(e) => setnumQue(e.value)} />
                <label htmlFor="minmaxfraction" className="font-bold block mb-2">number of test hours:</label>
                <InputNumber inputId="minmaxfraction" value={hour_} onValueChange={(e) => setHour_(e.value)} minFractionDigits={2} maxFractionDigits={5} />
            </Dialog>
            <Button label="Add Question" onClick={() => navigate(`/questions/add/${courseId}`)} />
        </div>
        <div className="card p-fluid">
            <DataTable value={questions} editMode="cell" tableStyle={{ minWidth: '50rem' }}>
                {columns.map(({ field, header }) => {
                    return <Column key={field} field={field} header={header} style={{ width: '25%' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} />;
                })}
            </DataTable>

        </div></>
    );
}

