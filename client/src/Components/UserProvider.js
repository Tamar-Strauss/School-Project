import { useState, useEffect } from "react";
import { UseGetOneById } from "../services/useGetAxios";
import UserContext from "./UserContext";

const UserProvider = ({ children, status, userId }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        if(userId) {
            UseGetOneById(`${status}`, userId)
            .then(res => {
                const user = res.data;
                setUser(user);
            });
        }
    }, [userId])

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;