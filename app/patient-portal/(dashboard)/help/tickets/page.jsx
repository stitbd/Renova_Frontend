/* ======================================================
   JSX FILE: all-tickets.jsx
   All Support Tickets Page
   ====================================================== */

"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import "./all-tickets.css";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function AllTicketsPage() {
    const router = useRouter();
    const allTickets = typeof window !== "undefined"
        ? JSON.parse(sessionStorage.getItem("allTickets") || "[]")
        : [];

    return (
        <motion.div
            className="tickets-container"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <motion.div className="tickets-header" variants={item}>
                <button
                    onClick={() => router.back()}
                    className="btn-back"
                >
                    ← Back
                </button>
                <h2 className="tickets-title">All Support Tickets</h2>
            </motion.div>

            <motion.div className="tickets-table-wrapper" variants={item}>
                <table className="tickets-table">
                    <thead>
                        <tr>
                            {["SL No", "Ticket ID", "Subject", "Created Date", "Status", "Priority", "Action"].map((h) => (
                                <th key={h}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {allTickets.length === 0 ? (
                            <tr>
                                <td colSpan={7}>
                                    <div className="empty-state-tickets">
                                        <div className="empty-icon">🎫</div>
                                        <h4>No tickets found</h4>
                                        <p>Your support tickets will appear here.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : allTickets.map((ticket, idx) => (
                            <tr key={idx}>
                                <td className="ticket-sl">{idx + 1}</td>
                                <td className="ticket-id">{ticket.id}</td>
                                <td className="ticket-subject">{ticket.subject}</td>
                                <td className="ticket-date">{ticket.date}</td>
                                <td>
                                    <span className={`status-badge status-${ticket.status.toLowerCase()}`}>
                                        <span className="status-dot" />
                                        {ticket.status}
                                    </span>
                                </td>
                                <td>
                                    <span className={`priority-${ticket.priority.toLowerCase()}`}>
                                        {ticket.priority}
                                    </span>
                                </td>
                                <td>
                                    <button className="btn-view-ticket" onClick={() => router.push(`/patient-portal/help/tickets-detailes?id=${encodeURIComponent(ticket.id)}`)}>
                                        <Eye size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </motion.div>
    );
}
