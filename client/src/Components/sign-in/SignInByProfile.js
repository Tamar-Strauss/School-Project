import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useContext, useEffect, useState } from "react"
import { Form, Field } from "react-final-form";
import { Password } from 'primereact/password';
import { UseSignIn } from "../../services/useGetStudent";
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

export function SignInByProfile(props) {

    // localStorage.clear();
    
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState(<></>);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(<></>);
    const [formData, setFormData] = useState({});
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    const validate = (data) => {
        let errors = {};
        if (!data.idNumber) {
            errors.idNumber = 'ID Number is required.';
        }
        else if (data.idNumber.length != 9 || !/^\d+$/.test(data.idNumber)) {
            errors.idNumber = 'ID Number is invalid.'
        }
        if (!data.password) {
            errors.password = 'Password is required.'
        }
        else if (data.password.length < 8 || data.password.length > 12) {
            errors.password = 'Password is invalid.'
        }
        return errors;
    };
  
    const onSubmit = async (data, form) => {
        setFormData(data);
        setShowMessage(true);
        setShowErrorMessage(false);
        await HandleClick(data);
        form.restart();
    }
    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    const dialogFooter =
        <div className="flex justify-content-center">
            <Button label="OK" className="p-button-text" autoFocus
                onClick={() => {
                    setShowErrorMessage(false);
                    setShowMessage(false);
                    navigate(`/home-${props.status}`);
                }} />
        </div>;
    const errorDialogFooter = <div className="flex justify-content-center"></div>
    async function HandleClick(data) {
        const obj = {
            idNumber: data.idNumber,
            password: data.password
        }
        try {
            const res = await UseSignIn(props.status, obj);
            console.log(res);
            if (res.status && res.status === 200) {
                localStorage.setItem('token', JSON.stringify(res.data.accessToken));
                localStorage.setItem('userInfo', JSON.stringify(res.data.userInfo));
                setUser(res.data.userInfo);
                setMessage(<>
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>You are in!</h5>
                </>)
            }
            else if (res.response.status && res.response.status === 401) {
                setShowErrorMessage(true);
                setErrorMessage(<>
                    <div className="flex align-items-center flex-column pt-6 px-3">
                        <i className="pi pi-undo" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                        <h3>Incorrect details.</h3>
                        <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                            {res.response.data.message}, you can sign up.
                        </p>
                        <Button label="Sign Up" className="p-button-text" autoFocus
                            onClick={() => {
                                setShowErrorMessage(false);
                                setShowMessage(false);
                                navigate('/sign-up');
                            }} />
                    </div>
                </>)
            }
            else if (res.response.status && res.response.status === 402) {
                setShowErrorMessage(true);
                setErrorMessage(<>
                    <div className="flex align-items-center flex-column pt-6 px-3">
                        <i className="pi pi-undo" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                        <h3>Incorrect details.</h3>
                        <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                            {res.response.data.message}, you can try again.
                        </p>
                        <Button label="OK" className="p-button-text" autoFocus
                            onClick={() => {
                                setShowErrorMessage(false);
                                setShowMessage(false);
                            }} />
                    </div>
                </>)
            }
            else {
                setShowErrorMessage(true);
                setErrorMessage(<>
                    <i className="pi pi-undo" style={{ fontSize: '5rem', color: 'var(--red-500)' }}></i>
                    <h5>Incorrect details.</h5>
                    <Button label="OK" className="p-button-text" autoFocus
                        onClick={() => {
                            setShowErrorMessage(false);
                            setShowMessage(false);
                        }} />
                </>)
            }
        } catch (error) {
            console.log(error);
        }
    }
    // props.setUserId(user.id);
    // props.setStatus(props.status);
    return (
        <>
            <div className="form-demo">
                {showMessage &&
                    <Dialog visible={showMessage && !showErrorMessage} onHide={() => setShowMessage(false)} position='top' footer={dialogFooter} showHeader={false} style={{ width: '30vw' }}>
                        <div className="flex align-items-center flex-column pt-6 px-3">
                            {message}
                        </div>
                    </Dialog>}
                {showErrorMessage &&
                    <Dialog visible={showErrorMessage} onHide={() => setShowErrorMessage(false)} position='top' footer={errorDialogFooter} showHeader={false} style={{ width: '30vw' }}>
                        <div className="flex align-items-center flex-column pt-6 px-3">
                            {errorMessage}
                        </div>
                    </Dialog>}
                <div className="flex justify-content-center">
                    <div className="card">
                        <h4 className="text-center">Sign In {props.profile}</h4>
                        <Form onSubmit={onSubmit} initialValues={{ idNumber: '', password: '' }} validate={validate} render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit} className='p-fluid'>
                                <Field name="idNumber" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <InputText id='idNumber' {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="idNumber" className={classNames({ 'p-error': isFormFieldValid(meta) })}>ID Number*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )}
                                />
                                <Field name="password" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Password id="password" {...input} feedback={false} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                                <Button type="submit" label="Sign In" className="mt-2" />
                            </form>
                        )} />
                    </div>
                </div>
            </div>
        </>
    )
}