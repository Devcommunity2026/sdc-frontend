import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/admin/AdminLayout";

const UserDashboard = () => {
    const userType = ["All", "Team", "Mentor"];
    const [curr, setCurr] = useState("All");

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUsers = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `http://localhost:3000/mod/users?page=${page}&limit=10`
            );

            let fetchedUsers = res.data.data;

            if (curr !== "All") {
                fetchedUsers = fetchedUsers.filter(
                    (user) =>
                        user.role.toLowerCase() === curr.toLowerCase()
                );
            }

            setUsers(fetchedUsers);
            setTotalPages(res.data.pagination.totalPages);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, curr]);

    return (
        <AdminLayout>
            <div className="inline-flex gap-2 p-1 rounded-lg bg-secondary dark:bg-dark-secondary mb-4">
                {userType.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurr(item);
                            setPage(1);
                        }}
                        className={`px-4 py-2 rounded-md text-sm cursor-pointer font-semibold transition ${curr === item
                                ? "bg-card dark:bg-dark-card text-foreground dark:text-dark-foreground"
                                : "text-muted-foreground dark:text-dark-muted-foreground hover:bg-card/50 dark:hover:bg-dark-card/50"
                            }`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <div className="w-full bg-card dark:bg-dark-card rounded-md p-3 overflow-y-auto">
                
                {/* Header */}
                <div className="w-full border-b h-12 flex px-3 font-semibold">
                    <div className="h-full w-2/5 flex items-center">
                        Name
                    </div>

                    <div className="h-full w-2/5 flex items-center">
                        Email
                    </div>

                    <div className="h-full w-1/5 flex items-center">
                        Role
                    </div>
                </div>

                {/* Data */}
                {loading ? (
                    <div className="py-10 text-center">
                        Loading...
                    </div>
                ) : users.length === 0 ? (
                    <div className="py-10 text-center">
                        No Users Found
                    </div>
                ) : (
                    users.map((user, index) => (
                        <div
                            key={index}
                            className="w-full border-b min-h-12 flex px-3"
                        >
                            <div className="w-2/5 flex items-center py-3">
                                {user.name}
                            </div>

                            <div className="w-2/5 flex items-center py-3 break-all">
                                {user.email}
                            </div>

                            <div className="w-1/5 flex items-center py-3 capitalize">
                                {user.role}
                            </div>
                        </div>
                    ))
                )}

                {/* Pagination */}
                <div className="flex items-center justify-center gap-3 mt-5">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                        className="px-4 py-2 rounded-md border disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <span>
                        {page} / {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                        className="px-4 py-2 rounded-md border disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default UserDashboard;