import React, { useEffect, useState } from "react";
import { fetchUsers, handleDeleteContent } from "../../controllers/admin/contentDashboard";
import AdminLayout from "../../components/admin/AdminLayout";
import ContentRow from "../../components/admin/ContentRow";
import ContentAddModal from "../../components/admin/ContentAddModal";
import ContentEditModal from "../../components/admin/ContentEditModal";
import Paginator from "../../components/ui/Paginator";

const ContentDashboard = () => {
    // ================= CONTENT TYPES =================
    const contentType = ["Blogs", "Events", "Projects"];
    const [curr, setCurr] = useState(() => {
        const saved = localStorage.getItem("admin_content_slider");
        return contentType.includes(saved) ? saved : "Blogs";
    });

    // ================= STATES =================
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [openMenu, setOpenMenu] = useState(null);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        localStorage.setItem("admin_content_slider", curr);
    }, [curr]);

    // ================= FETCH =================
    useEffect(() => {
        fetchUsers(
            setLoading,
            page,
            curr,
            setContents,
            setTotalPages
        );
    }, [page, curr]);

    // ================= REFRESH =================
    const refreshUsers = () => {
        fetchUsers(
            setLoading,
            page,
            curr,
            setContents,
            setTotalPages
        );
    };

    return (
        <AdminLayout>
            <div className="w-full space-y-5 pb-10">

                {/* ================= FILTERS & ACTIONS ================= */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    {/* FILTER BUTTONS */}
                    <div className="inline-flex flex-wrap gap-2 p-1 rounded-xl bg-secondary dark:bg-dark-secondary border border-border dark:border-dark-border w-fit">
                        {contentType.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurr(item);
                                    setPage(1);
                                    setOpenMenu(null);
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
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary dark:bg-dark-primary text-primary-foreground dark:text-dark-primary-foreground font-medium shadow-md hover:opacity-90 transition-all duration-200 cursor-pointer"
                    >
                        + Add
                    </button>
                </div>

                {/* ================= TABLE ================= */}
                <div className="w-full rounded-2xl overflow-visible border border-border dark:border-dark-border bg-card dark:bg-dark-card shadow-sm">
                    {loading ? (
                        <div className="py-14 text-center text-muted-foreground dark:text-dark-muted-foreground">
                            Loading {curr.toLowerCase()}...
                        </div>
                    ) : contents.length === 0 ? (
                        <div className="py-14 text-center text-muted-foreground dark:text-dark-muted-foreground">
                            No {curr} Found
                        </div>
                    ) : (
                        <>
                            {/* Table Header Row */}
                            <div className="relative w-full min-h-14 flex px-4 border-b border-border dark:border-dark-border bg-muted/40 transition-colors duration-200 font-semibold">
                                <div className="w-[25%] flex items-center py-4 text-card-foreground dark:text-dark-card-foreground font-semibold">
                                    Title / Name
                                </div>
                                <div className="w-[35%] flex items-center py-4 text-card-foreground dark:text-dark-card-foreground font-semibold">
                                    Details
                                </div>
                                <div className="w-[20%] flex items-center py-4 text-card-foreground dark:text-dark-card-foreground font-semibold">
                                    Type
                                </div>
                                <div className="w-[20%] flex items-center justify-center text-card-foreground dark:text-dark-card-foreground font-semibold">
                                    Action
                                </div>
                            </div>

                            {/* Table Body Rows */}
                            {contents.map((item, index) => (
                                <ContentRow
                                    key={item._id || index}
                                    user={item}
                                    curr={curr}
                                    openMenu={openMenu}
                                    setOpenMenu={setOpenMenu}
                                    handleDeleteContent={handleDeleteContent}
                                    refreshUsers={refreshUsers}
                                    onEditClick={(selectedItem) => {
                                        setEditingItem(selectedItem);
                                        setOpenEditModal(true);
                                    }}
                                />
                            ))}
                        </>
                    )}
                </div>

                {/* ================= PAGINATION ================= */}
                {!loading && totalPages > 1 && (
                    <Paginator
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages}
                    />
                )}

            </div>

            {/* ================= ADD MODAL ================= */}
            {openAddModal && (
                <ContentAddModal
                    curr={curr}
                    setOpenAddModal={setOpenAddModal}
                    refreshUsers={refreshUsers}
                />
            )}

            {/* ================= EDIT MODAL ================= */}
            {openEditModal && editingItem && (
                <ContentEditModal
                    curr={curr}
                    content={editingItem}
                    setOpenEditModal={setOpenEditModal}
                    page={page}
                    setUsers={setContents}
                    setTotalPages={setTotalPages}
                    setLoading={setLoading}
                    fetchUsers={fetchUsers}
                />
            )}
        </AdminLayout>
    );
};

export default ContentDashboard;