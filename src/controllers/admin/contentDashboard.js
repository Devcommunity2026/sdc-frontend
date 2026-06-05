import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = async (
    setLoading,
    page,
    curr,
    setUsers,
    setTotalPages
) => {

    try {

        setLoading(true);

        let res;

        // ================= BLOGS =================
        if (curr === "Blogs") {

            res = await axios.get(
                `${API_URL}/mod/blog?page=${page}&limit=10`,
                {
                    withCredentials: true
                }
            );

            setUsers(res.data.data || []);
            setTotalPages(res.data.pagination?.totalPages || 1);
        }

        // ================= EVENTS =================
        else if (curr === "Events") {

            res = await axios.get(
                `${API_URL}/mod/event?page=${page}&limit=10`,
                {
                    withCredentials: true
                }
            );

            setUsers(res.data.data || []);
            setTotalPages(res.data.pagination?.totalPages || 1);
        }

        // ================= PROJECTS =================
        else if (curr === "Projects") {

            res = await axios.get(
                `${API_URL}/mod/project?page=${page}&limit=10`, 
                {
                    withCredentials: true
                }
            );

            setUsers(res.data.data || []);
            setTotalPages(res.data.pagination?.totalPages || 1);
        }

    } catch (error) {

        console.log(error);

    } finally {

        setLoading(false);
    }
};

export const handleRoleChange = async (id, role) => {
    try {
        console.log("Change Role:", id, role);

        // await axios.post(
        //     `${API_URL}/admin/editRole`,
        //     { role, id },
        //     { withCredentials: true }
        // );

    } catch (error) {
        console.log(error);
    }
};

export const handleBanUser = async (id) => {
    try {
        console.log("Ban User:", id);

        // await axios.patch(
        //     `${API_URL}/mod/ban-user/${id}`,
        //     {},
        //     { withCredentials: true }
        // );

    } catch (error) {
        console.log(error);
    }
};

export const handleDeleteMember = async (
    id,
    curr,
    fetchAgain
) => {

    try {

        // TEAM DELETE
        if (curr === "Team") {

            await axios.post(
                `${API_URL}/edit/removeCoreTeamMember`,
                { id },
                {
                    withCredentials: true,
                }
            );
        }

        // MENTOR DELETE
        else if (curr === "Mentor") {

            await axios.post(
                `${API_URL}/edit/removeMentor`,
                { id },
                {
                    withCredentials: true,
                }
            );
        }

        fetchAgain();

    } catch (error) {
        console.log(error);
    }
};

export const handleDeleteContent = async (
    id,
    curr,
    refreshUsers
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

        // ================= BLOG DELETE =================
        else if (curr === "Blogs") {

            await axios.post(
                `${API_URL}/edit/removeBlog`,
                { id },
                {
                    withCredentials: true,
                }
            );
        }

        refreshUsers();

    } catch (error) {

        console.log(error);
    }
};