import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axiosConfig";

const AuthContext = createContext(null);

// AuthProvider component to wrap around the app and provide auth state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { userId, username }
    const [token, setToken] = useState(null);

    useEffect(() => {
        // On component mount, check localStorage for existing auth info
        const savedToken = localStorage.getItem("authToken");
        const savedUser = localStorage.getItem("user");

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
            // Add token to axios default headers
            api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
        }
    }, []);

    // Function to log in the user and store auth info
    const loginUser = (authResponse) => {
        localStorage.setItem("authToken", authResponse.token);
        localStorage.setItem(
            "user", 
            JSON.stringify({
                userId: authResponse.userId,
                username: authResponse.username
            })
        );

        api.defaults.headers.common['Authorization'] = `Bearer ${authResponse.token}`;
        setToken(authResponse.token);
        setUser({
            userId: authResponse.userId,
            username: authResponse.username
        });
    };

    // Function to log out the user and clear auth info
    const logoutUser = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, token, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
