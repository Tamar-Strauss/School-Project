// בסיעתא דשמיא
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from "primereact/radiobutton";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { useNavigate, useParams } from 'react-router-dom';
import { UseCreate } from '../../services/usePostAxios';
import { UseGetOneByParmas } from '../../services/useGetAxios';
import '../lecture/uploadLectures'
import { Editor } from "primereact/editor";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from 'primereact/inputnumber';


export default function Test(props) {

    const { courseId } = useParams();
    const categories = [
        { name: 'open', key: 'A' },
        { name: 'multiple choice', key: 'M' }
    ]
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState(<></>);
    const [formData, setFormData] = useState({});
    const [value, setValue] = useState('');//Question
    const [value1, setValue1] = useState('');//CORRECT
    const [value2, setValue2] = useState('');//WRONG1
    const [value3, setValue3] = useState('');//WRONG2
    const [value4, setValue4] = useState('');//WRONG3
    const [value5, setValue5] = useState(0);//score+


    const validate = (data) => {
        let errors = {};
        const isClosed = selectedCategory.name == categories[1].name ? 1 : 0;
        if (isClosed) {
            if (!data.value) {
                errors.value = 'Question is required.';
            }
            if (!data.value1) {
                errors.value1 = 'Answer #1 - CORRECT is required.';
            }
            if (!data.value2) {
                errors.value2 = 'Answer #2 - WRONG - is required.';
            }
            if (!data.value3) {
                errors.value3 = 'Answer #3 - WRONG - is required.';
            }
            if (!data.value4) {
                errors.value4 = 'Answer #4 - WRONG - is required.';
            }

            console.log(data.value5);
            if (!data.value5) {
                errors.value5 = 'Scores field is required.';
            }
            return errors;
        }
        else{
            if (!data.value) {
                errors.value = 'Question is required.';
            }
            if (!data.value1) {
                errors.value1 = 'Answer #1 - CORRECT is required.';
            }
            console.log(data.value5);
            if (!data.value5) {
                errors.value5 = 'Scores field is required.';
            }
            return errors;

        }

    }

    const onSubmit = async (data, form) => {
        debugger
        console.log("on submit");
        setFormData(data);
        setShowMessage(true);
        debugger
        await HandleClick(data);
        setShowErrorMessage(false);

        form.restart();
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const dialogFooter =
        <div className="flex justify-content-center">
            <Button label="Add More" className="p-button-text" icon="pi pi-plus" autoFocus onClick={() => { setShowMessage(false); }} />
            <Button label="Finish" className="p-button-text" icon="pi pi-check" onClick={() => { closeTest(); navigate('/courses/teachers/my-courses') }} />
        </div>;
    const errorDialodFooter = <div className='flex justify-content-center'><Button label='OK' className='p-button-text' autoFocus onClick={() => { setShowErrorMessage(false); }} /></div>;

    const navigate = useNavigate();

    async function HandleClick(data) {
        const isClosed = selectedCategory.name == categories[1].name ? 1 : 0;
        const questionToCreate = {
            courseId: courseId,
            text: data.value,
            scores: data.value5.value,
            isClosed: isClosed
        }
        console.log(questionToCreate);
        const res = await UseCreate('questions', questionToCreate);
        console.log(res);
        const idQuestion = res.data.id;
        if (isClosed == 1)//close
        {
            const objAns = {
                questionId: idQuestion,
                text: data.value1,
                isCorrect: 1
            }
            const res1 = await UseCreate('answers', objAns);
            console.log(res1);
            const objAns2 = {
                questionId: idQuestion,
                text: data.value2,
                isCorrect: 0
            }
            const res2 = await UseCreate('answers', objAns2);
            console.log(res2);

            const objAns3 = {
                questionId: idQuestion,
                text: data.value3,
                isCorrect: 0
            }
            const res3 = await UseCreate('answers', objAns3);
            console.log(res3);

            const objAns4 = {
                questionId: idQuestion,
                text: data.value4,
                isCorrect: 0
            }
            const res4 = await UseCreate('answers', objAns4);
            console.log(res4);
        }
        else {
            const objAns = {
                questionId: idQuestion,
                text: data.value1,
                isCorrect: 1
            }
            const res4 = await UseCreate('answers', objAns);
            console.log(res4);
        }
        if (res.status && res.status === 201) {
            setMessage(<>
                <h5>Successful!</h5>
                <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                    add a question👍🏻👍🏻👍🏻!!!
                </p>
            </>)
            setShowMessage(true);
        }
        else if (res.status && res.status === 500) {
            setMessage(<>
                <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>Failed to add this question.<br /></p>
            </>)
            setShowErrorMessage(true);
        }
        setValue("");
        setValue1("");
        setValue2("");
        setValue3("");
        setValue4("");
        setValue5("");
    }
    async function closeTest() {
        const objTest = {
            courseId: courseId,
            numOfQuestions: 0
        }
        const res6 = await UseCreate('test_courses', objTest);
        console.log("test");
        console.log("closeTest");

        console.log(res6);
    }
    function typeQ() {
        if (selectedCategory.name == categories[1].name)
            return (
                <>
                    <Field name="value1" render={({ input, meta }) => (
                        <div className='field'>
                            <span className="p-float-label">
                                <InputTextarea id="answer" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} rows={3} cols={30} />
                                <label htmlFor="answer">write a correct answer</label>
                            </span>
                            {getFormErrorMessage(meta)}
                        </div>
                    )} />
                    <Field name="value2" render={({ input, meta }) => (
                        <div className='field'>
                            <span className="p-float-label">
                                <InputTextarea id="answer"{...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} rows={3} cols={30} />
                                <label htmlFor="answer">write a wrong answer</label>
                            </span>
                            {getFormErrorMessage(meta)}
                        </div>
                    )} />
                    <Field name="value3" render={({ input, meta }) => (
                        <div className='field'>
                            <span className="p-float-label">
                                <InputTextarea id="answer"{...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} rows={3} cols={30} />
                                <label htmlFor="answer">write a wrong answer</label>
                            </span>
                            {getFormErrorMessage(meta)}
                        </div>
                    )} />
                    <Field name="value4" render={({ input, meta }) => (
                        <div className='field'>
                            <span className="p-float-label">
                                <InputTextarea id="answer" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} rows={3} cols={30} />
                                <label htmlFor="answer">write a wrong answer</label>
                            </span>
                            {getFormErrorMessage(meta)}
                        </div>
                    )} />
                </>
            )
        else return (
            <Field name="value1" render={({ input, meta }) => (
                <div className='field'>
                    <span className="p-float-label">
                        <InputTextarea id="answer" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} rows={3} cols={30} />
                        <label htmlFor="answer">write a correct answer</label>
                    </span>
                    {getFormErrorMessage(meta)}
                </div>
            )} />

        )
    }
    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    {message}
                </div>
            </Dialog>
            <Dialog visible={showErrorMessage} onHide={() => setShowErrorMessage(false)} position="top" footer={errorDialodFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-undo" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                    <h5>Failed</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        {message}
                    </p>
                </div>
            </Dialog>
            <div className="flex justify-content-center">
                <div className="card">
                    <h2 className="text-center">Add question</h2>
                    <Form onSubmit={onSubmit} initialValues={{ QuestionType: '', text: '', scores: '' }} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            <h4 className="text-center">Choose question type</h4>
                            <div className="card flex justify-content-center">
                                <div className="flex flex-column gap-3">
                                    {categories.map((category) => {
                                        return (
                                            <div key={category.key} className="flex align-items-center">
                                                <RadioButton inputId={category.key} name="category" value={category} onChange={(e) => { setSelectedCategory(e.value); typeQ() }} checked={selectedCategory.key === category.key} />
                                                <label htmlFor={category.key} className="ml-2">{category.name}</label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <Field name="value" render={({ input, meta }) => (
                                <div className='field'>
                                    <span className="p-float-label">
                                        <InputTextarea id="answer" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} rows={3} cols={30} />
                                        <label htmlFor="answer">Write a question</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            {typeQ()}

                            <Field name="value5" render={({ input, meta }) => (
                                <>
                                    <label htmlFor="scores" className="font-bold block mb-2">scores</label>
                                    <InputNumber inputId="scores" {...input} value={value5} onValueChange={(e) => setValue5(e.value)} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} suffix="%" />
                                    {getFormErrorMessage(meta)}
                                </>
                            )} />
                            <Button type="submit" label="add this Question" className="mt-2" />
                        </form>
                    )} />
                </div>
            </div>
        </div>
    );
}