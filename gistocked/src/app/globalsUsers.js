
"use client"
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const staticUsers = [
        {name: "admin", email: "admin@gmail.com", password: "123", rol:1},
        {name: "vendedor", email: "vendedor@gmail.com", password: "123", rol:2},
      ]

    const [rolState, setRolState] = useState("");
    const [userInfo, setUserInfo] = useState("");

    const updateRolState = (rol) => {
        setRolState(rol);
        setUserInfo(rol === 1 ? staticUsers[0] : rol === 2 ? staticUsers[1] : "");
    };

    return (
        <UserContext.Provider value={{ rolState, userInfo, updateRolState }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);