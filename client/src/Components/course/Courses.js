import { UseGetAll, UseGetOneById, UseGetPrice } from "../../services/useGetAxios"
import React, { useState, useEffect } from 'react';
import { Image } from "primereact/image";
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useNavigate } from 'react-router-dom';
import Menu from "../menu/menu";
import courseImg from '../../images/Courses.jpg'
import { Tag } from "primereact/tag";

const Courses = (props) => {

    const [layout, setLayout] = useState('grid');
    const [courses, setcourses] = useState([])
    const navigate = useNavigate();

    const status = JSON.parse(localStorage.getItem('userInfo')).status;

    useEffect(() => {
        const fetchData = async () => {
            const res = await UseGetAll('courses');
            setcourses(res.data);
        }
        fetchData();
    }, []);
    const ListItem = (course) => {
        const [teacher, setTeacher] = useState();
        useEffect(() => {
            const fetchData = async () => {
                const resTeacher = await UseGetOneById('teachers', course.teacherId);
                setTeacher(resTeacher.data);
                console.log(resTeacher);
            }
            fetchData();
        }, [])
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={courseImg} alt={course.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <Tag className="mr-2" severity="info">
                                <div className="text-2xl font-bold">
                                    <i className="pi pi-bookmark"></i>
                                    &nbsp;
                                    {course.name}</div>
                            </Tag>
                            {teacher && <div className="text-2xl font-bold">By {teacher.name}</div>}
                            <div className="text-2xl">{course.description}</div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">{course.price} $</span>
                            {status == 'students' &&
                                <Button
                                    icon="pi pi-shopping-cart"
                                    className="p-button-rounded"
                                    onClick={(e) => { console.log('PayMENT'); navigate(`/payment/${course.id}`); }}
                                />}
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    const GridItem = (course) => {
        const [teacher, setTeacher] = useState();
        useEffect(() => {
            const fetchData = async () => {
                const resTeacher = await UseGetOneById('teachers', course.teacherId);
                setTeacher(resTeacher.data);
                console.log(resTeacher);
            }
            fetchData();
        }, [])
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-column align-items-center gap-3 py-5">

                        <img className="w-9 shadow-2 border-round" src={courseImg} alt={course.name} />
                        <Tag className="mr-2" severity="info">
                            <div className="text-2xl font-bold">
                                <i className="pi pi-bookmark"></i>
                                &nbsp;
                                {course.name}</div>
                        </Tag>
                        {teacher && <div className="text-2xl font-bold">By {teacher.name}</div>}
                        <div className="text-2xl">{course.description}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">{course.price} $</span>
                        {status == 'students' &&
                           <Button
                           label="מעבר להרשמה ותשלום על הקורס"
                           className="p-button-primary"
                           onClick={(e) => { 
                               console.log('PayMENT'); 
                               navigate(`/payment/${course.id}`); 
                           }}
                       />}
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (course, layout) => {
        if (!course) {
            return;
        }
        if (layout === 'list')
            return ListItem(course);
        else if (layout === 'grid')
            return GridItem(course);
    };

    const header = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button label="My Courses" onClick={(e) => navigate(`${status}/my-courses`)} />
                <div style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 'bold' }}>All Courses</div>
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <>
            <Menu />
            <div className="card">
                <DataView value={courses} itemTemplate={itemTemplate} layout={layout} header={header()} />
            </div>
        </>
    )
}
export default Courses;
