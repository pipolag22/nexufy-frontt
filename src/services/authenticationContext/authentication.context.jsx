import { createContext, useEffect, useState } from "react";

export const AuthenticationContext = createContext();
const userValue = JSON.parse(localStorage.getItem("user"));

export const AuthenticationContextProvider = ({ children }) => {
    const [user, setUser] = useState(userValue);
    

    const handleLogin = (userData) => {
        localStorage.setItem("token", userData.accessToken);
        localStorage.setItem("user", JSON.stringify({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            roles: userData.roles,
            tokenType: userData.tokenType,
          })); // Guarda toda la información de usuario relevante
          setUser({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            roles: userData.roles,
            tokenType: userData.tokenType,
          }); // Actualiza el estado del usuario
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthenticationContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthenticationContext.Provider>
    );

};