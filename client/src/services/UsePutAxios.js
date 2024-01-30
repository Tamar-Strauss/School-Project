import axios from "axios";

const URL = `http://localhost:8000`;
// const headersAuthorization = {headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`}}

export async function UseUpdate(url, obj) {
    const headersAuthorization = {headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`}}

    try {
        const res = await axios.put(`${URL}/${url}` , obj,  headersAuthorization)
        // console.log(res);
        return res;
    } catch (error) {
        return error;
    }
}