import React, { useEffect, useState } from "react";
import { fetchUsers, handleRoleChange, handleBanUser } from "../../controllers/admin/userDashboard";
import {
    Shield,
    ShieldCheck,
    Ban,
    MoreVertical,
} from "lucide-react";

import AdminLayout from "../../components/admin/AdminLayout";

const UserDashboard = () => {
    const userType = ["All", "Team", "Mentor"];

    const [curr, setCurr] = useState("All");

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [openMenu, setOpenMenu] = useState(null);

    useEffect(() => {
        fetchUsers(setLoading, page, curr, setUsers, setTotalPages);
    }, [page, curr]);


    return (
        <AdminLayout>
            <div className="w-full space-y-5 pb-10">

                {/* ================= FILTERS ================= */}
                <div className="inline-flex gap-2 p-1 rounded-xl bg-secondary dark:bg-dark-secondary border border-border dark:border-dark-border">

                    {userType.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurr(item);
                                setPage(1);
                            }}
                            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                                
                                ${curr === item
                                    ? "bg-primary dark:bg-dark-primary text-primary-foreground dark:text-dark-primary-foreground shadow-md"
                                    : "text-secondary-foreground dark:text-dark-secondary-foreground hover:bg-muted dark:hover:bg-dark-muted"
                                }
                            `}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* ================= TABLE ================= */}
                <div className="w-full rounded-2xl overflow-hidden border border-border dark:border-dark-border bg-card dark:bg-dark-card shadow-sm">

                    {/* ================= HEADER ================= */}
                    <div className="w-full h-14 flex px-4 bg-muted dark:bg-dark-muted border-b border-border dark:border-dark-border text-sm font-semibold text-foreground dark:text-dark-foreground">

                        <div className="h-full w-[25%] flex items-center">
                            Name
                        </div>

                        <div className="h-full w-[35%] flex items-center">
                            Email
                        </div>

                        <div className="h-full w-[20%] flex items-center">
                            Role
                        </div>

                        <div className="h-full w-[20%] flex items-center justify-center">
                            Actions
                        </div>
                    </div>

                    {/* ================= LOADING ================= */}
                    {loading ? (
                        <div className="py-14 text-center text-muted-foreground dark:text-dark-muted-foreground">
                            Loading users...
                        </div>
                    ) : users.length === 0 ? (

                        /* ================= EMPTY ================= */
                        <div className="py-14 text-center text-muted-foreground dark:text-dark-muted-foreground">
                            No Users Found
                        </div>

                    ) : (

                        /* ================= DATA ================= */
                        users.map((user, index) => (
                            <div
                                key={index}
                                className="relative w-full min-h-14 flex px-4 border-b border-border dark:border-dark-border last:border-none hover:bg-muted/40 dark:hover:bg-dark-muted/40 transition-colors duration-200"
                            >

                                {/* NAME */}
                                <div className="w-[25%] flex items-center py-4 text-card-foreground dark:text-dark-card-foreground font-medium">
                                    {user.name}
                                </div>

                                {/* EMAIL */}
                                <div className="w-[35%] flex items-center py-4 break-all text-muted-foreground dark:text-dark-muted-foreground">
                                    {user.email}
                                </div>

                                {/* ROLE */}
                                <div className="w-[20%] flex items-center py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                                            
                                            ${user.role === "mentor"
                                                ? "bg-accent/15 dark:bg-dark-accent/20 text-accent dark:text-dark-accent"
                                                : "bg-primary/15 dark:bg-dark-primary/20 text-primary dark:text-dark-primary"
                                            }
                                        `}
                                    >
                                        {user.role}
                                    </span>
                                </div>

                                {/* ACTIONS */}
                                <div className="w-[20%] flex items-center justify-center relative">

                                    <button
                                        onClick={() =>
                                            setOpenMenu(
                                                openMenu === user._id
                                                    ? null
                                                    : user._id
                                            )
                                        }
                                        className="h-10 w-10 rounded-lg flex items-center justify-center border border-border dark:border-dark-border bg-secondary dark:bg-dark-secondary hover:bg-muted dark:hover:bg-dark-muted transition"
                                    >
                                        <MoreVertical size={18} />
                                    </button>

                                    {/* DROPDOWN */}
                                    {openMenu === user._id && (
                                        <div className="absolute top-14 right-5 z-50 w-52 rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card shadow-2xl overflow-hidden">

                                            {/* MAKE TEAM */}
                                            <button
                                                onClick={() =>
                                                    handleRoleChange(
                                                        user._id,
                                                        "team"
                                                    )
                                                }
                                                className="w-full px-4 py-3 flex items-center gap-3 text-sm text-foreground dark:text-dark-foreground hover:bg-muted dark:hover:bg-dark-muted transition"
                                            >
                                                <Shield size={16} />
                                                Make Team
                                            </button>

                                            {/* MAKE MENTOR */}
                                            <button
                                                onClick={() =>
                                                    handleRoleChange(
                                                        user._id,
                                                        "mentor"
                                                    )
                                                }
                                                className="w-full px-4 py-3 flex items-center gap-3 text-sm text-foreground dark:text-dark-foreground hover:bg-muted dark:hover:bg-dark-muted transition"
                                            >
                                                <ShieldCheck size={16} />
                                                Make Mentor
                                            </button>

                                            {/* BAN USER */}
                                            <button
                                                onClick={() =>
                                                    handleBanUser(user._id)
                                                }
                                                className="w-full px-4 py-3 flex items-center gap-3 text-sm text-red-500 hover:bg-red-500/10 transition"
                                            >
                                                <Ban size={16} />
                                                Ban User
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* ================= PAGINATION ================= */}
                {!loading && totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4">

                        <button
                            disabled={page === 1}
                            onClick={() => setPage((prev) => prev - 1)}
                            className="px-4 py-2 rounded-lg border border-border dark:border-dark-border bg-card dark:bg-dark-card text-foreground dark:text-dark-foreground hover:bg-muted dark:hover:bg-dark-muted disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                            Prev
                        </button>

                        <div className="px-4 py-2 rounded-lg bg-secondary dark:bg-dark-secondary text-secondary-foreground dark:text-dark-secondary-foreground font-medium">
                            {page} / {totalPages}
                        </div>

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage((prev) => prev + 1)}
                            className="px-4 py-2 rounded-lg border border-border dark:border-dark-border bg-card dark:bg-dark-card text-foreground dark:text-dark-foreground hover:bg-muted dark:hover:bg-dark-muted disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default UserDashboard;