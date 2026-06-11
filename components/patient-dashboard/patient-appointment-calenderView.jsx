"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import "../../styles/pages/patient-appointment-calenderView.css";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
    hidden: { opacity: 0, y: 18 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 120, damping: 18 },
    },
};

function getStatusLabel(status) {
    return String(status || "UNKNOWN").replaceAll("_", " ");
}

function getStatusClass(status) {
    return `status-${String(status || "unknown").toLowerCase()}`;
}

export function CalendarView({ appointments = [] }) {
    const groupedAppointments = useMemo(() => {
        return appointments.reduce((acc, apt) => {
            const key = apt.date || "Unknown Date";

            if (!acc[key]) acc[key] = [];

            acc[key].push(apt);
            return acc;
        }, {});
    }, [appointments]);

    const dates = Object.keys(groupedAppointments);

    if (dates.length === 0) {
        return (
            <motion.div className="state-box" variants={item}>
                <h3>No calendar appointments</h3>
                <p>No appointments found for this filter.</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="calendar-board"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {dates.map((date) => (
                <motion.div key={date} className="calendar-day-card" variants={item}>
                    <div className="calendar-day-header">
                        <h3>{date}</h3>
                        <span>
                            {groupedAppointments[date].length}{" "}
                            {groupedAppointments[date].length > 1
                                ? "Appointments"
                                : "Appointment"}
                        </span>
                    </div>

                    <div className="calendar-events">
                        {groupedAppointments[date].map((apt) => (
                            <div key={apt.id} className="calendar-event">
                                <div className="calendar-event-time">
                                    <strong>{apt.startTime}</strong>
                                    <span>{apt.endTime}</span>
                                </div>

                                <div className="calendar-event-content">
                                    <h4>{apt.doctor}</h4>
                                    <p>{apt.specialty}</p>
                                    <small>
                                        {apt.type === "ONLINE" ? "Online" : "In Person"} •{" "}
                                        {apt.paymentStatus}
                                    </small>
                                </div>

                                <span
                                    className={`appointment-status ${getStatusClass(apt.status)}`}
                                >
                                    {getStatusLabel(apt.status)}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}