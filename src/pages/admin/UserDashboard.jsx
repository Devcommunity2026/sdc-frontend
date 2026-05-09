import React, { useEffect, useState } from "react";
import {
    fetchUsers,
    handleRoleChange,
    handleBanUser,
    handleDeleteMember,
} from "../../controllers/admin/userDashboard";

import {
    Shield,
    ShieldCheck,
    Ban,
    MoreVertical,
} from "lucide-react";

import AdminLayout from "../../components/admin/AdminLayout";
import axios from "axios";

const UserDashboard = () => {

    const userType = ["All", "Team", "Mentor"];

    const [curr, setCurr] = useState("All");

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [openMenu, setOpenMenu] = useState(null);
    const [openAddModal, setOpenAddModal] = useState(false);

    // SUBMIT LOADING
    const [submitLoading, setSubmitLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        post: "",
        description: "",
        linkedin: "",
        image: null,
    });

    useEffect(() => {
        fetchUsers(setLoading, page, curr, setUsers, setTotalPages);
    }, [page, curr]);

    const handleAddMember = async () => {

        try {

            setSubmitLoading(true);

            const data = new FormData();

            data.append("name", formData.name);
            data.append("linkedin", formData.linkedin);
            data.append("image", formData.image);

            // TEAM
            if (curr === "Team") {

                data.append("post", formData.post);

                await axios.post(
                    "http://localhost:3000/edit/addCoreTeamMember",
                    data,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            }

            // MENTOR
            else if (curr === "Mentor") {

                data.append("description", formData.description);

                await axios.post(
                    "http://localhost:3000/edit/addMentor",
                    data,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            }

            fetchUsers(
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

            console.log(error);

        } finally {

            setSubmitLoading(false);
        }
    };

    const refreshUsers = () => {
        fetchUsers(
            setLoading,
            page,
            curr,
            setUsers,
            setTotalPages
        );
    };

    return (
        <AdminLayout>

            <div className="w-full space-y-5 pb-10">

                {/* ================= FILTERS ================= */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    {/* FILTER BUTTONS */}
                    <div
                        className="inline-flex flex-wrap gap-2 p-1 rounded-xl bg-secondary dark:bg-dark-secondary border border-border
                        dark:border-dark-border w-fit"
                    >
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

                    {/* ADD BUTTON */}
                    {curr !== "All" && (
                        <button
                            onClick={() => {
                                setOpenAddModal(true);
                                setOpenMenu(null);
                            }}
                            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary dark:bg-dark-primary text-primary-foreground 
                            dark:text-dark-primary-foreground font-medium shadow-md hover:opacity-90 transition-all duration-200"
                        >
                            + Add
                        </button>
                    )}
                </div>

                {/* ================= TABLE ================= */}
                <div
                    className="w-full rounded-2xl overflow-visible border border-border dark:border-dark-border bg-card
                    dark:bg-dark-card shadow-sm"
                >

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
                                className="relative w-full min-h-14 flex px-4 border-b border-border dark:border-dark-border
                                last:border-none hover:bg-muted/40 dark:hover:bg-dark-muted/40 transition-colors duration-200"
                            >

                                {/* NAME */}
                                <div className="w-[25%] flex items-center py-4 text-card-foreground dark:text-dark-card-foreground font-medium">
                                    {user.name}
                                </div>

                                {/* EMAIL / LINKEDIN */}
                                <div
                                    className="w-[35%] flex items-center py-4 break-all text-muted-foreground 
                                    dark:text-dark-muted-foreground"
                                >
                                    {user.email ||
                                        user.linkedIn ||
                                        user.linkedin ||
                                        "No Email"}
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
                                        {user.role || curr}
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

                                            {curr === "All" && (
                                                <>
                                                    {user.role !== "admin" && (
                                                        <button
                                                            onClick={() =>
                                                                handleRoleChange(
                                                                    user.email,
                                                                    "admin",
                                                                    setOpenMenu,
                                                                    setLoading,
                                                                    page,
                                                                    curr,
                                                                    setUsers,
                                                                    setTotalPages
                                                                )
                                                            }
                                                            className="w-full px-4 py-3 flex items-center gap-3 text-sm text-foreground dark:text-dark-foreground hover:bg-muted dark:hover:bg-dark-muted transition"
                                                        >
                                                            <Shield size={16} />
                                                            Make Admin
                                                        </button>
                                                    )}

                                                    {user.role !== "moderator" && (
                                                        <button
                                                            onClick={() =>
                                                                handleRoleChange(
                                                                    user.email,
                                                                    "moderator",
                                                                    setOpenMenu,
                                                                    setLoading,
                                                                    page,
                                                                    curr,
                                                                    setUsers,
                                                                    setTotalPages
                                                                )
                                                            }
                                                            className="w-full px-4 py-3 flex items-center gap-3 text-sm text-foreground dark:text-dark-foreground hover:bg-muted dark:hover:bg-dark-muted transition"
                                                        >
                                                            <ShieldCheck size={16} />
                                                            Make Moderator
                                                        </button>
                                                    )}

                                                    {user.role !== "user" && (
                                                        <button
                                                            onClick={() =>
                                                                handleRoleChange(
                                                                    user.email,
                                                                    "user",
                                                                    setOpenMenu,
                                                                    setLoading,
                                                                    page,
                                                                    curr,
                                                                    setUsers,
                                                                    setTotalPages
                                                                )
                                                            }
                                                            className="w-full px-4 py-3 flex items-center gap-3 text-sm text-foreground dark:text-dark-foreground hover:bg-muted dark:hover:bg-dark-muted transition"
                                                        >
                                                            <ShieldCheck size={16} />
                                                            Make User
                                                        </button>
                                                    )}
                                                </>
                                            )}

                                            {/* DELETE MEMBER */}
                                            {curr !== "All" && (
                                                <button
                                                    onClick={() =>
                                                        handleDeleteMember(
                                                            user._id,
                                                            curr,
                                                            refreshUsers
                                                        )
                                                    }
                                                    className="w-full px-4 py-3 flex items-center gap-3 text-sm text-red-500 hover:bg-red-500/10 transition"
                                                >
                                                    <Ban size={16} />
                                                    Delete Member
                                                </button>
                                            )}
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

            {/* ================= ADD MODAL ================= */}
            {openAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

                    <div className="w-full max-w-lg rounded-2xl bg-card dark:bg-dark-card border border-border dark:border-dark-border p-6 space-y-5">

                        {/* HEADER */}
                        <div className="flex items-center justify-between">

                            <h2 className="text-xl font-semibold">
                                Add {curr}
                            </h2>

                            <button
                                onClick={() => setOpenAddModal(false)}
                                className="text-xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* NAME */}
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-border dark:border-dark-border bg-transparent outline-none"
                        />

                        {/* POST */}
                        {curr === "Team" && (
                            <input
                                type="text"
                                placeholder="Post"
                                value={formData.post}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        post: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-3 rounded-xl border border-border dark:border-dark-border bg-transparent outline-none"
                            />
                        )}

                        {/* DESCRIPTION */}
                        {curr === "Mentor" && (
                            <textarea
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-3 rounded-xl border border-border dark:border-dark-border bg-transparent outline-none min-h-[120px]"
                            />
                        )}

                        {/* LINKEDIN */}
                        <input
                            type="text"
                            placeholder="LinkedIn URL"
                            value={formData.linkedin}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    linkedin: e.target.value,
                                })
                            }
                            className="w-full px-4 py-3 rounded-xl border border-border dark:border-dark-border bg-transparent outline-none"
                        />

                        {/* IMAGE */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {

                                console.log(e.target.files[0]);

                                setFormData({
                                    ...formData,
                                    image: e.target.files[0],
                                });
                            }}
                            className="w-full"
                        />

                        {/* SUBMIT */}
                        <button
                            onClick={handleAddMember}
                            disabled={submitLoading}
                            className={`w-full py-3 rounded-xl font-medium transition-all duration-200
                            
                                ${submitLoading
                                    ? "bg-primary/70 cursor-not-allowed text-white"
                                    : "bg-primary hover:opacity-90 text-white"
                                }
                            `}
                        >
                            {submitLoading ? (
                                <div className="flex items-center justify-center gap-2">

                                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />

                                    <span>
                                        Adding {curr}...
                                    </span>
                                </div>
                            ) : (
                                `Add ${curr}`
                            )}
                        </button>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default UserDashboard;