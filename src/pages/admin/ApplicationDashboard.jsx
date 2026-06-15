import React, { useEffect, useState } from "react";
import axios from "axios";

import Slider from '../../components/admin/slider'
import Paginator from "../../components/ui/Paginator";
import DropDown from "../../components/ui/DropDown";

import { fetchApplications } from "../../controllers/admin/ApplicationDashBoard";
import AdminLayout from "../../components/admin/adminLayout";
import ApplicationCard from "../../components/admin/applicationCard";
import TableHeader from "../../components/TableHeader";

const ApplicationDashboard = () => {
    // ================= FILTER OPTIONS =================
    const tabs = ["Applied", "On Hold", "Rejected", "Selected"];

    // ================= STATE =================
    const [curr, setCurr] = useState(() => {
        const saved = localStorage.getItem("admin_app_slider");
        return tabs.includes(saved) ? saved : "Applied";
    });
    const [domain, setDomain] = useState("All Domains");

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ================= PAGINATION =================
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const [totalPages, setTotalPages] = useState(1);
    const [totalApplications, setTotalApplications] = useState(0);

    useEffect(() => {
        localStorage.setItem("admin_app_slider", curr);
    }, [curr]);

    const domainOptions = [
        "All Domains",
        "Web Development",
        "AI / Machine Learning",
        "Cybersecurity",
        "Mobile App Development",
    ];


    // ================= FETCH ON CHANGE =================
    useEffect(() => {
        fetchApplications({
            page,
            limit,
            curr,
            domain,
            setLoading,
            setError,
            setApplications,
            setTotalPages,
            setTotalApplications,
        });
    }, [page, domain, curr]);

    // ================= RESET PAGE =================
    useEffect(() => { setPage(1); }, [domain, curr]);



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
                    <Slider type={tabs} curr={curr} setCurr={setCurr} setPage={setPage} />


                    <DropDown value={domain} setValue={setDomain} options={domainOptions} />
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
                <div className="flex flex-col md:flex-row items-center justify-between  gap-4 "   >

                    {/* TOTAL */}
                    <p className="  text-sm text-muted-foreground dark:text-dark-muted-foreground "   >
                        Total Applications:{" "}
                        <span className="font-semibold text-foreground dark:text-dark-foreground">
                            {totalApplications}
                        </span>
                    </p>

                    <Paginator page={page} setPage={setPage} totalPages={totalPages} />
                </div>
            </div>
        </AdminLayout>
    );
};

export default ApplicationDashboard;