import axios from "axios";

export const fetchUsers = async (setLoading, page, curr, setUsers, setTotalPages) => {
    try {
        setLoading(true);

        const res = await axios.get(
            `http://localhost:3000/mod/users?page=${page}&limit=10`,
            {
                withCredentials: true,
            }
        );

        let fetchedUsers = res.data.data || [];

        if (curr !== "All") {
            fetchedUsers = fetchedUsers.filter(
                (user) =>
                    user.role.toLowerCase() === curr.toLowerCase()
            );
        }

        setUsers(fetchedUsers);

        if (fetchedUsers.length === 0) {
            setTotalPages(0);
        } else {
            setTotalPages(res.data.pagination.totalPages || 1);
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
