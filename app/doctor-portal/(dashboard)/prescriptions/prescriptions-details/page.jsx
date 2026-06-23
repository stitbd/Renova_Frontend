"use client";

import Link from "next/link";
import { useState } from "react";
import { generatePrescriptionPDF, buildPrescriptionDataFromDetails } from "@/utils/prescriptionPDF";
import PrescriptionPreviewModal from "@/components/PrescriptionPreviewModal";
import "./prescriptions-details.css";
import {
    ArrowLeft,
    Printer,
    Download,
    Edit,
    FileText,
    Pill,
    Info,
    Paperclip,
    Eye,
    User,
    Phone,
    Calendar,
    MapPin,
    MessageCircle,
    Mail,
    Share2,
    X,
    Clock,
    Stethoscope,
    Clipboard
} from "lucide-react";

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

export default function PrescriptionDetailsPage() {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

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

    const handleWhatsApp = async () => {
        setIsGenerating(true);
        const blob = await generatePrescriptionPDF(getPdfData(), "blob");
        const file = new File([blob], `${prescription.id}.pdf`, { type: "application/pdf" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: "Prescription", text: `Prescription for ${patient.name} (${prescription.id})` });
        } else {
            const text = encodeURIComponent(`Prescription ${prescription.id} for ${patient.name}`);
            window.open(`https://wa.me/?text=${text}`, "_blank");
        }
        setIsGenerating(false);
    };

    const handleShare = async () => {
        setIsGenerating(true);
        const blob = await generatePrescriptionPDF(getPdfData(), "blob");
        const file = new File([blob], `${prescription.id}.pdf`, { type: "application/pdf" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: "Prescription", text: `Prescription ${prescription.id}` });
        } else if (navigator.share) {
            await navigator.share({ title: "Prescription", text: `Prescription ${prescription.id}` });
        } else {
            alert("Sharing not supported on this browser. Please use Download.");
        }
        setIsGenerating(false);
    };

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
                        <ArrowLeft size={16} /> Back
                    </Link>
                    <button className="rxd-header-btn outline" onClick={handlePrint} disabled={isGenerating}>
                        <Printer size={16} /> Print
                    </button>
                    <button className="rxd-header-btn outline" onClick={handleDownload} disabled={isGenerating}>
                        <Download size={16} /> {isGenerating ? "Generating…" : "Download"}
                    </button>
                    <Link href="/doctor-portal/prescriptions/update-prescriptions" className="rxd-header-btn primary">
                        <Edit size={16} /> Edit Prescription
                    </Link>
                </div>
            </div>

            {/* Layout */}
            <div className="rxd-layout">
                {/* ── Left Column ────────────────────────────────── */}
                <div className="rxd-left-col">

                    {/* Prescription Information */}
                    <div className="rxd-card">
                        <h3 className="rxd-section-title">
                            <FileText size={16} /> Prescription Information
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
                            <Pill size={16} /> Prescribed Medicines
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
                        {/* Medicine Cards — mobile only */}
                        <div className="rxd-med-cards">
                            {medicines.map((med) => (
                                <div key={med.num} className="rxd-med-card">
                                    <div className="rxd-med-card-header">
                                        <span className="rxd-med-card-num">{med.num}</span>
                                        <p className="rxd-med-card-name">{med.name}</p>
                                        <span className="rxd-med-card-form">{med.form}</span>
                                    </div>
                                    <div className="rxd-med-card-body">
                                        <div className="rxd-med-card-field">
                                            <p className="rxd-med-field-label">Dose</p>
                                            <p className="rxd-med-field-value">{med.dose}</p>
                                        </div>
                                        <div className="rxd-med-card-field">
                                            <p className="rxd-med-field-label">Frequency</p>
                                            <p className="rxd-med-field-value">{med.frequency}</p>
                                        </div>
                                        <div className="rxd-med-card-field">
                                            <p className="rxd-med-field-label">Duration</p>
                                            <p className="rxd-med-field-value">{med.duration}</p>
                                        </div>
                                        <div className="rxd-med-card-field full">
                                            <p className="rxd-med-field-label">Instructions</p>
                                            <p className="rxd-med-field-value">{med.instructions}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Additional Instructions */}
                        <div className="rxd-instructions-card" style={{ marginTop: 16 }}>
                            <p className="rxd-instructions-title">
                                <Info size={16} /> Additional Instructions
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
                            <Paperclip size={16} /> Attachments
                        </h3>
                        <div className="rxd-attach-item">
                            <div className="rxd-attach-icon">
                                <FileText size={16} />
                            </div>
                            <div className="rxd-attach-info">
                                <p className="rxd-attach-name">ECG Report.pdf</p>
                                <p className="rxd-attach-size">1.2 MB</p>
                            </div>
                            <div className="rxd-attach-actions">
                                <button className="rxd-attach-btn" title="Download">
                                    <Download size={14} />
                                </button>
                                <button className="rxd-attach-btn" title="View">
                                    <Eye size={14} />
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
                                <img
                                    src="/images/patients/01.jpg"
                                    alt={patient.name}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = '<User size={24} color="#014fa1" />';
                                    }}
                                />
                            </div>
                            <div>
                                <p className="rxd-patient-name">{patient.name}</p>
                                <p className="rxd-patient-pid">{patient.pid}</p>
                            </div>
                        </div>
                        <div className="rxd-patient-detail-rows">
                            <div className="rxd-patient-detail-row">
                                <MapPin size={14} /> {patient.address}
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
                            <button className="rxd-action-btn whatsapp" onClick={handleWhatsApp} disabled={isGenerating}>
                                <MessageCircle size={16} /> WhatsApp
                            </button>
                            <button className="rxd-action-btn share" onClick={handleShare} disabled={isGenerating}>
                                <Share2 size={16} /> Share
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