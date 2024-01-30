// בסיעתא דשמיא

import { useEffect, useState } from 'react';
import { UseGetAllById } from '../../services/useGetAxios';
import { TabView, TabPanel } from 'primereact/tabview';
import { TestCourse } from './TestCourse';
import Menu from '../menu/menu';

export function TestTeacher(props) {

    const user = JSON.parse(localStorage.getItem('userInfo'));
    const teacherId = user.id;

    const [courses, setCourses] = useState();
    const [tabs, setTabs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const resCourses = await UseGetAllById('courses/teacher', teacherId);
            if (resCourses && resCourses.status && resCourses.status == 200) {
                setCourses(resCourses.data);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (courses)
            setTabs(Array.from({length: courses.length}, (_, i) => ({title: courses[i].name, content: <TestCourse courseId={courses[i].id} />})))
    }, [courses])

    return (
        <>
        <Menu />
        {tabs.length > 1 && <div className="card">
            <TabView scrollable>
                {tabs.map((tab) => {
                    return (
                        <TabPanel key={tab.title} header={tab.title}>
                            <div className="m-0">{tab.content}</div>
                        </TabPanel>
                    );
                })}
            </TabView>
        </div>}
        </>
    )
} 