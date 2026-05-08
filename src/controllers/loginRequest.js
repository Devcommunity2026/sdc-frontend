import axios from "axios";

export const handelLogin = async (e, email, password) => {
    e.preventDefault();
    try {
        const res = await axios.post(
            "http://localhost:3000/auth/login",
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