import React, { useEffect, useState } from "react";
import { fetchContent, handleRoleChange, handleBanUser, deleteContent, addEvent, addProject } from "../../controllers/admin/contentmanager";
import {
    Shield,
    ShieldCheck,
    Ban,
    MoreVertical,
} from "lucide-react";

import ContentRow from "../../components/admin/contentRow";

import AdminLayout from "../../components/admin/AdminLayout";
import Paginator from "../../components/ui/Paginator";


const UserDashboard = () => {

    // ================= CONTENT TYPES =================
    const contentType = ["Blogs", "Events", "Projects"];

    const [curr, setCurr] = useState("Blogs");

    // ================= STATES =================
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [openMenu, setOpenMenu] = useState(null);

    const [openAddModal, setOpenAddModal] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        subHeading: "",
        description: "",
        github: "",
        live: "",
        form: "",
        date: "",
        techStack: "",
        image: null,
    });

    // ================= FETCH =================
    useEffect(() => {

        // BLOGS EMPTY FOR NOW
        if (curr === "Blogs") {
            setUsers([]);
            return;
        }

        fetchContent(
            setLoading,
            page,
            curr,
            setUsers,
            setTotalPages
        );

    }, [page, curr]);

    // ================= REFRESH =================
    const refreshUsers = () => {

        fetchContent(
            setLoading,
            page,
            curr,
            setUsers,
            setTotalPages
        );
    };

    // ================= ADD CONTENT =================
    const handleAddMember = async () => {
        const onSuccess = () => {
            refreshUsers();
            setOpenAddModal(false);
            setFormData({
                name: "",
                subHeading: "",
                description: "",
                github: "",
                live: "",
                form: "",
                date: "",
                techStack: "",
                image: null,
            });
        };

        if (curr === "Events") {
            await addEvent(formData, onSuccess);
        } else if (curr === "Projects") {
            await addProject(formData, onSuccess);
        }
    };

    return (
        <AdminLayout>
            <div className="w-full space-y-5 pb-10">

                {/* ================= FILTERS ================= */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    {/* FILTER BUTTONS */}
                    <div className="inline-flex flex-wrap gap-2 p-1 rounded-xl bg-secondary dark:bg-dark-secondary border border-border dark:border-dark-border w-fit">

                        {contentType.map((item, index) => (
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
                    <button
                        onClick={() => {
                            setOpenAddModal(true);
                            setOpenMenu(null);
                        }}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary dark:bg-dark-primary text-primary-foreground dark:text-dark-primary-foreground font-medium shadow-md hover:opacity-90 transition-all duration-200"
                    >
                        + Add
                    </button>
                </div>
                {/* ================= TABLE ================= */}
                <div className="w-full rounded-2xl overflow-visible border border-border dark:border-dark-border bg-card dark:bg-dark-card shadow-sm">

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
                            <ContentRow
                                key={index}
                                user={user}
                                index={index}
                                curr={curr}
                                openMenu={openMenu}
                                setOpenMenu={setOpenMenu}
                                handleRoleChange={handleRoleChange}
                                handleDeleteContent={(id, curr, refreshFn) => deleteContent(id, curr, refreshFn)}
                                refreshUsers={refreshUsers}
                            />
                        ))
                    )}
                </div>

                {/* ================= PAGINATION ================= */}
                {!loading && totalPages > 1 && <Paginator page={page} setPage={setPage} totalPages={totalPages} />}

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

                        {/* SUB HEADING */}
                        {curr !== "Blogs" && (
                            <input
                                type="text"
                                placeholder="Sub Heading"
                                value={formData.subHeading}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        subHeading: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-3 rounded-xl border border-border dark:border-dark-border bg-transparent outline-none"
                            />
                        )}

                        {/* DESCRIPTION */}
                        {curr !== "Blogs" && (
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

                        {/* EVENTS */}
                        {curr === "Events" && (
                            <>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            date: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 rounded-xl border border-border dark:border-dark-border bg-transparent outline-none"
                                />

                                <input
                                    type="text"
                                    placeholder="Registration Form URL"
                                    value={formData.form}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            form: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 rounded-xl border border-border dark:border-dark-border bg-transparent outline-none"
                                />
                            </>
                        )}

                        {/* PROJECTS */}
                        {curr === "Projects" && (
                            <>
                                <input
                                    type="text"
                                    placeholder="GitHub URL"
                                    value={formData.github}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            github: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 rounded-xl border border-border dark:border-dark-border bg-transparent outline-none"
                                />

                                <input
                                    type="text"
                                    placeholder="Live Project URL"
                                    value={formData.live}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            live: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 rounded-xl border border-border dark:border-dark-border bg-transparent outline-none"
                                />

                                <input
                                    type="text"
                                    placeholder="Tech Stack (comma separated)"
                                    value={formData.techStack}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            techStack: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 rounded-xl border border-border dark:border-dark-border bg-transparent outline-none"
                                />
                            </>
                        )}

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
                            className="w-full py-3 rounded-xl bg-primary text-white font-medium"
                        >
                            Add {curr}
                        </button>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default UserDashboard;