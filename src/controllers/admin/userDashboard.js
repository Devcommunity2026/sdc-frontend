import axios from "axios";

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

            setUsers([]);
            setTotalPages(1);
        }

        // ================= EVENTS =================
        else if (curr === "Events") {

            res = await axios.get(
                "http://localhost:3000/public/event?page=1&limit=20"
            );

            setUsers(res.data.data || []);
            setTotalPages(1);
        }

        // ================= PROJECTS =================
        else if (curr === "Projects") {

            res = await axios.get(
                "http://localhost:3000/public/project?page=1&limit=20"
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

export const handleRoleChange = async (id, role) => {
    try {
        console.log("Change Role:", id, role);

        // await axios.patch(
        //     `http://localhost:3000/mod/change-role/${id}`,
        //     { role },
        //     { withCredentials: true }
        // );

        setOpenMenu(null);
        fetchUsers();

    } catch (error) {
        console.log(error);
    }
};

export const handleBanUser = async (id) => {
    try {
        console.log("Ban User:", id);

        // await axios.patch(
        //     `http://localhost:3000/mod/ban-user/${id}`,
        //     {},
        //     { withCredentials: true }
        // );

        setOpenMenu(null);
        fetchUsers();

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
                "http://localhost:3000/edit/removeCoreTeamMember",
                { id },
                {
                    withCredentials: true,
                }
            );
        }

        // MENTOR DELETE
        else if (curr === "Mentor") {

            await axios.post(
                "http://localhost:3000/edit/removeMentor",
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
                "http://localhost:3000/edit/removeEvent",
                { id },
                {
                    withCredentials: true,
                }
            );
        }

        // ================= PROJECT DELETE =================
        else if (curr === "Projects") {

            await axios.post(
                "http://localhost:3000/edit/removeProject",
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