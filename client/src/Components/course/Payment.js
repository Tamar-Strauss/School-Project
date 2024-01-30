import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import { UseCreate } from "../../ser/usePostAxios";
import Menu from '../menu/menu'
// import 'react-credit-cards-2/dist/es/styles-compiled.css'
import React, { useState } from 'react';
// import Cards from 'react-credit-cards-2';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const { courseId } = useParams();

    const registerToCourse = () => {
        const obj = {
            studentId: JSON.parse(localStorage.getItem('userInfo')).id,
            courseId: courseId,
            registerDate: new Date(),
            nextLectureNum: 1
        }
        const register = async () => {
            const res = await UseCreate('course_students', obj);
            if (res.status == 201) {
                console.log('נרשמת בהצלחה');
                navigate('/student/courses')
            }
            else {
                console.log(res.response.data.message);
                navigate('/courses')

            }
            register();
        }
    }
    console.log(courseId);
    console.log(numLectures);

    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }
    const navigate = useNavigate();
    const { numOfLecture } = useParams();
    const status = JSON.parse(localStorage.getItem('userInfo')).status
    return (
        // <h2>{numOfLecture}</h2>
        <div className="card flex flex-column align-items-center gap-3 ">
           <Menu></Menu>
            <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
            />
            <form>
                <input
                    type="tel"
                    name="number"
                    placeholder="Card Number"
                    value={state.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={state.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <input
                    type="tel"
                    name="expiry"
                    placeholder="expiry"
                    value={state.expiry}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <input
                    type="tel"
                    name="CVC"
                    placeholder="CVC"
                    value={state.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
                <Button label="pay" severity="info" raised onClick={() => {
                    registerToCourse();
                    navigate(`/courses/${status}/my-courses`)
                }} />
            </form>
        </div>
    );
}

export default Payment;

