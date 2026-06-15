import React, { useState } from "react";
import { handleEditContent } from "../../controllers/admin/contentDashboard";

const ContentEditModal = ({ curr, content, setOpenEditModal, page, setUsers, setTotalPages, setLoading, fetchUsers }) => {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: content.name || content.title || "",
        subHeading: content.subHeading || "",
        description: content.description || "",
        live: content.live || "",
        form: content.form || "",
        date: content.date ? new Date(content.date).toISOString().split("T")[0] : "",
        techStack: content.techStack ? (Array.isArray(content.techStack) ? content.techStack.join(", ") : content.techStack) : "",
        image: null,
    });

    const handleEdit = (e) => {
        e.preventDefault();
        handleEditContent({
            id: content._id,
            formData,
            curr,
            setSubmitLoading,
            setLoading,
            page,
            setUsers,
            setTotalPages,
            setOpenEditModal,
            fetchUsers,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 overflow-y-auto py-10">
            <div className="w-full max-w-lg rounded-2xl bg-card dark:bg-dark-card border border-border dark:border-dark-border p-6 space-y-5 my-auto max-h-[90vh] overflow-y-auto custom-scrollbar animate-in scale-in duration-200">
                
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground dark:text-dark-foreground">
                        Edit {curr === "Projects" ? "Project" : curr === "Events" ? "Event" : curr}
                    </h2>
                    <button
                        onClick={() => setOpenEditModal(false)}
                        className="text-2xl hover:text-red-500 transition cursor-pointer text-muted-foreground dark:text-dark-muted-foreground"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleEdit} className="space-y-4 text-left">
                    {/* NAME / TITLE */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground dark:text-dark-muted-foreground">
                            Name *
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            className="w-full px-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground outline-none text-sm"
                        />
                    </div>

                    {/* SUB HEADING */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground dark:text-dark-muted-foreground">
                            Sub Heading *
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Sub Heading"
                            value={formData.subHeading}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    subHeading: e.target.value,
                                })
                            }
                            className="w-full px-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground outline-none text-sm"
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground dark:text-dark-muted-foreground">
                            Description / Body *
                        </label>
                        <textarea
                            required
                            placeholder="Detailed description content..."
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            className="w-full px-4 py-2.5 border border-border dark:border-dark-border bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground outline-none text-sm min-h-[150px] rounded-xl"
                        />
                    </div>

                    {/* EVENTS DATE */}
                    {curr === "Events" && (
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-muted-foreground dark:text-dark-muted-foreground">
                                Date *
                            </label>
                            <input
                                type="date"
                                required
                                value={formData.date}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        date: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground outline-none text-sm"
                            />
                        </div>
                    )}

                    {/* EVENTS SPECIFIC */}
                    {curr === "Events" && (
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-muted-foreground dark:text-dark-muted-foreground">
                                Registration Form URL *
                            </label>
                            <input
                                type="url"
                                required
                                placeholder="https://..."
                                value={formData.form}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        form: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground outline-none text-sm"
                            />
                        </div>
                    )}

                    {/* PROJECTS SPECIFIC */}
                    {curr === "Projects" && (
                        <>
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-muted-foreground dark:text-dark-muted-foreground">
                                    Live Project URL *
                                </label>
                                <input
                                    type="url"
                                    required
                                    placeholder="https://..."
                                    value={formData.live}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            live: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground outline-none text-sm"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-muted-foreground dark:text-dark-muted-foreground">
                                    Tech Stack (comma separated) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="React, Tailwind, Node.js"
                                    value={formData.techStack}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            techStack: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2.5 rounded-xl border border-border dark:border-dark-border bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground outline-none text-sm"
                                />
                            </div>
                        </>
                    )}

                    {/* IMAGE FILE UPLOAD */}
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-muted-foreground dark:text-dark-muted-foreground">
                            Upload Thumbnail Image (leave empty to keep current)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    image: e.target.files[0],
                                });
                            }}
                            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 dark:file:bg-dark-primary/10 dark:file:text-dark-primary cursor-pointer"
                        />
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                        type="submit"
                        disabled={submitLoading}
                        className="w-full py-3 mt-4 rounded-xl bg-primary dark:bg-dark-primary text-primary-foreground dark:text-dark-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
                    >
                        {submitLoading ? "Updating..." : `Update ${curr === "Projects" ? "Project" : curr === "Events" ? "Event" : curr}`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContentEditModal;
