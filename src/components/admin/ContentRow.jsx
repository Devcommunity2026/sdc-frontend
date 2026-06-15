import React from "react";
import { MoreVertical, Ban, Edit } from "lucide-react";

const ContentRow = ({
    user,
    curr,
    openMenu,
    setOpenMenu,
    handleDeleteContent,
    refreshUsers,
    onEditClick
}) => {
    return (
        <div
            className="relative w-full min-h-14 flex px-4 border-b border-border dark:border-dark-border last:border-none hover:bg-muted/40 dark:hover:bg-dark-muted/40 transition-colors duration-200"
        >
            {/* TITLE / NAME */}
            <div className="w-[25%] flex items-center py-4 text-card-foreground dark:text-dark-card-foreground font-medium">
                {user.title || user.name}
            </div>

            {/* DESCRIPTION / SUBHEADING */}
            <div className="w-[35%] flex items-center py-4 break-all text-muted-foreground dark:text-dark-muted-foreground text-sm">
                {user.subHeading || user.email || "No Data"}
            </div>

            {/* TYPE BADGE */}
            <div className="w-[20%] flex items-center py-4">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize bg-primary/15 dark:bg-dark-primary/20 text-primary dark:text-dark-primary`}
                >
                    {curr}
                </span>
            </div>

            {/* ACTIONS */}
            <div className="w-[20%] flex items-center justify-center relative">
                <button
                    onClick={() =>
                        setOpenMenu(
                            openMenu === user._id ? null : user._id
                        )
                    }
                    className="h-10 w-10 rounded-lg flex items-center justify-center border border-border dark:border-dark-border bg-secondary dark:bg-dark-secondary hover:bg-muted dark:hover:bg-dark-muted transition cursor-pointer"
                >
                    <MoreVertical size={18} />
                </button>

                {/* DROPDOWN */}
                {openMenu === user._id && (
                    <div className="absolute top-14 right-5 z-50 w-52 rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                        {/* EDIT CONTENT */}
                        {(curr === "Events" || curr === "Projects") && (
                            <button
                                onClick={() => {
                                    setOpenMenu(null);
                                    onEditClick(user);
                                }}
                                className="w-full px-4 py-3 flex items-center gap-3 text-sm text-foreground dark:text-dark-foreground hover:bg-muted dark:hover:bg-dark-muted transition cursor-pointer text-left border-b border-border dark:border-dark-border"
                            >
                                <Edit size={16} />
                                Edit {curr === "Events" ? "Event" : "Project"}
                            </button>
                        )}

                        {/* DELETE CONTENT */}
                        <button
                            onClick={() => {
                                setOpenMenu(null);
                                handleDeleteContent(user._id, curr, refreshUsers);
                            }}
                            className="w-full px-4 py-3 flex items-center gap-3 text-sm text-red-500 hover:bg-red-500/10 transition cursor-pointer text-left"
                        >
                            <Ban size={16} />
                            Delete {curr === "Blogs" ? "Blog" : curr === "Events" ? "Event" : curr === "Projects" ? "Project" : "Content"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentRow;
