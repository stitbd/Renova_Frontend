"use client";

import Link from "next/link";
import { useState } from "react";
import { generatePrescriptionPDF, buildPrescriptionDataFromDetails } from "@/utils/prescriptionPDF";
import PrescriptionPreviewModal from "@/components/PrescriptionPreviewModal";
import "./prescriptions-details.css";

const prescription = {
    id: "RX-2025-000156",
    dateTime: "31 May 2025, 10:30 AM",
    doctor: "Dr. Abdullah Al Noman",
    doctorSpec: "Cardiologist",
    department: "Cardiology",
    type: "new",
    patientId: "PT-2025-000123",
    patientName: "Ayesha Rahman",
    ageGender: "28 Years, Female",
    contact: "017XXXXXXXXXX",
    visitType: "OPD",
};

const medicines = [
    { num: 1, name: "Amlodipine", form: "Tablet 5mg", dose: "1 Tablet", frequency: "1 + 1 + 1", duration: "7 Days", instructions: "After breakfast" },
    { num: 2, name: "Atorvastatin", form: "Tablet 20mg", dose: "1 Tablet", frequency: "1 + 0 + 1", duration: "30 Days", instructions: "After dinner" },
    { num: 3, name: "Aspirin", form: "Tablet 75mg", dose: "1 Tablet", frequency: "0 + 0 + 1", duration: "30 Days", instructions: "After breakfast" },
    { num: 4, name: "Pantoprazole", form: "Tablet 40mg", dose: "1 Tablet", frequency: "1 + 0 + 1", duration: "15 Days", instructions: "Before breakfast" },
    { num: 5, name: "Vitamin D3", form: "Capsule 60K IU", dose: "1 Capsule", frequency: "1 + 1 + 0", duration: "4 Weeks", instructions: "After meal" },
];

const additionalInstructions = [
    "Take medicines regularly as prescribed.",
    "Do regular walking and light exercise.",
    "Avoid oily and spicy food.",
    "If pain increases, contact the doctor immediately.",
];

const patient = {
    name: "Ayesha Rahman",
    pid: "PT-2025-000123",
    age: "28 Years, Female",
    phone: "017XXXXXXXXXX",
    dob: "12 Jan 1997",
    address: "Mirpur, Dhaka",
};

const summary = {
    totalMedicines: 5,
    totalInstructions: 2,
    followUpDate: "07 Jun 2025",
    nextVisit: "After 7 Days",
    status: "dispensed",
};


const doctor = {
    email: "dr.noman@hospital.com",
    phone: "+880 1XXX XXXXXX",
};

const getPdfData = () =>
    buildPrescriptionDataFromDetails({ prescription, medicines, additionalInstructions, patient, summary, doctor });

const handleDownload = async () => {
    setIsGenerating(true);
    await generatePrescriptionPDF(getPdfData(), "download");
    setIsGenerating(false);
};

const handlePrint = async () => {
    setIsGenerating(true);
    await generatePrescriptionPDF(getPdfData(), "print");
    setIsGenerating(false);
};

const handlePreview = async () => {
    setIsGenerating(true);
    const url = await generatePrescriptionPDF(getPdfData(), "preview");
    setPreviewUrl(url);
    setIsGenerating(false);
};

const handleClosePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
};

function Icon({ type }) {
    const icons = {
        back: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>,
        print: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>,
        download: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
        edit: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
        rx: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" /></svg>,
        pill: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7z" /><line x1="8.5" y1="8.5" x2="15.5" y2="15.5" /></svg>,
        info: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
        attach: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>,
        file: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
        eye: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
        user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
        phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12 19.79 19.79 0 0 1 1 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
        calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
        pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
        whatsapp: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>,
        mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
        share: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>,
        cancel: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>,
    };
    return <>{icons[type] || null}</>;
}

