import { useEffect, useState } from "react";
import { UseGetOneById } from "../../services/useGetAxios";
import { Dialog } from "primereact/dialog";
import { Editor } from "primereact/editor";
import { Field, Form } from 'react-final-form';
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { UseCreate } from "../../services/usePostAxios";
import { isDoneTask } from "../../services/useGetAxios";

export function Task(props) {

    const status = JSON.parse(localStorage.getItem('userInfo')).status;

    const [task, setTask] = useState(null);
    const [text, setText] = useState('');
    const [error, setError] = useState(false);
    const [message, setMessage] = useState(<></>);
    const [showMessage, setShowMessage] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const res = await UseGetOneById('tasks/lecture', props.lectureId);
            setTask(res.data)
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const res = await isDoneTask('task_course_student/isDone', props.courseStudentId, task.id);
            setIsSubmitted(res.data)
        }
        if (status == 'students' && task)
            fetchData();
    }, [task])

    const validate = () => {
        if (text === '') {
            setError(true);
        }
        else setError(false)
    };

    const submitTask = () => {
        console.log(props.courseStudentId);
        const fetchData = async () => {
            const obj = {
                courseStudentId: props.courseStudentId,
                taskId: task.id,
                isDone: true,
                submitDate: new Date(),
                text: text
            }
            const res = await UseCreate('task_course_student', obj);
            console.log(res);
        }
        fetchData();
        props.setVisible(false);
    }
    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => { setShowMessage(false); navigate(''); }} /></div>;
    return (
        <>
            {showMessage &&
                <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position='top' footer={dialogFooter} showHeader={false} style={{ width: '30vw' }}>
                    <div className="flex align-items-center flex-column pt-6 px-3">
                        {message}
                    </div>
                </Dialog>}
            <div className="flex justify-content-center">
                <div className="card">
                    {isSubmitted && <div className="flex align-items-center flex-column pt-6 px-3"><i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                        <h3>This task is done already!</h3>
                    </div>}
                    {!isSubmitted && <>
                        <h3 className="text-center">Task - Let's Exercise</h3>
                        <p className="m-0">
                            {task && task.taskFile}
                        </p>
                        <br />
                        <Editor value={text} onTextChange={(e) => { console.log(e.textValue);setText(e.textValue) }} style={{ height: '320px' }} />
                        {error && <small className="p-error">You can not submit empty file.</small>}
                        <div className="card flex flex-wrap justify-content-center gap-3">
                            <Button type="submit" label="Submit" className="mt-2" icon="pi pi-check" onClick={(e) => {
                                validate(text);
                                !error && submitTask();
                            }} />
                            <Button label="Try it later" className="mt-2" icon="pi pi-paperclip" onClick={(e) => {
                                navigate('/home/home-student')
                            }} />
                        </div>
                    </>}
                </div>
            </div>
        </>
    )
}