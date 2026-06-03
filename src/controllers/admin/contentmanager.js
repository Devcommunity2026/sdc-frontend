import axios from "axios";
import { API_URL } from "../../config/api.js";

// ================= FETCH CONTENT =================
export const fetchContent = async (
    setLoading,
    page,
    curr,
    setContentList,
    setTotalPages
) => {
    try {
        setLoading(true);

        let res;

        // ================= BLOGS =================
        if (curr === "Blogs") {
            setContentList([]);
            setTotalPages(1);
        }

        // ================= EVENTS =================
        else if (curr === "Events") {
            res = await axios.get(
                `${API_URL}/mod/event?page=1&limit=20`,
                {
                    withCredentials: true,
                }
            );

            setContentList(res.data.data || []);
            setTotalPages(1);
        }

        // ================= PROJECTS =================
        else if (curr === "Projects") {
            res = await axios.get(
                `${API_URL}/mod/project?page=1&limit=20`,
                {
                    withCredentials: true,
                }
            );

            setContentList(res.data.data || []);
            setTotalPages(1);
        }
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
};

// ================= ADD EVENT =================
export const addEvent = async (formData, onSuccess) => {
    try {
        const data = new FormData();

        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("image", formData.image);
        data.append("subHeading", formData.subHeading);
        data.append("date", formData.date);
        data.append("form", formData.form);

        await axios.post(
            `${API_URL}/edit/addEvent`,
            data,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (onSuccess) {
            onSuccess();
        }
    } catch (error) {
        console.log(error);
    }
};

// ================= ADD PROJECT =================
export const addProject = async (formData, onSuccess) => {
    try {
        const data = new FormData();

        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("image", formData.image);
        data.append("subHeading", formData.subHeading);
        data.append("github", formData.github);
        data.append("live", formData.live);

        data.append(
            "techStack",
            JSON.stringify(
                formData.techStack
                    .split(",")
                    .map((item) => item.trim())
            )
        );

        await axios.post(
            `${API_URL}/edit/addProject`,
            data,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (onSuccess) {
            onSuccess();
        }
    } catch (error) {
        console.log(error);
    }
};

// ================= DELETE CONTENT =================
export const deleteContent = async (
    id,
    curr,
    onSuccess
) => {
    try {
        // ================= EVENT DELETE =================
        if (curr === "Events") {
            await axios.post(
                `${API_URL}/edit/removeEvent`,
                { id },
                {
                    withCredentials: true,
                }
            );
        }

        // ================= PROJECT DELETE =================
        else if (curr === "Projects") {
            await axios.post(
                `${API_URL}/edit/removeProject`,
                { id },
                {
                    withCredentials: true,
                }
            );
        }

        if (onSuccess) {
            onSuccess();
        }
    } catch (error) {
        console.log(error);
    }
};

// ================= HANDLE ROLE CHANGE =================
export const handleRoleChange = async (id, role, onSuccess) => {
    try {
        console.log("Change Role:", id, role);

        // TODO: Implement when API endpoint is available
        // await axios.patch(
        //     `${API_URL}/mod/change-role/${id}`,
        //     { role },
        //     { withCredentials: true }
        // );

        if (onSuccess) {
            onSuccess();
        }
    } catch (error) {
        console.log(error);
    }
};

// ================= HANDLE BAN USER =================
export const handleBanUser = async (id, onSuccess) => {
    try {
        console.log("Ban User:", id);

        // TODO: Implement when API endpoint is available
        // await axios.patch(
        //     `${API_URL}/mod/ban-user/${id}`,
        //     {},
        //     { withCredentials: true }
        // );

        if (onSuccess) {
            onSuccess();
        }
    } catch (error) {
        console.log(error);
    }
};
