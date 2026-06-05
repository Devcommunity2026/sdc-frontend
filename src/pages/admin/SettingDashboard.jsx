import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToggleLeft, ToggleRight, CheckCircle2, AlertTriangle, Settings } from 'lucide-react';
import AdminLayout from '../../components/admin/adminLayout';

const SettingDashboard = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [registrationOpen, setRegistrationOpen] = useState(true);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchStatus = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/api/admin/registration/status`, { withCredentials: true });
            if (res.data.success) {
                setRegistrationOpen(res.data.registrationOpen);
            }
        } catch (error) {
            console.error("Failed to fetch settings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    const handleToggle = async (openValue) => {
        try {
            setActionLoading(true);
            const endpoint = openValue ? 'enable' : 'disable';
            const res = await axios.post(
                `${API_URL}/api/admin/registration/${endpoint}`,
                {},
                { withCredentials: true }
            );
            if (res.data.success) {
                setRegistrationOpen(openValue);
                alert(res.data.message || "Settings updated successfully.");
            }
        } catch (error) {
            console.error("Failed to update registration status:", error);
            alert("Failed to update registration status. Please try again.");
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="w-full max-w-4xl mx-auto space-y-6 pb-10 px-4 md:px-0 text-left">
                {/* Title */}
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground dark:text-dark-foreground flex items-center gap-3">
                        <Settings className="text-primary dark:text-dark-primary" size={32} />
                        System Settings
                    </h1>
                    <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground mt-1">
                        Manage global platform configurations and operational control flags.
                    </p>
                </div>

                {/* Settings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card Container */}
                    <div className="rounded-3xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6 md:p-8 shadow-sm space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-foreground dark:text-dark-foreground">
                                Applicant Registration Control
                            </h2>
                            <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground mt-1 leading-relaxed">
                                Toggle whether the Careers application form is open and accessible to public users.
                            </p>
                        </div>

                        {/* Status Display */}
                        {loading ? (
                            <div className="flex items-center gap-2 text-muted-foreground py-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                <span className="text-sm font-medium">Checking current status...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 py-2">
                                <span className="text-sm font-semibold text-muted-foreground">Current Status:</span>
                                {registrationOpen ? (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary dark:bg-dark-primary/20 dark:text-dark-primary border border-primary/20">
                                        <CheckCircle2 size={12} />
                                        OPEN (ON)
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-danger/10 text-danger dark:bg-danger/20 dark:text-danger border border-danger/20">
                                        <AlertTriangle size={12} />
                                        CLOSED (OFF)
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Control Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <button
                                disabled={actionLoading || loading}
                                onClick={() => !registrationOpen && handleToggle(true)}
                                className={`
                                    flex-1 h-12 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all cursor-pointer
                                    ${registrationOpen 
                                        ? "bg-primary hover:opacity-95 text-primary-foreground dark:bg-dark-primary dark:text-dark-primary-foreground shadow-md cursor-default"
                                        : "bg-muted dark:bg-dark-muted text-muted-foreground border border-border dark:border-dark-border opacity-70 hover:opacity-100 hover:bg-primary/15 hover:text-primary active:scale-95"
                                    }
                                `}
                            >
                                <ToggleRight size={18} />
                                Registration ON
                            </button>

                            <button
                                disabled={actionLoading || loading}
                                onClick={() => registrationOpen && handleToggle(false)}
                                className={`
                                    flex-1 h-12 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all cursor-pointer
                                    ${!registrationOpen 
                                        ? "bg-primary hover:opacity-95 text-primary-foreground dark:bg-dark-primary dark:text-dark-primary-foreground shadow-md cursor-default"
                                        : "bg-muted dark:bg-dark-muted text-muted-foreground border border-border dark:border-dark-border opacity-70 hover:opacity-100 hover:bg-primary/15 hover:text-primary active:scale-95"
                                    }
                                `}
                            >
                                <ToggleLeft size={18} />
                                Registration OFF
                            </button>
                        </div>
                    </div>

                    {/* Placeholder Info Card */}
                    <div className="rounded-3xl border border-border dark:border-dark-border bg-card dark:bg-dark-card p-6 md:p-8 shadow-sm flex flex-col justify-between">
                        <div className="space-y-3">
                            <h3 className="font-bold text-lg text-foreground dark:text-dark-foreground">
                                System Status & Logs
                            </h3>
                            <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground leading-relaxed">
                                When registration is turned <strong className="text-foreground dark:text-dark-foreground">OFF</strong>, applicants trying to join will be blocked from accessing the Careers application form and will be prompted with a friendly "Registrations are currently closed." message.
                            </p>
                            <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground leading-relaxed">
                                Changes are applied in real-time across all public-facing routes. Ensure database integrity and configurations are verified before altering registration control.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default SettingDashboard;
