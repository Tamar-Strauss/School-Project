import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { DataView } from 'primereact/dataview';
import { Panel } from 'primereact/panel';
import { Ripple } from 'primereact/ripple';
import { UseGetAllById } from '../../services/useGetAxios';

const TeacherTests = (props) => {

    const [questions, setQuestions] = useState([]);
    const status = JSON.parse(localStorage.getItem('userInfo')).status;
    const teacherId = JSON.parse(localStorage.getItem('userInfo')).id;

    useEffect(() => {
        const fetchData = async () => {
            const resCourses = await UseGetAllById('courses/teacher', teacherId);
            for (let i = 0; i < resCourses.data; i++) {
                const resQuestions = await UseGetAllById('tests/checkTest', resCourses[i].id);
                console.log(resQuestions);

            }
        }
        fetchData();
    }, []);

    let count = 0;
    const itemTemplate = (question) => {
        count++;
        return (
            <div className="col-12">
                <Panel id={question.id} header={`Question #${count / 2}`} toggleable>
                    <p className="m-0">{question}</p>
                    <Tag
                        value={question.scores}
                    />
                    <Button questionTestId={question.id} onClick={() => { }} />
                </Panel>
            </div>
        );
    };

    const template = (options) => {
        const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
        const className = `${options.className} justify-content-start`;
        const titleClassName = `${options.titleClassName} ml-2 text-primary`;
        const style = { fontSize: '1.25rem' };

        return (
            <div className={className}>
                <button className={options.togglerClassName} onClick={options.onTogglerClick}>
                    <span className={toggleIcon}></span>
                    <Ripple />
                </button>
                <span className={titleClassName} style={style}>Header</span>
            </div>
        );
    };

    // return (
    //     <Panel headerTemplate={template} toggleable>
    //         <p className="m-0">
    //             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    //             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    //             consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    //             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    //         </p>
    //     </Panel>
    // )
    return (<>
        {status === 'teachers' && <div className='card'>
            <h1>Tests To Check</h1>
            <div className="card">
                <DataView value={questions} itemTemplate={itemTemplate} />
            </div>
        </div>}
    </>
    )



}

export default TeacherTests;