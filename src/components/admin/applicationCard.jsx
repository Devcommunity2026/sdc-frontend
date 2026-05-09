import React, { useState } from "react";

import {
    Mail,
    Phone,
    GraduationCap,
    Code2,
    FileText,
    CheckCircle2,
    Clock3,
    XCircle,
    Loader2,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

import axios from "axios";

const statusColors = {
    Applied:
        "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",

    "On Hold":
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300",

    Selected:
        "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",

    Rejected:
        "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
};

const ApplicationCard = ({ application, curr }) => {

    const [loading, setLoading] = useState(false);

    const handleStateChange = async (status) => {

        try {

            setLoading(true);

            const response = await axios.post(
                "http://localhost:3000/edit/application",
                {
                    id: application?._id,
                    status,
                },
                {
                    withCredentials: true,
                }
            );

            alert(response?.data?.message || "Application Updated");

            window.location.reload();

        } catch (error) {

            console.error(error);

            alert(
                error?.response?.data?.message ||
                "Failed To Update Application"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div
            className="
                w-full p-6
                border-b border-border dark:border-dark-border
                bg-card dark:bg-dark-card
                hover:bg-secondary/40 dark:hover:bg-dark-secondary/40
                transition-all duration-300
            "
        >
            <div className="flex flex-col xl:flex-row gap-6">

                {/* ================= LEFT ================= */}
                <div className="flex-1 space-y-5">

                    {/* NAME + STATUS */}
                    <div className="flex flex-wrap items-center gap-3">

                        <h2
                            className="
                                text-2xl font-bold
                                text-foreground dark:text-dark-foreground
                            "
                        >
                            {application?.name}
                        </h2>

                        <span
                            className={`
                                px-3 py-1 rounded-full
                                text-xs font-semibold
                                ${statusColors[application?.status]}
                            `}
                        >
                            {application?.status}
                        </span>
                    </div>

                    {/* CONTACT INFO */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div
                            className="
                                flex items-center gap-3
                                text-sm
                                text-muted-foreground dark:text-dark-muted-foreground
                            "
                        >
                            <Mail size={18} />

                            <span>{application?.email}</span>
                        </div>

                        <div
                            className="
                                flex items-center gap-3
                                text-sm
                                text-muted-foreground dark:text-dark-muted-foreground
                            "
                        >
                            <Phone size={18} />

                            <span>{application?.phone}</span>
                        </div>

                        <div
                            className="
                                flex items-center gap-3
                                text-sm
                                text-muted-foreground dark:text-dark-muted-foreground
                            "
                        >
                            <GraduationCap size={18} />

                            <span>
                                {application?.college} •{" "}
                                {application?.branch}
                            </span>
                        </div>

                        <div
                            className="
                                flex items-center gap-3
                                text-sm
                                text-muted-foreground dark:text-dark-muted-foreground
                            "
                        >
                            <Code2 size={18} />

                            <span>
                                Year {application?.year} •{" "}
                                {application?.domain}
                            </span>
                        </div>
                    </div>

                    {/* SKILLS */}
                    <div>

                        <h3
                            className="
                                text-sm font-semibold mb-3
                                text-foreground dark:text-dark-foreground
                            "
                        >
                            Skills
                        </h3>

                        <div className="flex flex-wrap gap-2">

                            {application?.skills?.map((skill, index) => (
                                <span
                                    key={index}
                                    className="
                                        px-3 py-1 rounded-full
                                        text-xs font-medium

                                        bg-secondary dark:bg-dark-secondary
                                        text-secondary-foreground dark:text-dark-secondary-foreground

                                        border border-border dark:border-dark-border
                                    "
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* MOTIVATION */}
                    <div>

                        <h3
                            className="
                                text-sm font-semibold mb-2
                                text-foreground dark:text-dark-foreground
                            "
                        >
                            Motivation
                        </h3>

                        <p
                            className="
                                text-sm leading-relaxed
                                rounded-2xl p-4

                                bg-background dark:bg-dark-background

                                border border-border dark:border-dark-border

                                text-muted-foreground dark:text-dark-muted-foreground
                            "
                        >
                            {application?.motivation}
                        </p>
                    </div>
                </div>

                {/* ================= RIGHT ================= */}
                <div className="w-full xl:w-[260px] flex flex-col gap-3">

                    {/* GITHUB */}
                    <a
                        href={application?.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            flex items-center gap-3
                            p-4 rounded-2xl

                            bg-background dark:bg-dark-background

                            border border-border dark:border-dark-border

                            hover:bg-secondary dark:hover:bg-dark-secondary

                            transition-all duration-200
                        "
                    >
                        <FaGithub
                            size={20}
                            className="
                                text-foreground dark:text-dark-foreground
                            "
                        />

                        <div>
                            <p
                                className="
                                    text-sm font-semibold
                                    text-foreground dark:text-dark-foreground
                                "
                            >
                                GitHub
                            </p>

                            <p
                                className="
                                    text-xs
                                    text-muted-foreground dark:text-dark-muted-foreground
                                "
                            >
                                View Profile
                            </p>
                        </div>
                    </a>

                    {/* LINKEDIN */}
                    <a
                        href={application?.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            flex items-center gap-3
                            p-4 rounded-2xl

                            bg-background dark:bg-dark-background

                            border border-border dark:border-dark-border

                            hover:bg-secondary dark:hover:bg-dark-secondary

                            transition-all duration-200
                        "
                    >
                        <FaLinkedin
                            size={20}
                            className="
                                text-foreground dark:text-dark-foreground
                            "
                        />

                        <div>
                            <p
                                className="
                                    text-sm font-semibold
                                    text-foreground dark:text-dark-foreground
                                "
                            >
                                LinkedIn
                            </p>

                            <p
                                className="
                                    text-xs
                                    text-muted-foreground dark:text-dark-muted-foreground
                                "
                            >
                                View Profile
                            </p>
                        </div>
                    </a>

                    {/* RESUME */}
                    <a
                        href={application?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            flex items-center gap-3
                            p-4 rounded-2xl

                            bg-background dark:bg-dark-background

                            border border-border dark:border-dark-border

                            hover:bg-secondary dark:hover:bg-dark-secondary

                            transition-all duration-200
                        "
                    >
                        <FileText
                            size={20}
                            className="
                                text-foreground dark:text-dark-foreground
                            "
                        />

                        <div>
                            <p
                                className="
                                    text-sm font-semibold
                                    text-foreground dark:text-dark-foreground
                                "
                            >
                                Resume
                            </p>

                            <p
                                className="
                                    text-xs
                                    text-muted-foreground dark:text-dark-muted-foreground
                                "
                            >
                                Open Resume
                            </p>
                        </div>
                    </a>
                </div>
            </div>

            {/* ================= ACTION BUTTONS ================= */}
            <div
                className="
                    mt-6 pt-6
                    border-t border-border dark:border-dark-border

                    flex flex-wrap gap-3
                "
            >

                {/* ACCEPT */}
                {curr !== "Selected" && (
                    <button
                        disabled={loading}
                        onClick={() => handleStateChange("Selected")}
                        className="
                            flex items-center gap-2
                            px-5 py-2.5 rounded-xl

                            bg-green-600 hover:bg-green-700

                            text-white text-sm font-medium

                            transition-all duration-200
                            cursor-pointer

                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >
                        {loading ? (
                            <Loader2
                                size={18}
                                className="animate-spin"
                            />
                        ) : (
                            <CheckCircle2 size={18} />
                        )}

                        {loading ? "Updating..." : "Accept"}
                    </button>
                )}

                {/* ON HOLD */}
                {curr !== "On Hold" && (
                    <button
                        disabled={loading}
                        onClick={() => handleStateChange("On Hold")}
                        className="
                            flex items-center gap-2
                            px-5 py-2.5 rounded-xl

                            bg-yellow-500 hover:bg-yellow-600

                            text-white text-sm font-medium

                            transition-all duration-200
                            cursor-pointer

                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >
                        {loading ? (
                            <Loader2
                                size={18}
                                className="animate-spin"
                            />
                        ) : (
                            <Clock3 size={18} />
                        )}

                        {loading ? "Updating..." : "On Hold"}
                    </button>
                )}

                {/* REJECT */}
                {curr !== "Rejected" && (
                    <button
                        disabled={loading}
                        onClick={() => handleStateChange("Rejected")}
                        className="
                            flex items-center gap-2
                            px-5 py-2.5 rounded-xl

                            bg-red-600 hover:bg-red-700

                            text-white text-sm font-medium

                            transition-all duration-200
                            cursor-pointer

                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >
                        {loading ? (
                            <Loader2
                                size={18}
                                className="animate-spin"
                            />
                        ) : (
                            <XCircle size={18} />
                        )}

                        {loading ? "Updating..." : "Reject"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ApplicationCard;