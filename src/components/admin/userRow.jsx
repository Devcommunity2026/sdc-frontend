import React from 'react'
import {
    MoreVertical,
    Shield,
    ShieldCheck,
    Ban
} from 'lucide-react'

const UserRow = ({
    user,
    index,
    curr,
    openMenu,
    setOpenMenu,
    setLoading,
    page,
    setUsers,
    setTotalPages,
    refreshUsers,
    handleRoleChange,
    handleDeleteMember
}) => {
    return (
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
                        }`}
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
    )
}

export default UserRow