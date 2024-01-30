import axios from "axios";

const URL = `http://localhost:8000`;
const headerAuthorization = { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` } };

export async function GetAllCourses(url) {
    try {
        const res = await axios.get(`${URL}/${url}`, headerAuthorization)
        return res;
    } catch (err) {
        return err;
    }
}

export async function UseGetAll(url) {
    try {
        const res = await axios.get(`${URL}/${url}`, headerAuthorization)
        return res;
    } catch (err) {
        return err;
    }
}

export async function UseGetOne(url) {
    try {
        const res = axios.get(`${URL}/${url}`, headerAuthorization)
        return res;
    } catch (error) {
        return error;
    }
}
export async function UsePutOneById(url) {
    try {
        const res = axios.put(`${URL}/${url}`, headerAuthorization)
        return res;
    } catch (error) {
        return error;
    }
}
// export async function useGetAll

export async function UseGetAllById(url, id) {
    try {
        const res = await axios.get(`${URL}/${url}/${id}`, headerAuthorization);
        return res;
    } catch (error) {
        return error;
    }
}

export async function UseGetOneById(url, id) {
    try {
        const res = await axios.get(`${URL}/${url}/${id}`, headerAuthorization);
        return res;
    } catch (error) {
        return error;
    }
}
export async function UseGetOneByIdTeacher(url, id) {
    try {
        const res = await axios.get(`${URL}/${url}/${id}`, headerAuthorization);
        return res;
    } catch (error) {
        return error;
    }
}

export async function UseGetOneByIdAndBody(url, id, body) {
    try {
        const res = await axios.get(`${URL}/${url}/${id}`, {params: body, headers: headerAuthorization.headers});
        return res;
    } catch (error) {
        return error;
    }
}

export async function isDoneTask(url, courseStudentId, taskId) {
    try {
        const res = await axios.get(`${URL}/${url}?courseStudentId=${courseStudentId}&taskId=${taskId}`, headerAuthorization);
        return res;
    } catch (error) {
        return error;
    }
}