import { UseGetAll, UseGetAllById, UsePutOneById, UseGetOneByIdTeacher, UseGetOneById } from "../../services/useGetAxios";
import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import Lectures from "../lecture/Lecture";
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import englishImg from '../../images/english.webp'
import { UploadLecture } from "../lecture/uploadLectures";
import AddCourse from '../course/addCourse';

export default function CoursesForteacher(props) {
    const [numOfQuestion, setnumOfQuestion] = useState(0);
    const [numQue, setnumQue] = useState(numOfQuestion);
    const [data, setData] = useState(null);
    const [course, setCourse] = useState(-1);
    const [layout, setLayout] = useState('grid');
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);

    const navigate = useNavigate();
    const id = JSON.parse(localStorage.getItem('userInfo')).id;
    const toast = useRef(null);

    const accept = () => {
        setVisible1(true);
        {/* // <Dialog header="num. questions" visible={visible1} style={{ width: '50vw' }} onHide={() => setVisible1(false)} footer={footerContent}> */ }
        {/* <InputNumber value={numQue} onValueChange={(e) => setnumQue(e.value)} showButtons buttonLayout="vertical" style={{ width: '4rem' }}
                    decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" /> */}
        {/* // </Dialog> */ }
        return (
            <div className="card flex justify-content-center">
                <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} />
                <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                    <p className="mb-5">
                    </p>
                </Dialog>
            </div>
        )
    }
    const footerContent = (
        <div>
            {/* <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" /> */}
            <Button label="OK" icon="pi pi-check" onClick={() => { setVisible(false); updateNumQuestin(numQue) }}
                autoFocus />
        </div>);
    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const message = (id) => {
        async function mess(id) {
            const res = await UseGetOneById('test_courses/course', id);
            const numOfQuestions = res.data.numOfQuestions;
            setnumOfQuestion(numOfQuestions);
        }
        mess(id);
    }
    const updateNumQuestin = (id) => {
        async function update(id) {
            const res = await UsePutOneById('test_courses/update', id);
            console.log(res);
        }
        update(id)
    }
    useEffect(() => {
        const fetchData = async () => {
            const res = await UseGetAllById('teachers/course', id);
            if (res.status != 204)
                setData(res.data);
            else setData(res.statusText)
        }
        fetchData();
    }, [])

    const listItem = (course) => {
        //       const course = course1[0];
        return (
            <div className="col-12">
                <div data-custom-id={course.id} className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img data-custom-id={course.id} className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={englishImg} alt={course.name} />
                    <div data-custom-id={course.id} className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <Button label="lectures" severity="secondary" text />
                        <Button label="questions" severity="info" text />
                        {/* <Button label="exam" severity="success" text /> */}
                        <Toast ref={toast} />
                        <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?"
                            header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
                        <div className="card flex justify-content-center">
                            <Button onClick={() => setVisible(true)} icon="pi pi-check" label="Confirm" />
                        </div>
                        <div data-custom-id={course.id} className="flex flex-column align-items-center sm:align-items-start gap-3" name={course.name} >
                            <div data-custom-id={course.id} className="text-2xl font-bold text-900">{course.name}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const addQuestion = (courseId) => {
        navigate(`/questions/add/${courseId}`)
    }
    const gridItem = (course) => {
        return (
            <div data-custom-id={course.id} className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div data-custom-id={course.id} className="p-4 border-1 surface-border surface-card border-round">
                    <div data-custom-id={course.id} className="flex flex-column align-items-center gap-3 py-5" >
                        <img data-custom-id={course.id} className="w-9 shadow-2 border-round" src={englishImg} alt={course.name} />
                        <div data-custom-id={course.id} className="text-2xl font-bold">{course.name}</div>
                        <div className="card flex flex-wrap justify-content-center gap-3">
                            <Button label="lectures" severity="secondary" text onClick={() => navigate(`/lectures/${course.id}`)} />
                            <Button label="add questions" severity="info" text onClick={() => { addQuestion(course.id) }} />
                            <Button label="questions" severity="info" text />
                        </div>
                        <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message={`There are ${numOfQuestion} questions. Do you want to add?`}
                            header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
                        <Button onClick={() => setVisible(true)} label="num questions in test" />
                        <Toast ref={toast} />
                        {message(course.id)}
                    </div>
                </div>
            </div>
        );
    };
    const itemTemplate = (course, layout) => {
        if (!course) {
            return;
        }

        if (layout === 'list') return listItem(course);
        else if (layout === 'grid') return gridItem(course);
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    let display;
    if (course != -1) {
        navigate(`/lectures/${course}`)
    }
    else {
        if (typeof data !== 'string') {
            display = <div className="card">
                <div style={{ textAlign: 'center', fontSize: '3.5rem', fontWeight: 'bold' }}>My Courses</div>
                <DataView value={data} itemTemplate={itemTemplate} layout={layout} header={header()} />
            </div>
        }
        else display = <div style={{ textAlign: 'center', fontSize: '3.5rem', fontWeight: 'bold' }}>{data}</div>
    }
    return (
        <>
            {display}
        </>
    )
}