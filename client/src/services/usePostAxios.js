import axios from 'axios';
// import { UseSignIn } from './UseGetStudent';

const URL = `http://localhost:8000`;
// const headersAuthorization = {headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`}}

export async function signUp(url, obj) {
    const headersAuthorization = {headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`}}

    const res = await axios.post(`${URL}/${url}`, obj);
    return res;
}

export async function UseCreate(url, obj) {
    debugger
    const headersAuthorization = {headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`}}
    try {
        const res = await axios.post(`${URL}/${url}`, obj, headersAuthorization)
        console.log(res);
        return res;
    } catch (error) {
        console.log("!!!");
        console.log(error);
        return error;
    }
}
