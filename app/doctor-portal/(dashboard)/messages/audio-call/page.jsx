"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "../doctor-dashboard-massages.css";

const recentReports = [
    { name: "Full Body Check-up", date: "12 May 2025" },
    { name: "Chest X-Ray", date: "10 May 2025" },
    { name: "ECG Report", date: "09 May 2025" },
    { name: "Blood Test", date: "08 May 2025" },
];

const prevPrescriptions = [
    { label: "10 May 2025", sub: "Medicine for BP & Chest pain" },
    { label: "25 Apr 2025", sub: "Regular follow up" },
];

const chatMessages = [
    { id: 1, from: "doctor", name: "Dr. Ahsan Rahman", text: "Hello Masud, how are you feeling now?", time: "10:31 AM" },
    { id: 2, from: "patient", name: "Masud Rana", text: "I am better than before, but still have slight pain.", time: "10:32 AM" },
    { id: 3, from: "doctor", name: "Dr. Ahsan Rahman", text: "Okay. I have reviewed your reports. Let me explain.", time: "10:33 AM" },
];

function Icon({ type }) {
    const icons = {
        back: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>,
        user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
        phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12 19.79 19.79 0 0 1 1 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
        profile: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
        doc: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
        rx: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" /></svg>,
        shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
        mic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>,
        keypad: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="6" r="1" /><circle cx="15" cy="6" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="9" cy="18" r="1" /><circle cx="15" cy="18" r="1" /></svg>,
        endcall: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.42 19.42 0 0 1 4.36 4.36" /><path d="M22 2 2 22" /></svg>,
        speaker: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>,
        morevert: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>,
        video: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>,
        settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
        note: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
        history: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
        reminder: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
        file: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
        send: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>,
        attach: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>,
        bandwidth: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
        recording: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></svg>,
        headphone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>,
        tick: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>,
    };
    return <>{icons[type] || null}</>;
}

// Toggle component
function Toggle({ checked, onChange }) {
    return (
        <label className="toggle-switch">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="toggle-slider"></span>
        </label>
    );
}

