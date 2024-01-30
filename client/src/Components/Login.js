import React from 'react'; 
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import {useState} from 'react';

import React, { useRef } from "react";
import { useFormik } from 'formik';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
    
export default function Login() {
    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.value });
    };

    const formik = useFormik({
        initialValues: {
            value: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.value) {
                errors.value = 'Password is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            data && show();
            formik.resetForm();
        }
    });
    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };
    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const [value, setValue] = useState('');
    const footer = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button label="Sign In" icon="pi pi-sign-in" />
            <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary" />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Card title="Title" subTitle="Subtitle" footer={footer} header={header} className="md:w-25rem">
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                    <div className="card flex justify-content-center">
                        <span className="p-float-label">
                            <InputText id="username" value={value} onChange={(e) => setValue(e.target.value)} />
                            <label htmlFor="username">Username</label>
                        </span>
                        <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
            <label htmlFor="value">Password</label>
                <Toast ref={toast} />
                <Password
                    inputId="in_value"
                    name="value"
                    rows={5}
                    cols={30}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('value') })}
                    value={formik.values.value}
                    feedback={false}
                    onChange={(e) => {
                        formik.setFieldValue('value', e.target.value);
                    }}
                />
                {getFormErrorMessage('value')}
                <Button label="Sign In" type="submit" icon="pi pi-sign-in" />
            </form>
                    </div>
                </p>
            </Card>
        </div>
    )
}