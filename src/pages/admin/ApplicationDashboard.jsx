import React, { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../../components/admin/AdminLayout";
import ApplicationCard from "../../components/admin/applicationCard";

const ApplicationDashboard = () => {
    // ================= STATE =================
    const [curr, setCurr] = useState("Applied");
    const [domain, setDomain] = useState("all");

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ================= PAGINATION =================
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const [totalPages, setTotalPages] = useState(1);
    const [totalApplications, setTotalApplications] = useState(0);

    // ================= FILTER OPTIONS =================
    const tabs = ["Applied", "On Hold", "Rejected", "Selected"];

    const domainOptions = [
        "Web Development",
        "AI / Machine Learning",
        "Cybersecurity",
        "Mobile App Development",
    ];

    // ================= FETCH APPLICATIONS =================
    const fetchApplications = async () => {
        try {
            setLoading(true);
            setError("");

            let url = `http://localhost:3000/mod/application?page=${page}&limit=${limit}`;

            // STATUS FILTER
            url += `&status=${encodeURIComponent(curr)}`;

            // DOMAIN FILTER
            if (domain !== "all") {
                url += `&domain=${encodeURIComponent(domain)}`;
            }

            const res = await axios.get(url, {
                withCredentials: true,
            });

            console.log("API RESPONSE:", res.data);

            // ================= HANDLE RESPONSE =================
            const apps =
                res.data.applications ||
                res.data.data ||
                res.data ||
                [];

            setApplications(Array.isArray(apps) ? apps : []);

            // ================= PAGINATION =================
            setTotalPages(
                res.data.totalPages ||
                res.data.pagination?.totalPages ||
                1
            );

            setTotalApplications(
                res.data.total ||
                res.data.pagination?.total ||
                apps.length ||
                0
            );

        } catch (err) {
            console.error("FETCH ERROR:", err);

            setError(
                err.response?.data?.message ||
                "Failed to fetch applications"
            );

            setApplications([]);
        } finally {
            setLoading(false);
        }
    };

    // ================= FETCH ON CHANGE =================
    useEffect(() => {
        fetchApplications();
    }, [page, domain, curr]);

    // ================= RESET PAGE =================
    useEffect(() => {
        setPage(1);
    }, [domain, curr]);

    // ================= PAGINATION =================
    const handlePrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <AdminLayout>
            <div className="w-full space-y-6 pb-10">

                {/* ================= HEADER ================= */}
                <div>
                    <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground">
                        Application Dashboard
                    </h1>

                    <p className="text-sm mt-1 text-muted-foreground dark:text-dark-muted-foreground">
                        Manage and filter all applications.
                    </p>
                </div>

                {/* ================= FILTERS ================= */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    {/* STATUS FILTER */}
                    <div
                        className="
                            inline-flex flex-wrap gap-2 p-1 rounded-2xl
                            bg-secondary dark:bg-dark-secondary
                            border border-border dark:border-dark-border
                            w-fit
                        "
                    >
                        {tabs.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setCurr(item)}
                                className={`
                                    px-5 py-2 rounded-xl text-sm font-medium
                                    transition-all duration-200 cursor-pointer

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

                    {/* DOMAIN FILTER */}
                    <div className="flex items-center gap-3 ml-auto">

                        <select
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                            className="
                                px-4 py-2 rounded-xl
                                border border-border dark:border-dark-border
                                bg-card dark:bg-dark-card
                                text-foreground dark:text-dark-foreground
                                outline-none focus:ring-2 focus:ring-primary
                                min-w-[240px]
                                cursor-pointer
                            "
                        >
                            <option value="all">
                                All Domains
                            </option>

                            {domainOptions.map((item, index) => (
                                <option
                                    key={index}
                                    value={item}
                                >
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* ================= TABLE ================= */}
                <div
                    className="
                        rounded-2xl
                        border border-border dark:border-dark-border
                        bg-card dark:bg-dark-card
                        overflow-hidden
                    "
                >

                    {/* ================= TABLE HEADER ================= */}
                    <div
                        className="
                            grid grid-cols-5 gap-4
                            px-6 py-4
                            border-b border-border dark:border-dark-border
                            bg-secondary dark:bg-dark-secondary
                            text-sm font-semibold
                            text-secondary-foreground dark:text-dark-secondary-foreground
                        "
                    >
                        <p>Name</p>
                        <p>Email</p>
                        <p>Domain</p>
                        <p>Status</p>
                        <p>Actions</p>
                    </div>

                    {/* ================= LOADING ================= */}
                    {loading && (
                        <div className="p-10 text-center">
                            <p className="text-muted-foreground dark:text-dark-muted-foreground">
                                Loading applications...
                            </p>
                        </div>
                    )}

                    {/* ================= ERROR ================= */}
                    {!loading && error && (
                        <div className="p-10 text-center">
                            <p className="text-red-500">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* ================= APPLICATIONS ================= */}
                    {!loading &&
                        !error &&
                        applications.length > 0 && (
                            <div className="divide-y divide-border dark:divide-dark-border">

                                {applications.map((application) => (
                                    <ApplicationCard
                                        key={application._id}
                                        application={application}
                                        curr={curr}
                                    />
                                ))}
                            </div>
                        )}

                    {/* ================= EMPTY ================= */}
                    {!loading &&
                        !error &&
                        applications.length === 0 && (
                            <div className="p-10 text-center">

                                <h2
                                    className="
                                        text-lg font-semibold
                                        text-foreground dark:text-dark-foreground
                                    "
                                >
                                    No Applications Found
                                </h2>

                                <p
                                    className="
                                        mt-2 text-sm
                                        text-muted-foreground dark:text-dark-muted-foreground
                                    "
                                >
                                    Applications matching the selected filters
                                    will appear here.
                                </p>
                            </div>
                        )}
                </div>

                {/* ================= PAGINATION ================= */}
                <div
                    className="
                        flex flex-col md:flex-row
                        items-center justify-between
                        gap-4
                    "
                >

                    {/* TOTAL */}
                    <p
                        className="
                            text-sm
                            text-muted-foreground dark:text-dark-muted-foreground
                        "
                    >
                        Total Applications:{" "}
                        <span className="font-semibold text-foreground dark:text-dark-foreground">
                            {totalApplications}
                        </span>
                    </p>

                    {/* BUTTONS */}
                    <div className="flex items-center gap-3">

                        {/* PREVIOUS */}
                        <button
                            onClick={handlePrev}
                            disabled={page === 1}
                            className="
                                px-4 py-2 rounded-xl
                                border border-border dark:border-dark-border
                                bg-card dark:bg-dark-card
                                text-foreground dark:text-dark-foreground
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                hover:bg-secondary dark:hover:bg-dark-secondary
                                transition-all duration-200
                                cursor-pointer
                            "
                        >
                            Previous
                        </button>

                        {/* PAGE INFO */}
                        <div
                            className="
                                px-4 py-2 rounded-xl
                                bg-secondary dark:bg-dark-secondary
                                text-sm font-medium
                                text-secondary-foreground dark:text-dark-secondary-foreground
                            "
                        >
                            Page {page} of {totalPages}
                        </div>

                        {/* NEXT */}
                        <button
                            onClick={handleNext}
                            disabled={page === totalPages}
                            className="
                                px-4 py-2 rounded-xl
                                border border-border dark:border-dark-border
                                bg-card dark:bg-dark-card
                                text-foreground dark:text-dark-foreground
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                                hover:bg-secondary dark:hover:bg-dark-secondary
                                transition-all duration-200
                                cursor-pointer
                            "
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ApplicationDashboard;