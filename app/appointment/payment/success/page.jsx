"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { API_URL } from "@/config";
import "./../../../../styles/pages/AppointmentSuccess.css";

const formatDhakaDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-BD", {
        timeZone: "Asia/Dhaka",
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const formatDhakaTime = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleTimeString("en-BD", {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const StatusPill = ({ children, type = "success" }) => (
    <span className={`as-pill as-pill--${type}`}>{children}</span>
);

const SectionCard = ({ title, children }) => (
    <div className="as-section-card">
        <p className="as-section-title">{title}</p>
        {children}
    </div>
);

const Row = ({ label, value, mono = false }) => (
    <div className="as-row">
        <span className="as-row__key">{label}</span>
        <span className={`as-row__val${mono ? " as-row__val--mono" : ""}`}>
            {value || "N/A"}
        </span>
    </div>
);

export default function AppointmentSuccess() {
    const searchParams = useSearchParams();
    const paymentId = searchParams.get("paymentId");

    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPayment = async () => {
            try {
                if (!paymentId) throw new Error("Payment ID is missing.");

                const res = await fetch(`${API_URL}/payments/getSingle/${paymentId}`, {
                    credentials: "include",
                });

                const result = await res.json();

                if (!res.ok || !result.success) {
                    throw new Error(result.message || "Failed to load payment details.");
                }

                setPayment(result.data);
            } catch (err) {
                setError(err.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchPayment();
    }, [paymentId]);

    if (loading) {
        return (
            <main className="as-page">
                <div className="as-state-card">Loading payment details...</div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="as-page">
                <div className="as-state-card as-state-card--error">{error}</div>
            </main>
        );
    }

    const appointment = payment?.appointment || {};
    const doctor = payment?.doctor || {};
    const patient = payment?.patient || {};
    const gw = payment?.gatewayResponse || {};

    return (
        <main className="as-page">
            <section className="as-container">

                {/* ── Header ── */}
                <div className="as-header">
                    <div className="as-check-circle">&#10003;</div>
                    <h1>Payment confirmed</h1>
                    <p>Your appointment has been booked successfully.</p>
                </div>

                {/* ── Summary strip ── */}
                <div className="as-summary-strip">
                    <div className="as-strip-card">
                        <span className="as-strip-card__label">Appointment</span>
                        <strong className="as-strip-card__val as-strip-card__val--mono">
                            {appointment.appointmentCode || "N/A"}
                        </strong>
                    </div>
                    <div className="as-strip-card">
                        <span className="as-strip-card__label">Transaction</span>
                        <strong className="as-strip-card__val as-strip-card__val--mono">
                            {payment.transactionId || "N/A"}
                        </strong>
                    </div>
                    <div className="as-strip-card">
                        <span className="as-strip-card__label">Amount paid</span>
                        <strong className="as-strip-card__val as-strip-card__val--green">
                            {payment.currency} {Number(payment.amount).toLocaleString()}
                        </strong>
                    </div>
                </div>

                {/* ── Participants ── */}
                <SectionCard title="Participants">
                    <div className="as-people-grid">
                        <div className="as-person-card">
                            <div className="as-avatar as-avatar--doctor">DR</div>
                            <div className="as-person-info">
                                <span className="as-person-info__role">Doctor</span>
                                <h3 className="as-person-info__name">{doctor.fullName || "N/A"}</h3>
                                <p className="as-person-info__sub">
                                    {appointment.type === "ONLINE"
                                        ? "Online consultation"
                                        : "In-person consultation"}
                                </p>
                            </div>
                        </div>
                        <div className="as-person-card">
                            <div className="as-avatar as-avatar--patient">PT</div>
                            <div className="as-person-info">
                                <span className="as-person-info__role">Patient</span>
                                <h3 className="as-person-info__name">{patient.fullName || "N/A"}</h3>
                                <p className="as-person-info__sub">{patient.email || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </SectionCard>

                {/* ── Appointment details ── */}
                <SectionCard title="Appointment details">
                    <Row label="Date" value={formatDhakaDate(appointment.startTime)} />
                    <Row
                        label="Time"
                        value={`${formatDhakaTime(appointment.startTime)} – ${formatDhakaTime(appointment.endTime)}`}
                    />
                    <div className="as-row">
                        <span className="as-row__key">Type</span>
                        <StatusPill type="info">
                            {appointment.type === "ONLINE" ? "Online" : "In-person"}
                        </StatusPill>
                    </div>
                    <div className="as-row">
                        <span className="as-row__key">Status</span>
                        <StatusPill type="success">{appointment.status}</StatusPill>
                    </div>
                </SectionCard>

                {/* ── Payment method ── */}
                <SectionCard title="Payment method">
                    <div className="as-payment-method">
                        <div className="as-pm-icon">&#128241;</div>
                        <div className="as-pm-info">
                            <p className="as-pm-info__name">{payment.paymentMethod || "N/A"}</p>
                            <p className="as-pm-info__sub">
                                Mobile banking &middot; {payment.gateway} gateway
                            </p>
                        </div>
                        <StatusPill type="success">Paid</StatusPill>
                    </div>

                    <Row label="Gateway" value={payment.gateway} />
                    <Row label="Card / wallet type" value={gw.card_type || payment.cardType} />
                    <Row label="Transaction ID" value={payment.transactionId} mono />
                    <Row label="Bank transaction ID" value={payment.bankTransactionId} mono />
                    {/* <Row label="Validation ID" value={payment.validationId} mono /> */}
                    <Row
                        label="Amount charged"
                        value={`${payment.currency} ${Number(payment.amount).toLocaleString()}.00`}
                    />
                    <Row
                        label="Store received"
                        value={
                            gw.store_amount
                                ? `${payment.currency} ${Number(gw.store_amount).toLocaleString()}.00`
                                : "N/A"
                        }
                    />
                  
                    <Row
                        label="Paid at"
                        value={`${formatDhakaDate(payment.paidAt)} ${formatDhakaTime(payment.paidAt)}`}
                    />
                </SectionCard>

                {/* ── Next steps ── */}
                {/* <SectionCard title="Next steps">
                    <ul className="as-steps">
                        <li>Keep your appointment code and transaction ID safe for reference.</li>
                        <li>Join the online consultation at the scheduled time via your dashboard.</li>
                        <li>Bring previous medical reports or prescriptions if required.</li>
                        <li>You may receive an SMS or email confirmation shortly.</li>
                    </ul>
                </SectionCard> */}

                {/* ── Actions ── */}
                <div className="as-actions">
                    <a href="/appointment" className="as-btn as-btn--secondary">
                        Book another
                    </a>
                    <a href="/" className="as-btn as-btn--primary">
                        Go to homepage
                    </a>
                </div>

                <button
                    type="button"
                    className="as-print-btn"
                    onClick={() => window.print()}
                >
                    Download &amp; print invoice
                </button>

            </section>
        </main>
    );
}