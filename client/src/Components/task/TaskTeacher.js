// בסיעתא דשמיא

import React, { useEffect, useState } from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Editor } from "primereact/editor";
import { InputNumber } from 'primereact/inputnumber';
import { UseCreate } from "../../services/usePostAxios";
import { UseGetOneById } from "../../services/useGetAxios";
import { UseUpdate } from "../../services/UsePutAxios";

export function TaskTeacher(props) {
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const [valueNumber, setValueNumber] = useState(1);
    const [isValid, setIsValid] = useState(false);
    const [created, setCreated] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [visibleError, setvisibleError] = useState(false);
    
    // update task
    const [task, setTask] = useState(null);
    const [visible, setVisible] = useState(false);
    const [toUpdate, setToUpdate] = useState(false);
    const [updated, setUpdated] = useState(false);

    useEffect(() => {

        console.log('***');
        console.log(props);


        const fetchData = async () => {
            const res = await UseGetOneById('tasks/lecture', props.lectureId);
            console.log(res);
            if (res && res.status && res.status == 200) {
                setText(res.data.taskFile);
                setTask(res.data);
                setToUpdate(true);
            }
            else return;
        }
        try {
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, [])

    const validate = () => {
        if (!text || text == '') {
            setError('Text is required.');
            setShowMessage(true);
        }
        else if (text.length < 20) {
            setError('Not enough text.');
            setShowMessage(true);
        }
        else {
            setIsValid(true);
            setShowMessage(false);
        }
    }

    const onSubmit = async () => {
        validate();
        await HandleSubmit();
    }
    const HandleSubmit = async () => {
        const taskObj = {
            lectureId: props.lectureId,
            submitLastDate: valueNumber,
            taskFile: text
        }

        const res = await UseCreate('tasks', taskObj);
        console.log(res);
        if (res && res.status && res.status == 201) {
            setCreated(true);
        }
        else {
            setvisibleError(true);
        }
    }

    const onSaveChanges = async () => {
        validate();
        const taskToUpdate = {
            id: task.id,
            lectureId: task.lectureId,
            taskFile: text,
            submitLastDate: valueNumber
        }
        const res = await UseUpdate('tasks', taskToUpdate);
        if (res && res.status && res.status == 200) {
            setUpdated(true);
        }
        else {
            setvisibleError(true);
        }
    }

    const errorDialog =
        <Dialog showHeader={false} visible={visibleError} position='top' style={{ width: '3vm' }} footer={
            <Button label="OK" icon="pi pi-thumbs-up" onClick={() => setvisibleError(false)} autoFocus outlined severity="info" />} >

            <div className="flex align-items-center flex-column pt-6 px-3">
                <i className="pi pi-times-circle" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                <h3>Failed!</h3>
                <p>
                    Sorry, something gets wrong while handling your request.<br />
                    Please, try again.
                </p>

            </div>
        </Dialog>
    return (
        <div className="flex justify-content-center">
            <div className="card">
                {toUpdate && <h2 className="text-center">Update Task - Lecture  #{props.lectureNum}</h2>}
                {!toUpdate && <h2 className="text-center">Create a Task - Lecture  #{props.lectureNum}</h2>}
                <Accordion>
                    {!toUpdate &&
                        <AccordionTab
                            header={
                                <div className="flex align-items-center">
                                    <i className="pi pi-cog ml-2 ml-2"></i>
                                    <span className="vertical-align-middle">&nbsp; Instructions</span>
                                </div>
                            }
                        >
                            <p className="m-0">
                                Here you have an editor, where you can write the task you would like the students to do after watching the lecture.
                                In this case, lecture no. {props.lectureNum}.<br />
                                Then enter the number of days you give to your students until the deadline. <br /> <br />
                                We strongly recomend on meaningful yet possible tasks in order to promote your students' improvement.
                            </p>
                        </AccordionTab>
                    }
                    <AccordionTab
                        header={
                            <div className="flex align-items-center">
                                <i className="pi pi-pencil"></i>
                                <span className="vertical-align-middle">&nbsp; Editor</span>
                            </div>}
                    >
                        <Editor
                            value={text}
                            onTextChange={(e) => {
                                setText(e.htmlValue);
                                setVisible(true);
                            }}
                            style={{ height: '320px' }} />
                        {showMessage && <small className="p-error">{error}</small>}
                    </AccordionTab>
                    <AccordionTab
                        header={
                            <div className="flex align-items-center">
                                <i className="pi pi-clock"></i>
                                <span className="vertical-align-middle">&nbsp; Deadline</span>
                            </div>
                        }
                    >
                        <div className="card flex justify-content-center">
                            <div className="flex-auto">
                                <label htmlFor="minmax" className="block mb-2">Set a deadline for submission this task.</label>
                                <br />
                                <InputNumber inputId="minmax-buttons" value={valueNumber} onValueChange={(e) => {setValueNumber(e.value); setVisible(true);}} mode="decimal" showButtons min={1} max={10} prefix="Up to " suffix=" days." />
                            </div>
                        </div>
                    </AccordionTab>
                </Accordion>
                {!toUpdate && <Button label="Save" severity="secondary" icon="pi pi-save" outlined onClick={onSubmit} />}
                {toUpdate && <Button label="Save Changes" severity="secondary" icon="pi pi-save" outlined visible={visible} onClick={onSaveChanges} />}
                <Dialog showHeader={false} visible={(created || updated)} position='top' style={{ width: '3vm' }} footer={
                    <Button label="OK" icon="pi pi-thumbs-up" onClick={() => props.setVisible(false)} autoFocus outlined severity="info" />} >
                    <div className="flex align-items-center flex-column pt-6 px-3">
                        <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                        {created && <h3>Task #{props.lectureNum} was successfully created!</h3>}
                        {updated && <h3>Task #{props.lectureNum} was successfully updated!</h3>}
                        <p>
                            Thank you, dear teacher on efforts that you invested. We are sure your students will appreciate it. <br />
                            You will be able to edit this task, if you want to.
                        </p>
                    </div>
                </Dialog>
                {(!created || !updated) && errorDialog}
            </div>
        </div>
    )
}
