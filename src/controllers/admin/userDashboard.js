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

        // ================= ALL USERS =================
        if (curr === "All") {
            res = await axios.get(
                `${API_URL}/mod/users?page=${page}&limit=10`,
                {
                    withCredentials: true,
                }
            );

            setUsers(res.data.data || []);
            setTotalPages(res.data.pagination?.totalPages || 1);
        }

        // ================= TEAM =================
        else if (curr === "Team") {
            res = await axios.get(
                `${API_URL}/mod/team?page=${page}&limit=10`,
                {
                    withCredentials: true,
                }
            );

            setUsers(res.data.data || []);
            setTotalPages(1);
        }

        // ================= MENTOR =================
        else if (curr === "Mentor") {
            res = await axios.get(
                `${API_URL}/mod/mentor?page=${page}&limit=10`,
                {
                    withCredentials: true,
                }
            );

            setUsers(res.data.data || []);
            setTotalPages(1);
        }
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
};

export const handleRoleChange = async (
    email,
    role,
    setOpenMenu,
    setLoading,
    page,
    curr,
    setUsers,
    setTotalPages
) => {
    try {
        const res = await axios.post(
            `${API_URL}/admin/editRole`,
            {
                role,
                email,
            },
            {
                withCredentials: true,
            }
        );


        if (!res.data.success) {
            alert(res.data.message);
        }

        setOpenMenu(null);

        fetchUsers(
            setLoading,
            page,
            curr,
            setUsers,
            setTotalPages
        );
    } catch (error) {
        console.log(error);
    }
};

export const handleBanUser = async (
    id,
    setOpenMenu,
    refreshUsers
) => {
    try {

        await axios.patch(
            `${API_URL}/mod/ban-user/${id}`,
            {},
            {
                withCredentials: true,
            }
        );

        setOpenMenu?.(null);
        refreshUsers?.();
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
        // ================= TEAM DELETE =================
        if (curr === "Team") {
            await axios.post(
                `${API_URL}/edit/removeCoreTeamMember`,
                { id },
                {
                    withCredentials: true,
                }
            );
        }

        // ================= MENTOR DELETE =================
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

        refreshUsers();
    } catch (error) {
        console.log(error);
    }
};

export const handleAddMember = async ({
    formData,
    curr,
    setSubmitLoading,
    setLoading,
    page,
    setUsers,
    setTotalPages,
    setOpenAddModal,
    setFormData,
    fetchUsers,
}) => {
    try {
        setSubmitLoading(true);

        const data = new FormData();

        data.append("name", formData.name);
        data.append("linkedin", formData.linkedin);
        data.append("image", formData.image);

        if (curr === "Team") {
            data.append("post", formData.post);

            await axios.post(
                `${API_URL}/edit/addCoreTeamMember`,
                data,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
        } else if (curr === "Mentor") {
            data.append("description", formData.description);

            await axios.post(
                `${API_URL}/edit/addMentor`,
                data,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
        }

        await fetchUsers(
            setLoading,
            page,
            curr,
            setUsers,
            setTotalPages
        );

        setOpenAddModal(false);

        setFormData({
            name: "",
            post: "",
            description: "",
            linkedin: "",
            image: null,
        });
    } catch (error) {
        console.error(error);
    } finally {
        setSubmitLoading(false);
    }
};