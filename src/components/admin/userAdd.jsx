import React from 'react'
import { handleAddMember } from '../../controllers/admin/userDashboard';


const UserAdd = ({
    curr,
    setOpenAddModal,
    formData,
    setFormData,
    submitLoading,
    setSubmitLoading,
    setLoading,
    page,
    setUsers,
    setTotalPages,
    fetchUsers
}) => {
    return (
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
                    onClick={() =>
                        handleAddMember({
                            formData,
                            curr,
                            setSubmitLoading,
                            setLoading,
                            page,
                            setUsers,
                            setTotalPages,
                            setOpenAddModal,
                            setFormData,
                            fetchUsers
                        })
                    }
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
        </div >
    )
}

export default UserAdd