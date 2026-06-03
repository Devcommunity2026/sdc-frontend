import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const handelLogin = async (e, email, password) => {
    e.preventDefault();

    try {
        const res = await axios.post(
            `${API_URL}/auth/login`,
            { email, password },
            { withCredentials: true }
        );

        if (res.data.success) {
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "/";
        }
    } catch (err) {
        alert(err.response?.data?.message || "Login failed");
    }
};