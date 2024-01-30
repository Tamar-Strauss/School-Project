import { useGetAll } from "./useGetAxios";

export async function GetAllCourses() {
    try {
        return useGetAll('courses');
    } catch (error) {
        return error;
    }
}