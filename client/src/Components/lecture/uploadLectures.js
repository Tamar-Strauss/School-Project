// import React from 'react';
import { FileUpload } from 'primereact/fileupload';
import React, { useRef ,useState} from "react";
import { useFormik } from 'formik';
import { Editor } from 'primereact/editor';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputNumber } from 'primereact/inputnumber';
import { useNavigate } from 'react-router-dom';
import Menu from '../menu/menu';
export default function FormikDoc() {
    const [value3, setValue3] = useState(0);

    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Blog Submitted', detail: 'The blog is uploaded' });
    };

    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );
    };

    const header = renderHeader();

    const formik = useFormik({
        initialValues: {
            blog: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.blog || data.blog === `n`) {
                
                errors.blog = 'Content is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            data.blog && show();
            formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };


const navigate = useNavigate();

    return (
    
        <div className="card">
            <Menu></Menu>
        <div className="flex-auto">
            <h2>Upload lecture</h2>
        <label htmlFor="minmax-buttons" className="font-bold block mb-2">lectue no.</label>
        <InputNumber inputId="minmax-buttons" value={value3} onValueChange={(e) => setValue3(e.value)} mode="decimal" showButtons min={0} max={30} />
         </div><br></br>
        <FileUpload name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
            <form onSubmit={formik.handleSubmit}>
                <Toast ref={toast} />
                <h2>write here the task</h2>
                <Editor
                    id="blog"
                    name="blog"
                    value={formik.values.blog}
                    headerTemplate={header}
                    onTextChange={(e) => {
                        formik.setFieldValue('blog', e.textValue);
                    }}
                    style={{ height: '320px' }}
                /><br></br>
                <div className="flex flex-wrap justify-content-between align-items-center gap-3 mt-3">
                    {getFormErrorMessage('blog')}
                    <Button type="submit" label="upload an other lecture" onClick={(e) => { navigate('/uploadLectures') }}/>
                    <Button type="submit" label="Save" onClick={(e) => { navigate('/addCourse') }}/>


                    {/* {status === 'teachers' && numOfLectures === 0 && <Video setNext={setNextCallBack}/>} */}


                </div>
            </form>
        </div>
       
    )
}
        
        