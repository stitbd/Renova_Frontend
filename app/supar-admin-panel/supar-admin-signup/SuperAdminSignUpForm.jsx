"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./super-admin-signup.css";
import {
    User,
    Mail,
    Phone,
    Lock,
    Briefcase,
    Key,
    ChevronDown,
    Shield,
    CheckCircle,
    Settings,
    LayoutDashboard,
    Eye,
    EyeOff,
    AlertCircle
} from "lucide-react";

/* ── reusable primitives ───────────────────────────────────────── */
function Field({ label, required, note, children, className = "" }) {
    return (
        <div className={`sa-field ${className}`}>
            <label className="sa-label">
                {label}
                {note && <span className="sa-label-note"> {note}</span>}
                {required && <span className="required"> *</span>}
            </label>
            {children}
        </div>
    );
}

function Input({ icon: IconComp, noIcon, ...props }) {
    return (
        <div className="sa-input-wrap">
            {IconComp && !noIcon && (
                <span className="sa-input-icon">
                    <IconComp size={14} />
                </span>
            )}
            <input className={`sa-input${noIcon || !IconComp ? " no-icon" : ""}`} {...props} />
        </div>
    );
}

function Select({ icon: IconComp, children, ...props }) {
    return (
        <div className="sa-input-wrap sa-select-wrap">
            {IconComp && (
                <span className="sa-input-icon">
                    <IconComp size={14} />
                </span>
            )}
            <select className="sa-input sa-select" {...props}>
                {children}
            </select>
            <span className="sa-select-chevron">
                <ChevronDown size={13} />
            </span>
        </div>
    );
}

/* ── main component ────────────────────────────────────────────── */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.0.164:5001/api/v1";

const initialFormData = {
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    designation: "",
    accessCode: "",
};

