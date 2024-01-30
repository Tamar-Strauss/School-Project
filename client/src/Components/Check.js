import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Check = (props) => {

    const [userId, setUserId] = useState(null);
    const [status, setStatus] = useState('');

    const navigate = useNavigate();
    return (
        <>
            <input placeholder={"Status"} onChange={(e) => { setStatus(e.target.value) }} />
            <input onChange={(e) => { setUserId(e.target.value) }}></input>
            <button onClick={(e) => {props.setStatus(status); props.setUserId(userId);navigate('/home/home-student')}}/>
        </>
    );
}

export default Check;