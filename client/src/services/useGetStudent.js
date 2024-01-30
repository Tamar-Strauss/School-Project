import axios from 'axios';

export async function UseSignIn(profile, obj) {
    let url;
    url = `http://localhost:8000/${profile}/login`;
    try {
        const res = await axios.get(url, { params: { idNumber: obj.idNumber, password: obj.password } });
        return res;
    } catch (error) {
        console.log("Error");
        console.log(error);
        return error;
    }
}