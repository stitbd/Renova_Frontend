// StaffFormComponents.jsx
import { useState } from "react";

function Icon({ n, s = 16, c = "currentColor" }) {
    const p = {
        user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
        mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
        phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
        calendar: "M3 4h18v18H3zM16 2v4M8 2v4M3 10h18",
        map: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7v.01",
        chevDown: "M6 9l6 6 6-6",
        eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 12m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0",
        eyeOff: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22",
        shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
        upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
        file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6",
        check: "M20 6 9 17l-5-5",
        back: "M19 12H5M12 19l-7-7 7-7",
        badge: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76zM9 12l2 2 4-4",
        staff: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm12 14v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    };
    return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d={p[n] || ""} />
        </svg>
    );
}

export function Field({ label, required, children, hint }) {
    return (
        <div className="field">
            <label className="field-label">{label} {required && <span className="required-star">*</span>}</label>
            {children}
            {hint && <span className="field-hint">{hint}</span>}
        </div>
    );
}

export function Input({ icon, ...props }) {
    const [focused, setFocused] = useState(false);
    if (icon) return (
        <div className="input-icon-wrapper">
            <span className="input-icon">
                <Icon n={icon} s={15} c={focused ? "#014fa1" : "#94a3b8"} />
            </span>
            <input {...props} onFocus={e => { setFocused(true); props.onFocus && props.onFocus(e); }} onBlur={e => { setFocused(false); props.onBlur && props.onBlur(e); }} className={`input-field ${focused ? "focused" : ""}`} style={{ paddingLeft: 34 }} />
        </div>
    );
    return <input {...props} onFocus={e => { setFocused(true); }} onBlur={() => setFocused(false)} className={`input-field ${focused ? "focused" : ""}`} />;
}

export function Select({ children, ...props }) {
    const [focused, setFocused] = useState(false);
    return (
        <div className="select-wrapper">
            <select {...props} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} className={`select-field ${focused ? "focused" : ""}`}>
                {children}
            </select>
            <span className="select-arrow"><Icon n="chevDown" s={15} c="#94a3b8" /></span>
        </div>
    );
}

export function Textarea({ ...props }) {
    const [focused, setFocused] = useState(false);
    return <textarea {...props} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} className={`textarea-field ${focused ? "focused" : ""}`} />;
}

export function Toggle({ checked, onChange, label, desc }) {
    return (
        <div className="toggle-wrapper">
            <div>
                <div className="toggle-label">{label}</div>
                {desc && <div className="toggle-desc">{desc}</div>}
            </div>
            <button onClick={() => onChange(!checked)} className={`toggle-btn ${checked ? "checked" : ""}`}>
                <div className="toggle-knob" />
            </button>
        </div>
    );
}

export function UploadBox({ label, sub, icon }) {
    const [hover, setHover] = useState(false);
    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={`upload-box ${hover ? "hover" : ""}`}>
            <div className="upload-icon-wrapper">
                <Icon n={icon || "upload"} s={22} c={hover ? "#014fa1" : "#6366f1"} />
            </div>
            <div className="upload-label">{label}</div>
            <div className="upload-sub">{sub}</div>
        </div>
    );
}

export function SectionCard({ title, icon, children }) {
    return (
        <div className="section-card">
            <div className="section-card-header">
                <Icon n={icon} s={17} c="#016a1f" />
                <span className="section-card-title">{title}</span>
            </div>
            <div className="section-card-body">{children}</div>
        </div>
    );
}

export function Grid2({ children }) {
    return <div className="grid-2">{children}</div>;
}

export function Grid3({ children }) {
    return <div className="grid-3">{children}</div>;
}

export function StatusBadge({ status }) {
    const map = {
        active: { class: "status-active", label: "Active" },
        inactive: { class: "status-inactive", label: "Inactive" },
        suspended: { class: "status-suspended", label: "Suspended" },
    };
    const s = map[status] || map.active;
    return (
        <span className={`status-badge ${s.class}`}>
            <span className="status-dot" /> {s.label}
        </span>
    );
}