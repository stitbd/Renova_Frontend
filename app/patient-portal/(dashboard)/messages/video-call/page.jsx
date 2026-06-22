"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "../patient-massages.css";
import { useCall } from "@/providers/CallProvider";
import CallUserInfoPanel from "@/components/CallUserInfoPanel";

const recentReports = [
    { name: "Full Body Check-up", date: "12 May 2025" },
    { name: "Chest X-Ray", date: "10 May 2025" },
    { name: "ECG Report", date: "09 May 2025" },
    { name: "Blood Test", date: "08 May 2025" },
];

const prevPrescriptions = [
    { label: "Dr. Ahsan Rahman", date: "10 May 2025", sub: "Medicine for BP & Chest pain" },
];

const summaryRows = [
    { key: "Blood Group", val: "B+" },
    { key: "Height / Weight", val: "5'8\" / 72 kg" },
    { key: "Allergies", val: "No Known Allergies" },
    { key: "Chronic Condition", val: "Hypertension" },
];

const chatMessages = [
    { id: 1, from: "doctor", text: "Hello Masud, How are you feeling now?", time: "10:31 AM" },
    { id: 2, from: "patient", text: "I am better than before, but still have slight pain.", time: "10:32 AM" },
    { id: 3, from: "doctor", text: "Okay. I have reviewed your reports. Let me explain.", time: "10:32 AM" },
];

const attachOptions = [
    { label: "Image", color: "green", icon: "image" },
    { label: "Document", color: "blue", icon: "doc" },
    { label: "Lab Report", color: "orange", icon: "labReport" },
    { label: "Prescription", color: "indigo", icon: "rx" },
];

function Icon({ type }) {
    const icons = {
        back: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>,
        user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
        phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12 19.79 19.79 0 0 1 1 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
        profile: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
        doc: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
        rx: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" /></svg>,
        mic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>,
        video: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>,
        videooff: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10" /><line x1="1" y1="1" x2="23" y2="23" /></svg>,
        screen: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
        chat: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>,
        files: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>,
        morevert: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>,
        endcall: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.42 19.42 0 0 1 4.36 4.36" /><path d="M22 2 2 22" /></svg>,
        expand: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>,
        shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
        send: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>,
        tick: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>,
        history: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
        arrowright: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
        prescription: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" /></svg>,
        schedule: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
        bandwidth: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
        headphone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" /><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>,
        adaptive: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
        image: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
        attach: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>,
        rotateCamera: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h4l2-2h4l2 2h4a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-4" /><path d="M8 17H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1" /><path d="M15 10a4 4 0 0 1 0 8" /><polyline points="15 18 15 14 19 14" /><path d="M9 14a4 4 0 0 1 0-8" /><polyline points="9 6 9 10 5 10" /></svg>,
        labReport: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0-6 7h18l-6-7" /></svg>,
    };
    return <>{icons[type] || null}</>;
}

function Toggle({ checked, onChange }) {
    return (
        <label className="toggle-switch">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="toggle-slider"></span>
        </label>
    );
}

