import React, { useEffect, useState } from "react";
import {
    fetchUsers,
    handleRoleChange,
    handleBanUser,
    handleDeleteMember,
} from "../../controllers/admin/userDashboard";

import Slider from "../../components/admin/Slider";
import UserAdd from "../../components/admin/userAdd";
import UserRow from "../../components/admin/userRow";
import Paginator from "../../components/ui/Paginator";

import { Shield, ShieldCheck, Ban, MoreVertical, } from "lucide-react";

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

                    <Slider type={userType} curr={curr} setCurr={setCurr} setPage={setPage} />

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
                            <UserRow
                                key={user._id}
                                user={user}
                                index={index}
                                curr={curr}
                                openMenu={openMenu}
                                setOpenMenu={setOpenMenu}
                                setLoading={setLoading}
                                page={page}
                                setUsers={setUsers}
                                setTotalPages={setTotalPages}
                                refreshUsers={refreshUsers}
                                handleRoleChange={handleRoleChange}
                                handleDeleteMember={handleDeleteMember}
                            />
                        ))
                    )}
                </div>

                {/* ================= PAGINATION ================= */}
                {!loading && totalPages > 1 && <Paginator
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                />}
            </div>

            {/* ================= ADD MODAL ================= */}
            {openAddModal && (
                <UserAdd
                    curr={curr}
                    setOpenAddModal={setOpenAddModal}
                    formData={formData}
                    setFormData={setFormData}
                    submitLoading={submitLoading}
                    setSubmitLoading={setSubmitLoading}
                    setLoading={setLoading}
                    page={page}
                    setUsers={setUsers}
                    setTotalPages={setTotalPages}
                    fetchUsers={fetchUsers}
                />
            )}
        </AdminLayout>
    );
};

export default UserDashboard;