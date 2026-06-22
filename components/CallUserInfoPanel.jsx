"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hook";
import { userProfileApi } from "@/utils/userProfileApi";

function Icon({ type }) {
    const icons = {
        back: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
            </svg>
        ),
        profile: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        doc: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
            </svg>
        ),
    };

    return icons[type] || null;
}

function getInitials(name = "User") {
    return name
        .split(" ")
        .map((item) => item[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

export default function CallUserInfoPanel({
    userType,
    userId,
    backHref,
    profileHref,
}) {
    const token = useAppSelector((state) => state.auth.accessToken);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token || !userId || !userType) return;

        let ignore = false;

        async function loadProfile() {
            try {
                setError("");

                const result =
                    userType === "PATIENT"
                        ? await userProfileApi.getPatient(token, userId)
                        : await userProfileApi.getDoctor(token, userId);

                if (!ignore) {
                    setProfile(result.data);
                }
            } catch (err) {
                if (!ignore) {
                    setError(err.message || "Failed to load profile");
                }
            }
        }

        loadProfile();

        return () => {
            ignore = true;
        };
    }, [token, userId, userType]);

    const data = useMemo(() => {
        if (!profile) return null;

        if (userType === "PATIENT") {
            return {
                name: profile.fullName || "Patient",
                subtitle: `${profile.age || "N/A"} Years, ${profile.gender || "N/A"}`,
                codeLabel: "Patient ID",
                code: profile.patientCode || profile.id,
                onlineLabel: profile.status === "ACTIVE" ? "Online" : "Offline",
                buttonText: "View Full Profile",
                summary: [
                    { key: "Gender", val: profile.gender || "N/A" },
                    { key: "Blood Group", val: profile.bloodGroup || "N/A" },
                    {
                        key: "Date of Birth",
                        val: profile.dateOfBirth
                            ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
                            : "N/A",
                    },
                    { key: "Address", val: profile.address || "N/A" },
                    { key: "Nationality", val: profile.nationality || "Bangladeshi" },
                ],
            };
        }

        return {
            name: profile.fullName || "Doctor",
            subtitle:
                profile.specialization?.name ||
                profile.subSpecialization ||
                "Specialist",
            codeLabel: "Doctor ID",
            code: profile.doctorCode || profile.id,
            onlineLabel: profile.onlineStatus === "ONLINE" ? "Online" : "Offline",
            buttonText: "View Doctor Profile",
            summary: [
                { key: "BMDC Number", val: profile.bmdcNumber || "N/A" },
                { key: "Qualification", val: profile.qualification || "N/A" },
                { key: "Experience", val: profile.experienceYears ? `${profile.experienceYears} Years` : "N/A" },
                { key: "Gender", val: profile.gender || "N/A" },
            ],
        };
    }, [profile, userType]);

    if (!data) {
        return (
            <div className="call-patient-panel">
                <Link href={backHref} className="call-back-link">
                    <Icon type="back" /> Back to Messages
                </Link>

                <div className="call-empty-state">
                    {error || "Loading profile..."}
                </div>
            </div>
        );
    }

    return (
        <div className="call-patient-panel">
            <Link href={backHref} className="call-back-link">
                <Icon type="back" /> Back to Messages
            </Link>

            <div className="call-patient-info-card">
                <div className="call-patient-avatar">
                    <span>{getInitials(data.name)}</span>
                </div>

                <div className="call-patient-meta">
                    <h3>{data.name}</h3>
                    <p>{data.subtitle}</p>
                    <p>
                        {data.codeLabel}: {data.code}
                    </p>

                    <span className="call-patient-online">
                        <span className="call-patient-online-dot" /> {data.onlineLabel}
                    </span>
                </div>
            </div>

            <div className="call-patient-actions">
                <Link
                    href={profileHref}
                    className="call-patient-btn"
                    style={{
                        flex: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        textDecoration: "none",
                        justifyContent: "center",
                    }}
                >
                    <Icon type="profile" /> {data.buttonText}
                </Link>
            </div>

            <div>
                <p className="call-section-label">
                    {userType === "PATIENT" ? "Patient Summary" : "Doctor Summary"}
                </p>

                {data.summary.map((row) => (
                    <div key={row.key} className="call-summary-row">
                        <span className="call-summary-key">{row.key}</span>
                        <span className="call-summary-val">{row.val}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}