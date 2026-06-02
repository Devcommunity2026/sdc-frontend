// api/application.js

import axios from "axios";

export const fetchApplications = async ({
    page,
    limit,
    curr,
    domain,
    setLoading,
    setError,
    setApplications,
    setTotalPages,
    setTotalApplications,
}) => {
    try {
        setLoading(true);
        setError("");

        let url = `http://localhost:3000/mod/application?page=${page}&limit=${limit}`;

        url += `&status=${encodeURIComponent(curr)}`;

        if (domain !== "All Domains") {
            url += `&domain=${encodeURIComponent(domain)}`;
        }

        const res = await axios.get(url, {
            withCredentials: true,
        });

        const apps =
            res.data.applications ||
            res.data.data ||
            res.data ||
            [];

        setApplications(Array.isArray(apps) ? apps : []);

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
        setError(
            err.response?.data?.message ||
            "Failed to fetch applications"
        );
        setApplications([]);
    } finally {
        setLoading(false);
    }
};