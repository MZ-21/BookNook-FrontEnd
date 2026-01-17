import api from "./axiosConfig";

// Login api call, returns { token, userId, username }
export const login = async (email, password) => {
    try {
        const response = await api.post("/api/v1/auth/login", {
            email: email,
            password: password
        });
        return response.data;
    }
    catch (error) {
        console.log("Login Error:", error);
    }
}

// Signup api call, returns success message and creates user in backend
export const signup = async (payload) => {
    try {
        const response = await api.post("/api/v1/users/signup", payload);
        return response.data;
    } catch (error) {
        console.log("Signup Error:", error);
    }
}