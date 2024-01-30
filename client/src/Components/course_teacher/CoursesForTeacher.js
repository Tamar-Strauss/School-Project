import { UseGetAll, UseGetAllById, UsePutOneById, UseGetOneByIdTeacher, UseGetOneById } from "../../services/useGetAxios";
import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button'
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import coursesImage from '../../images/OnlineCourses.jpg'
import Menu from '../menu/menu'

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
        return (
            <Dialog header="num. questions" visible={visible1} style={{ width: '50vw' }} onHide={() => setVisible1(false)} footer={footerContent}>
                <InputNumber value={numQue} onValueChange={(e) => setnumQue(e.value)} showButtons buttonLayout="vertical" style={{ width: '4rem' }}
                    decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
            </Dialog>)
    }

    const footerContent = (
        <div>
            <Button label="OK" icon="pi pi-check" onClick={() => { setVisible(false); updateNumQuestin(numQue) }}
                autoFocus />
        </div>);
    const reject = () => {
        toast.current.show({
            severity: 'warn', summary: 'Rejected', detail
                : 'You have rejected', life: 3000
        });
    }

    const message = (id) => {
        async function fetchData(id) {
            const res = await UseGetOneById('test_courses/course', id);
            console.log(res);
            setnumOfQuestion(res.data.numOfQuestions);
        }
        fetchData(id);
    }
    const updateNumQuestin = (id) => {
        async function update(id) {
            const res = await UsePutOneById('test_courses/update', id);
            if (res && res.status && res.status >= 200)
                console.log(res);
        }
        update(id)
    }
    useEffect(() => {
        const fetchData = async () => {
            const res = await UseGetOneById('courses/teacher', id);
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
                    <img data-custom-id={course.id} className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={coursesImage} alt={course.name} onClick={() => navigate(`/lectures/${course.id}`)}/>
                    <Tag className="mr-2" severity="info">
                        <div className="text-2xl font-bold">
                            <i className="pi pi-bookmark"></i>
                            &nbsp;
                            {course.name}
                        </div>
                    </Tag>
                    <div data-custom-id={course.id} className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <Button label="Lectures" severity="info" text onClick={() => navigate(`/lectures/${course.id}`)} />
                        <Button label="Questions" severity="info" text onClick={() => navigate(`/teacher/viewQuestion/${course.id}`)} />
                        <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message={`There are ${numOfQuestion} questions. Do you want to add?`}
                            header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
                        <Button onClick={() => { message(course.id); setVisible(true) }} label="Number Of Question Of Test" />
                        <Toast ref={toast} />
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (course) => {
        return (
            <div data-custom-id={course.id} className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div data-custom-id={course.id} className="p-4 border-1 surface-border surface-card border-round">
                    <div data-custom-id={course.id} className="flex flex-column align-items-center gap-3 py-5" >
                        <img data-custom-id={course.id} className="w-9 shadow-2 border-round" src={coursesImage} alt={course.name} onClick={() => navigate(`/lectures/${course.id}`)}/>
                        <Tag className="mr-2" severity="info">
                            <div className="text-2xl font-bold">
                                <i className="pi pi-bookmark"></i>
                                &nbsp;
                                {course.name}</div>
                        </Tag>
                        <div className="card flex flex-wrap justify-content-center gap-3">
                            <Button label="Lectures" severity="info" text onClick={() => navigate(`/lectures/${course.id}`)} />
                            <Button label="Questions" severity="info" text onClick={() => navigate(`/teacher/viewQuestion/${course.id}`)} />
                        </div>
                        <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message={`There are ${numOfQuestion} questions. Do you want to add?`}
                            header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
                        <Button onClick={() => { message(course.id); setVisible(true) }} label="num questions in test" />
                        <Toast ref={toast} />

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
            <>
                <div style={{ display: 'flex', justifyContent: 'space-between', position: 'sticky', top: '0', zIndex: '9000' }}>
                    <span className="justify-content-end"><Button label="Open new course" icon='pi pi-plus' severity="info" raised onClick={() => navigate(`/addCourse`)} /></span>
                    <span className="justify-content-start"><DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} /></span>
                </div>
            </>
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
            <Menu />
            {display}
        </>
    )
}