export default function PrescriptionDetailsPage() {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    return (
        <>
            {/* Sub Header */}
            <div className="rxd-sub-header">
                <div className="rxd-breadcrumb">
                    <Link href="/doctor-portal/prescriptions" className="">Prescriptions</Link>
                    <span className="rxd-breadcrumb-sep">›</span>
                    <span className="rxd-breadcrumb-current">Prescription Details</span>
                </div>
                <div className="rxd-header-actions">
                    <Link href="/doctor-portal/prescriptions" className="rxd-header-btn back">
                        <Icon type="back" /> Back
                    </Link>
                    <button className="rxd-header-btn outline" onClick={handlePrint} disabled={isGenerating}>
                        <Icon type="print" /> Print
                    </button>
                    <button className="rxd-header-btn outline" onClick={handleDownload} disabled={isGenerating}>
                        <Icon type="download" /> {isGenerating ? "Generating…" : "Download"}
                    </button>
                    <button className="rxd-header-btn primary">
                        <Link
                            href="/doctor-portal/prescriptions/update-prescriptions"
                            className="rx-tbl-btn primary"
                        >
                            <Icon type="edit" /> Edit Prescription
                        </Link>
                    </button>
                </div>
            </div>

            {/* Layout */}
            <div className="rxd-layout">
                {/* ── Left Column ────────────────────────────────── */}
                <div className="rxd-left-col">

                    {/* Prescription Information */}
                    <div className="rxd-card">
                        <h3 className="rxd-section-title">
                            <Icon type="rx" /> Prescription Information
                        </h3>
                        <div className="rxd-info-grid">
                            {/* Left column of info */}
                            <div>
                                <div className="rxd-info-row">
                                    <span className="rxd-info-label">Prescription ID</span>
                                    <span className="rxd-info-colon">:</span>
                                    <span className="rxd-info-value">{prescription.id}</span>
                                </div>
                                <div className="rxd-info-row">
                                    <span className="rxd-info-label">Date &amp; Time</span>
                                    <span className="rxd-info-colon">:</span>
                                    <span className="rxd-info-value">{prescription.dateTime}</span>
                                </div>
                                <div className="rxd-info-row">
                                    <span className="rxd-info-label">Doctor</span>
                                    <span className="rxd-info-colon">:</span>
                                    <span className="rxd-info-value sub">
                                        {prescription.doctor}
                                        <span>{prescription.doctorSpec}</span>
                                    </span>
                                </div>
                                <div className="rxd-info-row">
                                    <span className="rxd-info-label">Department</span>
                                    <span className="rxd-info-colon">:</span>
                                    <span className="rxd-info-value">{prescription.department}</span>
                                </div>
                                <div className="rxd-info-row">
                                    <span className="rxd-info-label">Prescription Type</span>
                                    <span className="rxd-info-colon">:</span>
                                    <span className="rxd-info-value">
                                        <span className={`rxd-type-badge ${prescription.type}`}>
                                            {prescription.type === "new" ? "New Prescription" : "Refill"}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            {/* Right column of info */}
                            <div>
                                <div className="rxd-info-row">
                                    <span className="rxd-info-label">Patient ID</span>
                                    <span className="rxd-info-colon">:</span>
                                    <span className="rxd-info-value">{prescription.patientId}</span>
                                </div>
                                <div className="rxd-info-row">
                                    <span className="rxd-info-label">Patient Name</span>
                                    <span className="rxd-info-colon">:</span>
                                    <span className="rxd-info-value">{prescription.patientName}</span>
                                </div>
                                <div className="rxd-info-row">
                                    <span className="rxd-info-label">Age / Gender</span>
                                    <span className="rxd-info-colon">:</span>
                                    <span className="rxd-info-value">{prescription.ageGender}</span>
                                </div>
                                <div className="rxd-info-row">
                                    <span className="rxd-info-label">Contact</span>
                                    <span className="rxd-info-colon">:</span>
                                    <span className="rxd-info-value">{prescription.contact}</span>
                                </div>
                                <div className="rxd-info-row">
                                    <span className="rxd-info-label">Visit Type</span>
                                    <span className="rxd-info-colon">:</span>
                                    <span className="rxd-info-value">{prescription.visitType}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Prescribed Medicines */}
                    <div className="rxd-card">
                        <h3 className="rxd-medicines-title">
                            <Icon type="pill" /> Prescribed Medicines
                        </h3>
                        <table className="rxd-med-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Medicine Name<br /><span style={{ fontWeight: 400, color: "#94a3b8" }}>Form / Strength</span></th>
                                    <th>Dose</th>
                                    <th>Frequency</th>
                                    <th>Duration</th>
                                    <th>Instructions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicines.map((med) => (
                                    <tr key={med.num}>
                                        <td>{med.num}</td>
                                        <td>
                                            <p className="rxd-med-name">{med.name}</p>
                                            <span className="rxd-med-form">{med.form}</span>
                                        </td>
                                        <td>{med.dose}</td>
                                        <td>{med.frequency}</td>
                                        <td>{med.duration}</td>
                                        <td>{med.instructions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Additional Instructions */}
                        <div className="rxd-instructions-card" style={{ marginTop: 16 }}>
                            <p className="rxd-instructions-title">
                                <Icon type="info" /> Additional Instructions
                            </p>
                            <div className="rxd-instructions-grid">
                                {additionalInstructions.map((inst, i) => (
                                    <div key={i} className="rxd-instruction-item">
                                        <span className="rxd-instruction-dot" />
                                        {inst}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Attachments */}
                    <div className="rxd-card">
                        <h3 className="rxd-attach-title">
                            <Icon type="attach" /> Attachments
                        </h3>
                        <div className="rxd-attach-item">
                            <div className="rxd-attach-icon">
                                <Icon type="file" />
                            </div>
                            <div className="rxd-attach-info">
                                <p className="rxd-attach-name">ECG Report.pdf</p>
                                <p className="rxd-attach-size">1.2 MB</p>
                            </div>
                            <div className="rxd-attach-actions">
                                <button className="rxd-attach-btn" title="Download">
                                    <Icon type="download" />
                                </button>
                                <button className="rxd-attach-btn" title="View">
                                    <Icon type="eye" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Right Column ───────────────────────────────── */}
                <div className="rxd-right-col">

                    {/* Patient Summary */}
                    <div className="rxd-patient-card">
                        <div className="rxd-patient-card-header">
                            <h4 className="rxd-patient-card-title">Patient Summary</h4>
                            <Link
                                href={`/doctor-portal/patients/patient-profile?id=${patient.pid}&from=/doctor-portal/prescriptions/prescriptions-details`}
                                className="rxd-view-profile-link"
                                style={{ display: "block", textAlign: "center", textDecoration: "none" }}
                            >
                                View Full Profile
                            </Link>
                        </div>
                        <div className="rxd-patient-info-block">
                            <div className="rxd-patient-avatar">
                                <Icon type="user" />
                            </div>
                            <div>
                                <p className="rxd-patient-name">{patient.name}</p>
                                <p className="rxd-patient-pid">{patient.pid}</p>
                            </div>
                        </div>
                        <div className="rxd-patient-detail-rows">
                            <div className="rxd-patient-detail-row">
                                <Icon type="pin" /> {patient.address}
                            </div>
                        </div>
                    </div>

                    {/* Prescription Summary */}
                    <div className="rxd-summary-card">
                        <h4 className="rxd-summary-title">Prescription Summary</h4>
                        <div className="rxd-summary-rows">
                            <div className="rxd-summary-row">
                                <span className="rxd-summary-key">Total Medicines</span>
                                <span className="rxd-summary-val">{summary.totalMedicines}</span>
                            </div>
                            <div className="rxd-summary-row">
                                <span className="rxd-summary-key">Total Instructions</span>
                                <span className="rxd-summary-val">{summary.totalInstructions}</span>
                            </div>
                            <div className="rxd-summary-row">
                                <span className="rxd-summary-key">Follow Up Date</span>
                                <span className="rxd-summary-val blue">{summary.followUpDate}</span>
                            </div>
                            <div className="rxd-summary-row">
                                <span className="rxd-summary-key">Next Visit</span>
                                <span className="rxd-summary-val blue">{summary.nextVisit}</span>
                            </div>
                            <div className="rxd-summary-row">
                                <span className="rxd-summary-key">Status</span>
                                <span className={`rxd-status-badge-sm ${summary.status}`}>
                                    {summary.status.charAt(0).toUpperCase() + summary.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Prescription Notes */}
                    <div className="rxd-notes-card">
                        <h4 className="rxd-notes-title">Prescription Notes</h4>
                        <p className="rxd-notes-text">
                            Patient has mild chest pain and high BP.<br />
                            Advised regular exercise and low salt diet.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="rxd-actions-card">
                        <h4 className="rxd-actions-title">Actions</h4>
                        <div className="rxd-actions-grid">
                            <button className="rxd-action-btn whatsapp">
                                <Icon type="whatsapp" /> WhatsApp
                            </button>
                            <button className="rxd-action-btn email">
                                <Icon type="mail" /> Send Email
                            </button>
                            <button className="rxd-action-btn share">
                                <Icon type="share" /> Share
                            </button>
                            <button className="rxd-action-btn cancel">
                                <Icon type="cancel" /> Cancel Prescription
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {previewUrl && (
                <PrescriptionPreviewModal
                    pdfUrl={previewUrl}
                    onClose={handleClosePreview}
                    onDownload={handleDownload}
                    onPrint={handlePrint}
                />
            )}
        </>
    );
}