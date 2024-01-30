import { FileUpload } from 'primereact/fileupload';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { UseCreate } from '../../services/usePostAxios';
import { InputNumber } from 'primereact/inputnumber';
import { UseGetOneById } from '../../services/useGetAxios';
import { Message } from 'primereact/message';
import ReactPlayer from 'react-player'
import Menu from '../menu/menu';
import { useRef } from "react";
import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';

export default function UploadLecture(props) {

    const { courseId } = useParams();

    const [uploaded, setUploaded] = useState(false);
    const [encoded, setEncoded] = useState(false);
    const [base64data, setBase64Data] = useState("");
    const [lectureNum, setLectureNum] = useState(1);
    const [src, setSrc] = useState("");

    const [vid, setVid] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const res = await UseGetOneById('courses/lecture_num', courseId);
            console.log(res);
            if (res && res.status && res.status >= 200) {
                setLectureNum(res.data.lectureNum);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        if (base64data != "") {
            setEncoded(true);
        }
    }, [base64data])

    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            setBase64Data(reader.result);
        }
        console.log(base64data);
        handleUpload();
    }


    const handle = (event) => {
        try {
            // Get the uploaded file
            const file = event.files[0];
            // Transform file into blob URL
            setSrc(URL.createObjectURL(file));

            const reader = new FileReader();
            reader.onload = () => {
                console.log(reader.result);
                // setSrc(reader.result);
                // const blob = window.dataURLToBlob(reader.result);
            }
            reader.readAsDataURL(file);

            if (src != "") {
                setEncoded(true);
                handleUpload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpload = async () => {
        // if (encoded) {
        const lectureObj = {
            courseId: courseId,
            // video: base64data,
            video: formik.values.value,
            lectureNum: lectureNum
        }
        const res = await UseCreate('lectures', lectureObj);
        console.log(res);
        if (res && res.status && res.status >= 200) {
            setUploaded(true);
        }
    }

    const tryfunc = () => {
        setSrc(URL.createObjectURL(vid));

        const reader = new FileReader();
        reader.onloadend = () => {
            console.log(reader.result);
            // setSrc(reader.result);
            // const blob = window.dataURLToBlob(reader.result);
        }
        reader.readAsDataURL(vid);
    }
    const show = () => {
        Toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.value });
    };

    const formik = useFormik({
        initialValues: {
            value: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.value) {
                errors.value = 'URL is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            data && show(data);
            handleUpload()
            formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };
    return (<>

        <Menu></Menu>
        <h2>Upload Lecture #{lectureNum}</h2>
        {!uploaded && <FileUpload
            name="demo[]"
            multiple accept="video/*"
            customUpload
            uploadHandler={handle}
            maxFileSize={1000000000}
            emptyTemplate={<p className="m-0">Drag and drop video to here to upload.</p>} />}
        <br></br>
        <div className="card flex justify-content-center">
            {!uploaded && <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                <span className="p-float-label">
                    <Toast ref={Toast} />
                    <InputText
                        id="value"
                        name="value"
                        value={formik.values.value}
                        onChange={(e) => {
                            formik.setFieldValue('value', e.target.value);
                        }}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('value') })}
                    />
                    <label htmlFor="input_value">Enter URL video</label>
                </span>
                {getFormErrorMessage('value')}
                <Button type="submit" label="save" /> </form>}
            {uploaded && <Message severity='success' text='Uploaded' />}
            {uploaded && console.log(formik.values.value)}
            {uploaded &&
                <ReactPlayer
                    className="player"
                    url={formik.values.value}
                    width="60%"
                    origin='http://localhost:3000'
                    controls>
                </ReactPlayer>
            }
        </div>

    </>)
}
