// OutletFormComponents.jsx
import { useState } from "react";
import {
    User,
    Mail,
    Phone,
    Calendar,
    MapPin,
    ChevronDown,
    Eye,
    EyeOff,
    Shield,
    Upload,
    File,
    Check,
    ArrowLeft,
    Award,
    Users,
    Lock,
    CheckCircle
} from "lucide-react";

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
    const IconComponent = icon ? {
        user: User,
        mail: Mail,
        phone: Phone,
        calendar: Calendar,
        map: MapPin,
        shield: Shield,
        lock: Lock,
        eye: Eye,
        eyeOff: EyeOff,
        award: Award,
        users: Users,
        check: Check,
        upload: Upload,
        file: File,
        arrowLeft: ArrowLeft
    }[icon] : null;

    if (icon && IconComponent) return (
        <div className="input-icon-wrapper">
            <span className="input-icon">
                <IconComponent size={15} color={focused ? "#014fa1" : "#94a3b8"} />
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
            <span className="select-arrow"><ChevronDown size={15} color="#94a3b8" /></span>
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
    const IconComponent = icon === "file" ? File : Upload;
    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={`upload-box ${hover ? "hover" : ""}`}>
            <div className="upload-icon-wrapper">
                <IconComponent size={22} color={hover ? "#014fa1" : "#6366f1"} />
            </div>
            <div className="upload-label">{label}</div>
            <div className="upload-sub">{sub}</div>
        </div>
    );
}

export function SectionCard({ title, icon, children }) {
    const IconComponent = {
        user: User,
        mail: Mail,
        phone: Phone,
        calendar: Calendar,
        map: MapPin,
        shield: Shield,
        lock: Lock,
        award: Award,
        users: Users,
        check: Check,
        upload: Upload,
        file: File,
        eye: Eye,
        eyeOff: EyeOff
    }[icon] || User;

    return (
        <div className="section-card">
            <div className="section-card-header">
                <IconComponent size={17} color="#016a1f" />
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