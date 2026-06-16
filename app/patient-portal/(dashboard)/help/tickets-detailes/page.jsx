"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, ArrowLeft, Clock, Tag, AlertCircle, MessageSquare, Paperclip, Send } from "lucide-react";
import { useState, Suspense } from "react";
import "./tickets-detailes.css";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } }
};
const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const mockReplies = [
    {
        sender: "Support Agent",
        avatar: "SA",
        role: "agent",
        time: "Jun 14, 2026 • 10:32 AM",
        message: "Hello! Thank you for reaching out. We have received your ticket and are currently investigating the issue. Could you please provide your transaction ID so we can look into this further?"
    },
    {
        sender: "You",
        avatar: "ME",
        role: "user",
        time: "Jun 14, 2026 • 11:05 AM",
        message: "Sure, my transaction ID is TXN-884521. The amount was deducted but the appointment was not confirmed."
    },
    {
        sender: "Support Agent",
        avatar: "SA",
        role: "agent",
        time: "Jun 14, 2026 • 11:48 AM",
        message: "Thank you for the details. We have escalated this to our payments team. You should receive an update within 24 hours. We apologize for the inconvenience."
    }
];

function TicketDetailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const ticketId = searchParams.get("id") || "#SUP-1005";
    const [replyText, setReplyText] = useState("");
    const [replies, setReplies] = useState(mockReplies);
    const [sent, setSent] = useState(false);

    const allTickets = typeof window !== "undefined"
        ? JSON.parse(sessionStorage.getItem("allTickets") || "[]")
        : [];

    const ticket = allTickets.find(t => t.id === ticketId) || {
        id: ticketId,
        subject: "Payment Issue for Consultation",
        date: "Jun 14, 2026",
        status: "Open",
        priority: "High",
        category: "Payment",
    };

    const handleSendReply = () => {
        if (!replyText.trim()) return;
        setReplies(prev => [...prev, {
            sender: "You",
            avatar: "ME",
            role: "user",
            time: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
            message: replyText.trim()
        }]);
        setReplyText("");
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    return (
        <motion.div className="td-page" variants={container} initial="hidden" animate="show">

            {/* Header */}
            <motion.div className="td-header" variants={item}>
                <button className="td-btn-back" onClick={() => router.back()}>
                    <ArrowLeft size={15} /> Back
                </button>
                <div className="td-header-text">
                    <h2 className="td-title">Ticket Details</h2>
                    <span className="td-ticket-id">{ticket.id}</span>
                </div>
                <span className={`td-status-badge td-status-${ticket.status.toLowerCase()}`}>
                    <span className="td-status-dot" />
                    {ticket.status}
                </span>
            </motion.div>

            {/* Info Cards */}
            <motion.div className="td-info-grid" variants={item}>
                <div className="td-info-card">
                    <div className="td-info-icon td-icon-blue"><Tag size={15} /></div>
                    <div>
                        <p className="td-info-label">Category</p>
                        <p className="td-info-value">{ticket.category || "Payment"}</p>
                    </div>
                </div>
                <div className="td-info-card">
                    <div className="td-info-icon td-icon-amber"><AlertCircle size={15} /></div>
                    <div>
                        <p className="td-info-label">Priority</p>
                        <p className={`td-priority td-priority-${ticket.priority.toLowerCase()}`}>{ticket.priority}</p>
                    </div>
                </div>
                <div className="td-info-card">
                    <div className="td-info-icon td-icon-slate"><Clock size={15} /></div>
                    <div>
                        <p className="td-info-label">Created</p>
                        <p className="td-info-value">{ticket.date}</p>
                    </div>
                </div>
                <div className="td-info-card">
                    <div className="td-info-icon td-icon-purple"><MessageSquare size={15} /></div>
                    <div>
                        <p className="td-info-label">Replies</p>
                        <p className="td-info-value">{replies.length} messages</p>
                    </div>
                </div>
            </motion.div>

            {/* Subject */}
            <motion.div className="td-subject-card" variants={item}>
                <p className="td-subject-label">Subject</p>
                <p className="td-subject-text">{ticket.subject}</p>
            </motion.div>

            {/* Conversation */}
            <motion.div className="td-conversation" variants={item}>
                <h3 className="td-section-title">Conversation</h3>
                <div className="td-messages">
                    {replies.map((r, idx) => (
                        <motion.div
                            key={idx}
                            className={`td-message td-message-${r.role}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <div className={`td-avatar td-avatar-${r.role}`}>{r.avatar}</div>
                            <div className="td-message-body">
                                <div className="td-message-meta">
                                    <span className="td-message-sender">{r.sender}</span>
                                    <span className="td-message-time">{r.time}</span>
                                </div>
                                <div className={`td-message-bubble td-bubble-${r.role}`}>
                                    {r.message}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Reply Box */}
                {ticket.status !== "Closed" && (
                    <div className="td-reply-box">
                        <textarea
                            className="td-reply-input"
                            rows={3}
                            placeholder="Write your reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                        />
                        <div className="td-reply-footer">
                            <label className="td-attach-btn">
                                <input type="file" hidden accept=".jpg,.jpeg,.png,.pdf" />
                                <Paperclip size={15} /> Attach File
                            </label>
                            <button
                                className="td-send-btn"
                                onClick={handleSendReply}
                                disabled={!replyText.trim()}
                            >
                                <Send size={14} /> Send Reply
                            </button>
                        </div>
                        {sent && <p className="td-sent-msg">✓ Reply sent successfully.</p>}
                    </div>
                )}

                {ticket.status === "Closed" && (
                    <div className="td-closed-notice">
                        This ticket is closed. <button onClick={() => router.push("/patient-portal/help#support-form")}>Open a new ticket</button> if you need further help.
                    </div>
                )}
            </motion.div>

        </motion.div>
    );
}

export default function TicketDetailsPage() {
    return (
        <Suspense fallback={<div style={{ padding: "24px", color: "#64748b" }}>Loading...</div>}>
            <TicketDetailContent />
        </Suspense>
    );
}