export default function AudioCallPage() {
    const [activeTab, setActiveTab] = useState("Chat");
    const [seconds, setSeconds] = useState(504); // 8:24
    const [lowBandwidth, setLowBandwidth] = useState(false);
    const [audioFirst, setAudioFirst] = useState(false);
    const [recording, setRecording] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    const fmt = (s) => {
        const m = Math.floor(s / 60).toString().padStart(2, "0");
        const sec = (s % 60).toString().padStart(2, "0");
        return `${m}:${sec}`;
    };

    return (
        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
            {/* Custom Topbar */}
            {/* <div className="call-topbar" style={{ margin: "-18px -22px 0", borderRadius: 0 }}>
                <div className="call-topbar-left">
                    <h2 className="call-topbar-title">Audio Consultation</h2>
                    <span className="call-live-badge">
                        <span className="call-live-dot" /> Live
                    </span>
                </div>
                <div className="call-topbar-stats">
                    <div className="call-stat-item">
                        <span className="call-stat-label">Call Duration</span>
                        <span className="call-stat-value">{fmt(seconds)}</span>
                    </div>
                    <div className="call-stat-item">
                        <span className="call-stat-label">Network</span>
                        <span className="call-stat-value green" style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <span className="call-network-bars">
                                <span /><span /><span /><span />
                            </span>
                            Good
                        </span>
                    </div>
                    <div className="call-stat-item">
                        <span className="call-stat-label">Recording</span>
                        <span className="call-stat-value red" style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                            On
                        </span>
                    </div>
                </div>
                <button className="call-end-btn">
                    End Call
                </button>
            </div> */}

            <div className="call-page-layout" style={{ marginTop: 0 }}>
                {/* ── Left: Patient Panel ────────────────────────── */}
                <div className="call-patient-panel">
                    <Link href="/doctor-portal/messages" className="call-back-link">
                        <Icon type="back" /> Back to Messages
                    </Link>

                    <div className="call-patient-info-card">
                        <div className="call-patient-avatar">
                            <img
                                src="/images/patients/01.jpg"
                                alt="Masud Rana"
                                onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
                            />
                            <span style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}><Icon type="user" /></span>
                        </div>
                        <div className="call-patient-meta">
                            <h3>Masud Rana</h3>
                            <p>32 Years, Male</p>
                            <p>Patient ID: PT-2025-00123</p>
                            <span className="call-patient-online">
                                <span className="call-patient-online-dot" /> Online
                            </span>
                        </div>
                    </div>

                    <div className="call-patient-actions">
                        <button className="call-patient-btn">
                            <Icon type="profile" /> View Profile
                        </button>
                        <button className="call-patient-btn">
                            <Icon type="phone" />
                        </button>
                    </div>

                    {/* Consultation Reason */}
                    <div>
                        <p className="call-section-label">Consultation Reason</p>
                        <p className="call-reason-text">Chest pain, Breathing problem</p>
                        <p className="call-started-text">Started at 10:30 AM</p>
                    </div>

                    {/* Recent Reports */}
                    <div>
                        <div className="call-panel-list-header">
                            <p className="call-section-label" style={{ margin: 0 }}>Recent Reports</p>
                            <button className="call-view-all">View All</button>
                        </div>
                        <div className="call-panel-list">
                            {recentReports.map((r) => (
                                <div key={r.name} className="call-panel-item">
                                    <div className="call-panel-item-icon">
                                        <Icon type="doc" />
                                    </div>
                                    <div className="call-panel-item-info">
                                        <p className="call-panel-item-name">{r.name}</p>
                                        <p className="call-panel-item-date">{r.date}</p>
                                    </div>
                                    <button className="call-panel-view-btn">View</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Previous Prescriptions */}
                    <div>
                        <div className="call-panel-list-header">
                            <p className="call-section-label" style={{ margin: 0 }}>Previous Prescriptions</p>
                            <button className="call-view-all">View All</button>
                        </div>
                        <div className="call-panel-list">
                            {prevPrescriptions.map((p) => (
                                <div key={p.label} className="call-panel-item">
                                    <div className="call-panel-item-icon purple">
                                        <Icon type="rx" />
                                    </div>
                                    <div className="call-panel-item-info">
                                        <p className="call-panel-item-name">{p.label}</p>
                                        <p className="call-panel-item-date">{p.sub}</p>
                                    </div>
                                    <button className="call-panel-view-btn">View</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Middle: Audio Call Display ─────────────────── */}
                <div className="call-center-col">
                    {/* Audio display */}
                    <div className="audio-call-display">
                        {/* Top bar */}
                        <div className="audio-call-top-bar">
                            <div className="audio-call-label">
                                <Icon type="phone" /> Audio Call
                                <div className="audio-signal-bars">
                                    <span /><span /><span /><span />
                                </div>
                            </div>
                            <div className="audio-secure-text">
                                <Icon type="shield" /> Call is secured and encrypted
                            </div>
                        </div>

                        {/* Waveform + patient photo */}
                        <div className="audio-waveform-wrap">
                            <div className="audio-waveform active">
                                {[...Array(10)].map((_, i) => <span key={i} />)}
                            </div>
                            <div className="audio-patient-circle">
                                <img src="/images/patients/01.jpg" alt="Masud Rana" onError={(e) => { e.currentTarget.style.background = "#334155"; }} />
                            </div>
                            <div className="audio-waveform">
                                {[...Array(10)].map((_, i) => <span key={i} />)}
                            </div>
                        </div>

                        <p className="audio-patient-name">Masud Rana</p>
                        <p className="audio-patient-role">Patient</p>
                        <p className="audio-timer">{fmt(seconds)}</p>

                        <div className="audio-connection-status">
                            <span className="audio-connection-text">You are connected via audio</span>
                            <span className="audio-connection-quality">
                                <span /> Good Connection
                                <span className="call-network-bars" style={{ marginLeft: 4 }}>
                                    <span /><span /><span /><span />
                                </span>
                            </span>
                        </div>
                    </div>

                    {/* Controls bar — now inside audio-call-display */}
                    <div className="call-controls-bar">
                        {[
                            { icon: "mic", label: "Mute" },
                            { icon: "endcall", label: "End Call", end: true },
                            { icon: "speaker", label: "Speaker" },
                        ].map((btn) => (
                            <button key={btn.label} className="call-ctrl-btn">
                                <div className={`call-ctrl-icon${btn.end ? " end-call" : ""}`}>
                                    <Icon type={btn.icon} />
                                </div>
                                <span className="call-ctrl-label">{btn.label}</span>
                            </button>
                        ))}
                    </div>


                    <div className="video-footer-note">
                        All data is encrypted and stored securely. This consultation is subject to our <a href="#">Privacy Policy</a> and <a href="#">Terms</a>.
                    </div>
                </div>

                {/* ── Right: Chat / Files / Reports Panel ── */}
                <div className="call-right-panel">
                    {/* Tabs */}
                    <div className="call-right-tabs">
                        {["Chat", "Files", "Reports"].map((tab) => (
                            <button
                                key={tab}
                                className={`call-right-tab${activeTab === tab ? " active" : ""}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {activeTab === "Chat" && (
                        <>
                            <div className="call-chat-body">
                                <div className="call-chat-date">Today</div>
                                {chatMessages.map((msg) => {
                                    const isDoctor = msg.from === "doctor";
                                    return (
                                        <div key={msg.id} className={`call-chat-bubble-wrap${isDoctor ? " sent" : ""}`}>
                                            <div className="call-chat-avatar">
                                                <img
                                                    src={isDoctor ? "/images/doctors/doctor-1.jpg" : "/images/patients/01.jpg"}
                                                    alt={isDoctor ? "Doctor" : "Patient"}
                                                    onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
                                                />
                                                <span style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}><Icon type="user" /></span>
                                            </div>
                                            <div className="call-chat-bubble-inner">
                                                <span className="call-chat-sender-name">{msg.name}</span>
                                                <div className={`call-chat-bubble${isDoctor ? " sent" : ""}`}>
                                                    {msg.text}
                                                </div>
                                                <div className="call-chat-time">
                                                    {msg.time}
                                                    {isDoctor && <Icon type="tick" />}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="call-chat-input-wrap">
                                <div className="call-chat-input-row">
                                    <input type="text" placeholder="Type a message..." />
                                    <span className="call-chat-attach-icon">
                                        <Icon type="attach" />
                                    </span>
                                    <div className="call-chat-input-icon">
                                        <Icon type="send" />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab !== "Chat" && (
                        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontSize: 13 }}>
                            No {activeTab.toLowerCase()} available yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}