import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo-school.jpg';
import { Image } from 'primereact/image'

import "primereact/resources/primereact.min.css";
import 'primereact/resources/primereact.css';

export default function Start(props) {

    const navigate = useNavigate();

    const image =
    {
        url: logo,
        width: '70%'
    };

    return (
        <>
            <div className="card" style={{textAlign: 'center'}}>
                <Image src={logo} alt="Image" width="30%" />
                <br />
                <div className="card flex flex-wrap justify-content-center gap-3">
                    <Button onClick={() => { navigate('/sign-in/2') }} label="Sign In" text raised />
                    <Button onClick={() => { navigate('/sign-up') }} label="Sign Up" text raised />
                </div>
            </div>

        </>)
}