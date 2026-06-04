import React from 'react'
import {
    MoreVertical,
    Ban
} from 'lucide-react'

const ContentRow = ({
    item,
    index,
    curr,
    openMenu,
    setOpenMenu,
    handleDeleteContent,
    refreshContent,
}) => {
    return (
        <div
            key={index}
            className="relative w-full min-h-14 flex px-4 border-b border-border dark:border-dark-border last:border-none hover:bg-muted/40 dark:hover:bg-dark-muted/40 transition-colors duration-200"
        >
            {/* NAME */}
            <div className="w-[25%] flex items-center py-4 text-card-foreground dark:text-dark-card-foreground font-medium">
                {item.name}
            </div>

            {/* EMAIL */}
            <div className="w-[35%] flex items-center py-4 break-all text-muted-foreground dark:text-dark-muted-foreground">
                {item.subHeading || item.email || "No Data"}
            </div>

            {/* ROLE */}
            <div className="w-[20%] flex items-center py-4">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                    ${item.role === "mentor"
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
                            openMenu === item._id
                                ? null
                                : item._id
                        )
                    }
                    className="h-10 w-10 rounded-lg flex items-center justify-center border border-border dark:border-dark-border bg-secondary dark:bg-dark-secondary hover:bg-muted dark:hover:bg-dark-muted transition"
                >
                    <MoreVertical size={18} />
                </button>

                {/* DROPDOWN */}
                {openMenu === item._id && (
                    <div className="absolute top-14 right-5 z-50 w-52 rounded-xl border border-border dark:border-dark-border bg-card dark:bg-dark-card shadow-2xl overflow-hidden">

                        {/* DELETE */}
                        {curr !== "All" && (
                            <button
                                onClick={() =>
                                    handleDeleteContent(
                                        item._id,
                                        curr,
                                        refreshContent
                                    )
                                }
                                className="w-full px-4 py-3 flex items-center gap-3 text-sm text-red-500 hover:bg-red-500/10 transition"
                            >
                                <Ban size={16} />
                                Delete
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ContentRow
