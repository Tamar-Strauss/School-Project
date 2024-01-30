import axios from "axios";

const URL = `http://localhost:8000`;
const headerAuthorization = { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` } };

export async function DeleteById(url,id) {
    try {
        const res = await axios.delete(`${URL}/${url}/${id}`, headerAuthorization)
        return res;
    } catch (err) {
        return err;
    }
}