export default function VideoCallPage() {
    const call = useCall();
    const callSession = call?.activeCall;
    const isJoined = call?.isJoined;
    const isCallAccepted = call?.isCallAccepted;
    const isMuted = call?.isMuted;
    const isVideoOff = call?.isVideoOff;
    const error = call?.error;
    const toggleMute = call?.toggleMute;
    const toggleVideo = call?.toggleVideo;
    const endCall = call?.endCall;
    const formatDuration = call?.formatDuration;





    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();


    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    useEffect(() => {
        if (!call?.activeCall) return;

        call.attachVideoContainers(localVideoRef.current, remoteVideoRef.current);
    }, [call?.activeCall, call?.isJoined]);

    useEffect(() => {
        if (!call?.activeCall) {
            router.replace("/patient-portal/messages");
        }
    }, [call?.activeCall, router]);

    useEffect(() => {
        if (!call?.isJoined || !call?.isCallAccepted) return;

        call.restartRemoteAudio?.();
    }, [call?.isJoined, call?.isCallAccepted]);


    return (
        <div className="call-page-shell">
            <div className="call-page-layout">
                {/* ── Left: Patient Panel ────────────────────────── */}
                <CallUserInfoPanel
                    userType="DOCTOR"
                    userId={callSession?.receiverId || callSession?.callerId}
                    backHref="/patient-portal/messages"
                    profileHref={`/patient-portal/doctors/doctor-profile?id=${callSession?.receiverId || callSession?.callerId}&from=/patient-portal/messages`}
                />

                {/* ── Middle: Video ─────────── */}
                <div className="call-center-col">

                    {/* Video display */}
                    <div className="video-call-display" style={isExpanded ? { position: "fixed", inset: 0, margin: 0, borderRadius: 0, zIndex: 1000, width: "100vw", height: "100vh" } : {}}>
                        <div className="video-main-area">

                            {/* Full-cover patient video */}
                            <div ref={remoteVideoRef} className="agora-remote-video" />

                            {!isJoined && (
                                <div className="video-waiting-text">
                                    Connecting...
                                </div>
                            )}

                            {!isCallAccepted && (
                                <div className="video-waiting-text">Ringing...</div>
                            )}

                            {error && (
                                <div className="video-waiting-text">
                                    {error}
                                </div>
                            )}

                            {/* Patient label — top left */}
                            <div className="video-patient-label">
                                Patient
                                <span className="video-signal-bars">
                                    <span /><span /><span /><span />
                                </span>
                            </div>

                            {/* Doctor PiP — top right */}
                            <div className="video-pip">
                                <div ref={localVideoRef} className="agora-local-video" />
                                <div className="video-pip-label">
                                    <span className="video-pip-online-dot" />
                                    You
                                </div>
                            </div>

                            {/* Call Duration — above controls bar */}
                            <div className="video-call-duration">
                                <span className="video-call-duration-dot" />
                                {formatDuration()}
                            </div>

                            {/* Controls bar — inside video, bottom center, pill shape */}
                            <div className="video-controls-bar">
                                <button className="video-ctrl-btn" onClick={toggleMute}>
                                    <div className="video-ctrl-icon">
                                        <Icon type="mic" />
                                    </div>
                                    <span className="video-ctrl-label">
                                        {isMuted ? "Unmute" : "Mute"}
                                    </span>
                                </button>

                                <button className="video-ctrl-btn" onClick={toggleVideo}>
                                    <div className="video-ctrl-icon">
                                        <Icon type="video" />
                                    </div>
                                    <span className="video-ctrl-label">
                                        {isVideoOff ? "Start Video" : "Stop Video"}
                                    </span>
                                </button>

                                <div className="video-ctrl-divider" />

                                <button className="video-ctrl-btn" onClick={endCall}>
                                    <div className="video-ctrl-icon end-call">
                                        <Icon type="endcall" />
                                    </div>
                                    <span className="video-ctrl-label">End Call</span>
                                </button>

                                <div className="video-ctrl-divider" />

                            </div>

                            {/* Expand — bottom right */}
                            <button className="video-expand-btn" onClick={() => setIsExpanded(prev => !prev)}>
                                {isExpanded ? (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" width="14" height="14">
                                        <polyline points="4 14 10 14 10 20" />
                                        <polyline points="20 10 14 10 14 4" />
                                        <line x1="10" y1="14" x2="3" y2="21" />
                                        <line x1="21" y1="3" x2="14" y2="10" />
                                    </svg>
                                ) : (
                                    <Icon type="expand" />
                                )}
                            </button>

                        </div>
                    </div>

                    <div className="video-footer-note">
                        All data is encrypted and stored securely. This consultation is subject to our <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>.
                    </div>
                </div>

                {/* ── Right Panel ────────────────────────────────── */}
                <CallRightPanel
                    receiverId={callSession?.receiverId || callSession?.callerId}
                    appointmentId={callSession?.appointmentId}
                />
            </div>
        </div>
    );
}