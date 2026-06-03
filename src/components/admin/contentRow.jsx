import React from 'react'
import {
    MoreVertical,
    Shield,
    ShieldCheck,
    Ban
} from 'lucide-react'

const ContentRow = ({
    user,
    index,
    curr,
    openMenu,
    setOpenMenu,
    handleRoleChange,
    handleDeleteContent,
    refreshUsers,
}) => {
    return (
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
                {user.subHeading || user.email || "No Data"}
            </div>

            {/* ROLE */}
            <div className="w-[20%] flex items-center py-4">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                    ${user.role === "mentor"
                            ? "bg-accent/15 dark:bg-dark-accent/20 text-accent dark:text-dark-accent"
                            : "bg-primary/15 dark:bg-dark-primary/20 text-primary dark:text-dark-primary"
                        }`}
                >
                    {curr}
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

                        {/* DELETE MEMBER */}
                        {curr !== "All" && (
                            <button
                                onClick={() =>
                                    handleDeleteContent(
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
    )
}

export default ContentRow