export default function SuperAdminSignUpForm() {
    const router = useRouter();
    const [formData, setFormData] = useState(initialFormData);
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const set = (field) => (e) =>
        setFormData((p) => ({ ...p, [field]: e.target.value }));

    const resetForm = () => {
        setFormData(initialFormData);
        setAgreed(false);
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const bdMobileRegex = /^(?:\+?88)?01[3-9]\d{8}$/;

        if (!formData.fullName.trim()) return "Full name is required.";
        if (!formData.email.trim() || !emailRegex.test(formData.email.trim()))
            return "Please enter a valid email address.";
        if (!formData.mobile.trim() || !bdMobileRegex.test(formData.mobile.trim()))
            return "Please enter a valid Bangladeshi mobile number.";
        if (!formData.password || formData.password.length < 8)
            return "Password must be at least 8 characters.";
        if (formData.password !== formData.confirmPassword)
            return "Passwords do not match.";
        if (!formData.designation) return "Please select a designation.";
        if (!formData.accessCode.trim())
            return "Admin access code is required.";
        if (!agreed) return "Please agree to the Terms & Conditions to proceed.";

        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (loading) return;

        const validationMessage = validateForm();
        if (validationMessage) {
            setError(validationMessage);
            return;
        }

        const payload = {
            fullName: formData.fullName.trim(),
            email: formData.email.trim().toLowerCase(),
            mobile: formData.mobile.trim(),
            password: formData.password,
            designation: formData.designation,
            accessCode: formData.accessCode.trim(),
        };

        try {
            setLoading(true);

            const response = await fetch(`${API_BASE_URL}/super-admin/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            let result = null;
            try {
                result = await response.json();
            } catch {
                result = null;
            }

            if (!response.ok || result?.success === false) {
                throw new Error(result?.message || "Registration failed. Please try again.");
            }

            resetForm();
            router.push("/supar-admin-panel/supar-admin-signin");

        } catch (err) {
            if (err instanceof TypeError) {
                setError("Unable to connect to the server. Please check your internet connection or API URL.");
                return;
            }
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sa-container">
            {/* Background Image */}
            <div className="sa-background">
                <Image
                    src="/images/obg-login.jpg"
                    alt="Renova Life Care system administration"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                <div className="sa-overlay" />
            </div>

            {/* Main Card */}
            <div className="sa-card">

                {/* ── SIDEBAR ── */}
                <aside className="sa-sidebar">
                    <div className="sa-sidebar-top">
                        <div className="sa-sidebar-dots" />

                        <div className="sa-logo-section">
                            <div className="sa-logo-image-wrap">
                                <Image
                                    src="/images/logo.png"
                                    alt="Renova Life Care"
                                    width={200}
                                    height={200}
                                    priority
                                    className="sa-logo-image"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Wave divider */}
                    <div className="sa-sidebar-wave">
                        <svg viewBox="0 0 340 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="saWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#05417d" />
                                    <stop offset="50%" stopColor="#1a6faf" />
                                    <stop offset="100%" stopColor="#4caf50" />
                                </linearGradient>
                            </defs>
                            <path d="M0 0 L340 0 L340 20 Q270 60 170 35 Q80 12 0 50 Z" fill="#ffffff" />
                            <path d="M0 50 Q80 12 170 35 Q270 60 340 20 L340 60 L0 60 Z" fill="url(#saWaveGrad)" />
                        </svg>
                    </div>

                    {/* Bottom gradient section */}
                    <div className="sa-sidebar-bottom">
                        <svg className="sa-leaf-watermark" viewBox="0 0 80 110" fill="none">
                            <path d="M40 10 C10 30 5 70 30 95 C20 70 35 40 70 30 C50 20 40 10 40 10Z" fill="#ffffff" />
                            <path d="M40 10 L55 85" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>

                        <h2 className="sa-sidebar-title">System-Wide<br />Control Panel</h2>
                        <p className="sa-sidebar-subtitle">
                            Register a Super Admin account to manage outlets, doctors,
                            patients &amp; the entire platform.
                        </p>

                        <div className="sa-features">
                            <div className="sa-feature">
                                <div className="sa-feature-circle">
                                    <Shield size={26} />
                                </div>
                                <span className="sa-feature-label">Full<br />Access</span>
                            </div>
                            <div className="sa-feature">
                                <div className="sa-feature-circle">
                                    <Settings size={26} />
                                </div>
                                <span className="sa-feature-label">Total<br />Control</span>
                            </div>
                            <div className="sa-feature">
                                <div className="sa-feature-circle">
                                    <LayoutDashboard size={26} />
                                </div>
                                <span className="sa-feature-label">Live<br />Monitoring</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* ── FORM PANEL ── */}
                <main className="sa-panel">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="sa-form-header">
                            <div className="sa-form-header-top">
                                <div className="sa-header-icon">
                                    <Shield size={24} />
                                </div>
                                <h1 className="sa-form-title">Super Admin <span>Registration</span></h1>
                            </div>
                            <div className="sa-pulse-bar">
                                <div className="pbl" />
                                <svg viewBox="0 0 70 20" fill="none" width="70" height="20">
                                    <polyline
                                        points="0,10 12,10 17,2 22,18 27,4 32,16 37,10 50,10 55,6 60,10 70,10"
                                        stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
                                    />
                                </svg>
                                <div className="pbl" />
                            </div>
                        </div>

                        {error && (
                            <div className="sa-error" role="alert">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        {/* Account Information */}
                        <h3 className="sa-section-title">Account Information</h3>

                        <div className="sa-grid">
                            <Field label="Admin ID" note="(Auto-generated)">
                                <Input icon={User} value="SA-2025-000001" disabled readOnly />
                            </Field>
                            <Field label="Full Name" required>
                                <Input
                                    icon={User}
                                    type="text"
                                    placeholder="Enter full name"
                                    value={formData.fullName}
                                    onChange={set("fullName")}
                                    required
                                />
                            </Field>
                        </div>

                        <div className="sa-grid">
                            <Field label="Email Address" required>
                                <Input
                                    icon={Mail}
                                    type="email"
                                    placeholder="Enter email address"
                                    value={formData.email}
                                    onChange={set("email")}
                                    required
                                />
                            </Field>
                            <Field label="Mobile Number (OTP)" required>
                                <div className="sa-otp-row">
                                    <Input
                                        icon={Phone}
                                        type="tel"
                                        placeholder="+880 1XXX-XXXXXX"
                                        value={formData.mobile}
                                        onChange={set("mobile")}
                                        required
                                    />
                                    <button type="button" className="sa-otp-btn">Send OTP</button>
                                </div>
                            </Field>
                        </div>

                        <div className="sa-grid">
                            <Field label="Password" required>
                                <Input
                                    icon={Lock}
                                    type="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={set("password")}
                                    required
                                />
                            </Field>
                            <Field label="Confirm Password" required>
                                <Input
                                    icon={Lock}
                                    type="password"
                                    placeholder="Re-enter password"
                                    value={formData.confirmPassword}
                                    onChange={set("confirmPassword")}
                                    required
                                />
                            </Field>
                        </div>

                        {/* Role & Access */}
                        <h3 className="sa-section-title">Role &amp; Access</h3>

                        <div className="sa-grid">
                            <Field label="Designation" required>
                                <Select
                                    icon={Briefcase}
                                    value={formData.designation}
                                    onChange={set("designation")}
                                    required
                                >
                                    <option value="" disabled>Select designation</option>
                                    <option value="super-admin">Super Admin</option>
                                    <option value="system-admin">System Admin</option>
                                    <option value="network-admin">Network Admin</option>
                                </Select>
                            </Field>
                            <Field label="Admin Access Code" required note="(Provided by IT)">
                                <div className="sa-access-wrap">
                                    <Input
                                        icon={Key}
                                        type="password"
                                        placeholder="Enter security access code"
                                        value={formData.accessCode}
                                        onChange={set("accessCode")}
                                        required
                                    />
                                </div>
                            </Field>
                        </div>

                        {/* Verification banner */}
                        <div className="sa-verify-banner">
                            <div className="sa-verify-icon">
                                <Shield size={28} />
                            </div>
                            <div className="sa-verify-text">
                                <h4>Restricted access registration.</h4>
                                <p>
                                    Super Admin accounts require a valid access code issued by
                                    your IT department. All activity is logged and monitored.
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="sa-signup__footer">
                            <label className="sa-signup__agree">
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                />
                                I agree to the{" "}
                                <a href="/terms" target="_blank" rel="noreferrer">Terms &amp; Conditions</a>{" "}
                                and{" "}
                                <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> *
                            </label>
                            <button
                                type="submit"
                                className="sa-signup__btn-submit"
                                disabled={!agreed || loading}
                            >
                                <CheckCircle size={18} />
                                {loading ? "Submitting..." : "Create Account"}
                            </button>
                        </div>
                    </form>

                    <div className="sa-help">
                        Already have an account?{" "}
                        <a href="/supar-admin-panel/supar-admin-signin">Sign in here</a>
                    </div>

                    {/* Security notice */}
                    <div className="sa-security-notice">
                        <Shield size={14} />
                        <span>Your connection is secure. All data is encrypted end-to-end.</span>
                    </div>
                </main>
            </div>
        </div>
    );
}