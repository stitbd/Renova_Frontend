"use client";

import Link from "next/link";
import { useState } from "react";
import "./update-prescriptions.css";

// ==================== ICONS COMPONENT ====================
function Icon({ type }) {
    const icons = {
        arrowLeft: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
        ),
        home: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        plus: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
            </svg>
        ),
        save: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
            </svg>
        ),
        fileText: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        ),
        pill: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7z" />
                <line x1="8.5" y1="8.5" x2="15.5" y2="15.5" />
            </svg>
        ),
        clipboard: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            </svg>
        ),
        paperclip: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            </svg>
        ),
        upload: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
        ),
        user: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
        search: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        ),
        x: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        ),
        mail: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
        phone: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12 19.79 19.79 0 0 1 1 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
        ),
        calendar: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        ),
        mapPin: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
        clock: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        doctor: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
        stethoscope: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4.5 4.5v7a7 7 0 0 0 14 0v-7" />
                <path d="M9 2.5v3M15 2.5v3" />
                <circle cx="4.5" cy="10.5" r="2.5" />
                <circle cx="19.5" cy="10.5" r="2.5" />
            </svg>
        ),
        eye: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        ),
        trash: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
        ),
        file: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
            </svg>
        ),
        image: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="2.5" />
                <polyline points="21 15 16 10 5 21" />
            </svg>
        ),
        fileText2: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
            </svg>
        ),
        printer: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
            </svg>
        ),
    };
    return icons[type] || null;
}

// ==================== UPDATE PRESCRIPTION PAGE ====================
export default function UpdatePrescriptionPage() {
    // --- State for form fields ---
    const [prescriptionDate, setPrescriptionDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [visitType, setVisitType] = useState("OPD");
    const [prescriptionType, setPrescriptionType] = useState("new");
    const [followUpDate, setFollowUpDate] = useState("");
    const [clinicalNotes, setClinicalNotes] = useState("");

    // --- State for medicines (dynamic rows) ---
    const [medicines, setMedicines] = useState([
        {
            id: 1,
            name: "",
            formStrength: "",
            dose: "",
            frequency: "",
            customFrequency: "",
            duration: "",
            customDuration: "",
            instructions: "",
        },
    ]);

    const addMedicineRow = () => {
        const newId = medicines.length + 1;
        setMedicines([
            ...medicines,
            {
                id: newId,
                name: "",
                formStrength: "",
                dose: "",
                frequency: "",
                customFrequency: "",
                duration: "",
                customDuration: "",
                instructions: "",
            },
        ]);
    };

    const updateMedicine = (id, field, value) => {
        setMedicines(
            medicines.map((med) => (med.id === id ? { ...med, [field]: value } : med))
        );
    };

    const deleteMedicineRow = (id) => {
        if (medicines.length === 1) return;
        setMedicines(medicines.filter((med) => med.id !== id));
    };

    // --- State for additional instructions (dynamic list) ---
    const [additionalInstructions, setAdditionalInstructions] = useState([
        "Take medicines regularly as prescribed.",
    ]);

    const addInstruction = () => {
        setAdditionalInstructions([...additionalInstructions, ""]);
    };

    const updateInstruction = (index, value) => {
        const updated = [...additionalInstructions];
        updated[index] = value;
        setAdditionalInstructions(updated);
    };

    const deleteInstruction = (index) => {
        if (additionalInstructions.length === 1) return;
        setAdditionalInstructions(additionalInstructions.filter((_, i) => i !== index));
    };

    // --- State for attachments ---
    const [attachments, setAttachments] = useState([]);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFileUpload = (files) => {
        const newFiles = Array.from(files).map((file) => ({
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type,
            file: file,
        }));
        setAttachments([...attachments, ...newFiles]);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length) handleFileUpload(files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const removeAttachment = (id) => {
        setAttachments(attachments.filter((att) => att.id !== id));
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / 1048576).toFixed(1) + " MB";
    };

    const getFileIconType = (fileType) => {
        if (fileType.includes("pdf")) return "file";
        if (fileType.includes("image")) return "image";
        return "fileText2";
    };

    const getFileIconClass = (fileType) => {
        if (fileType.includes("pdf")) return "pdf";
        if (fileType.includes("image")) return "img";
        return "doc";
    };

    // --- State for patient search ---
    const [patientSearchQuery, setPatientSearchQuery] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);

    // Mock patient data
    const mockPatients = [
        {
            id: "PT-2025-000123",
            name: "Ayesha Rahman",
            age: 28,
            gender: "Female",
            phone: "017XXXXXXXXXX",
            email: "ayesha@example.com",
            address: "Mirpur, Dhaka",
            avatar: null,
        },
        {
            id: "PT-2025-000456",
            name: "Md. Kamal Hossain",
            age: 45,
            gender: "Male",
            phone: "018XXXXXXXXXX",
            email: "kamal@example.com",
            address: "Uttara, Dhaka",
            avatar: null,
        },
        {
            id: "PT-2025-000789",
            name: "Fatema Begum",
            age: 35,
            gender: "Female",
            phone: "019XXXXXXXXXX",
            email: "fatema@example.com",
            address: "Gulshan, Dhaka",
            avatar: null,
        },
    ];

    const filteredPatients = mockPatients.filter(
        (p) =>
            p.name.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
            p.id.toLowerCase().includes(patientSearchQuery.toLowerCase())
    );

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        setPatientSearchQuery("");
        setShowPatientSuggestions(false);
    };

    const handleClearPatient = () => {
        setSelectedPatient(null);
    };

    // --- Summary data ---
    const summary = {
        totalMedicines: medicines.filter((m) => m.name.trim() !== "").length,
        totalInstructions: additionalInstructions.filter((i) => i.trim() !== "").length,
        followUpDate: followUpDate || "Not set",
        nextVisit: visitType === "IPD" ? "Admitted" : "OPD follow-up",
    };

    // Mock doctor info (from logged in user context)
    const doctor = {
        name: "Dr. Abdullah Al Noman",
        specialization: "Cardiologist",
        department: "Cardiology",
        employeeId: "D-2025-001",
        email: "dr.noman@hospital.com",
        phone: "+880 1XXX XXXXXX",
        avatar: null,
    };

    // --- Form submission handlers ---
    const handleSavePrescription = () => {
        if (!selectedPatient) {
            alert("Please select a patient");
            return;
        }
        const prescriptionData = {
            patient: selectedPatient,
            prescriptionDate,
            visitType,
            prescriptionType,
            followUpDate,
            clinicalNotes,
            medicines: medicines.filter((m) => m.name.trim() !== ""),
            additionalInstructions: additionalInstructions.filter((i) => i.trim() !== ""),
            attachments: attachments.map((a) => a.name),
            doctor,
        };
        console.log("Saving prescription:", prescriptionData);
        alert("Prescription saved successfully!");
    };

    const handleSaveAsDraft = () => {
        console.log("Saving as draft");
        alert("Prescription saved as draft");
    };

    const handlePreview = () => {
        console.log("Preview prescription");
        alert("Preview mode - would show print preview");
    };

    return (
        <>
            {/* Sub Header */}
            <div className="nrx-sub-header">
                <div className="nrx-breadcrumb">
                    <Link href="/doctor-portal/dashboard">Dashboard</Link>
                    <span className="nrx-breadcrumb-sep">/</span>
                    <Link href="/doctor-portal/prescriptions">Prescriptions</Link>
                    <span className="nrx-breadcrumb-sep">/</span>
                    <span className="nrx-breadcrumb-current">Update Prescription</span>
                </div>
                <div className="nrx-header-actions">
                    <Link href="/doctor-portal/prescriptions" className="nrx-header-btn back">
                        <Icon type="arrowLeft" /> Back
                    </Link>
                    <button className="nrx-header-btn outline" onClick={handlePreview}>
                        <Icon type="eye" /> Preview
                    </button>
                    <button className="nrx-header-btn secondary" onClick={handleSaveAsDraft}>
                        <Icon type="save" /> Save Draft
                    </button>
                    <button className="nrx-header-btn primary" onClick={handleSavePrescription}>
                        <Icon type="save" /> Save Prescription
                    </button>
                </div>
            </div>

            {/* Main 2-column layout */}
            <div className="nrx-layout">
                {/* Left Column */}
                <div className="nrx-left-col">
                    {/* Prescription Information Card */}
                    <div className="nrx-card">
                        <h3 className="nrx-section-title">
                            <Icon type="fileText" /> Prescription Information
                        </h3>
                        <div className="nrx-form-grid">
                            <div className="nrx-form-group">
                                <label className="nrx-label">
                                    Prescription Date <span className="nrx-required">*</span>
                                </label>
                                <div className="nrx-input-wrap">
                                    <span className="nrx-input-icon">
                                        <Icon type="calendar" />
                                    </span>
                                    <input
                                        type="date"
                                        className="nrx-input"
                                        value={prescriptionDate}
                                        onChange={(e) => setPrescriptionDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="nrx-form-group">
                                <label className="nrx-label">
                                    Visit Type <span className="nrx-required">*</span>
                                </label>
                                <select
                                    className="nrx-select"
                                    value={visitType}
                                    onChange={(e) => setVisitType(e.target.value)}
                                >
                                    <option value="OPD">OPD</option>
                                    <option value="IPD">IPD</option>
                                    <option value="Emergency">Emergency</option>
                                    <option value="Telemedicine">Telemedicine</option>
                                </select>
                            </div>
                            <div className="nrx-form-group full-width">
                                <label className="nrx-label">Prescription Type</label>
                                <div className="nrx-type-selector">
                                    <button
                                        type="button"
                                        className={`nrx-type-btn ${prescriptionType === "new" ? "active" : ""}`}
                                        onClick={() => setPrescriptionType("new")}
                                    >
                                        <Icon type="fileText" /> New Prescription
                                    </button>
                                    <button
                                        type="button"
                                        className={`nrx-type-btn ${prescriptionType === "refill" ? "active" : ""}`}
                                        onClick={() => setPrescriptionType("refill")}
                                    >
                                        <Icon type="clipboard" /> Refill
                                    </button>
                                    <button
                                        type="button"
                                        className={`nrx-type-btn ${prescriptionType === "repeat" ? "active" : ""}`}
                                        onClick={() => setPrescriptionType("repeat")}
                                    >
                                        <Icon type="clock" /> Repeat
                                    </button>
                                </div>
                            </div>
                            <div className="nrx-form-group">
                                <label className="nrx-label">Follow-up Date</label>
                                <div className="nrx-input-wrap">
                                    <span className="nrx-input-icon">
                                        <Icon type="calendar" />
                                    </span>
                                    <input
                                        type="date"
                                        className="nrx-input"
                                        value={followUpDate}
                                        onChange={(e) => setFollowUpDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="nrx-form-group full-width">
                                <label className="nrx-label">Clinical Notes / Remarks</label>
                                <textarea
                                    className="nrx-textarea"
                                    rows="3"
                                    placeholder="Enter clinical notes, diagnosis, or remarks..."
                                    value={clinicalNotes}
                                    onChange={(e) => setClinicalNotes(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Prescribed Medicines Card */}
                    <div className="nrx-card">
                        <h3 className="nrx-section-title">
                            <Icon type="pill" /> Prescribed Medicines
                        </h3>
                        <div className="nrx-med-table-wrap">
                            <table className="nrx-med-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Medicine Name & Form/Strength</th>
                                        <th>Dose</th>
                                        <th>Frequency</th>
                                        <th>Duration</th>
                                        <th>Instructions</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medicines.map((med, idx) => (
                                        <tr key={med.id}>
                                            <td>{idx + 1}</td>
                                            <td>
                                                <div className="nrx-cell-name-wrap">
                                                    <input
                                                        type="text"
                                                        className="nrx-cell-input"
                                                        placeholder="Medicine name"
                                                        value={med.name}
                                                        onChange={(e) => updateMedicine(med.id, "name", e.target.value)}
                                                    />
                                                    <input
                                                        type="text"
                                                        className="nrx-med-form-input"
                                                        placeholder="Form / Strength (e.g., Tablet 10mg)"
                                                        value={med.formStrength}
                                                        onChange={(e) => updateMedicine(med.id, "formStrength", e.target.value)}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="nrx-cell-input"
                                                    placeholder="e.g., 1 Tablet"
                                                    value={med.dose}
                                                    onChange={(e) => updateMedicine(med.id, "dose", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <div className="nrx-cell-combo">
                                                    <select
                                                        className="nrx-cell-select"
                                                        value={med.frequency}
                                                        onChange={(e) => updateMedicine(med.id, "frequency", e.target.value)}
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="1 + 1 + 1">1 + 1 + 1</option>
                                                        <option value="1 + 0 + 1">1 + 0 + 1</option>
                                                        <option value="1 + 0 + 0">1 + 0 + 0</option>
                                                        <option value="0 + 1 + 0">0 + 1 + 0</option>
                                                        <option value="0 + 0 + 1">0 + 0 + 1</option>
                                                        <option value="1 + 1 + 0">1 + 1 + 0</option>
                                                        <option value="1 + 1 + 1 + 1">1 + 1 + 1 + 1</option>
                                                        <option value="Every 4 Hours">Every 4 Hours</option>
                                                        <option value="Every 6 Hours">Every 6 Hours</option>
                                                        <option value="Every 8 Hours">Every 8 Hours</option>
                                                        <option value="Once Weekly">Once Weekly</option>
                                                        <option value="Twice Weekly">Twice Weekly</option>
                                                        <option value="As Needed">As Needed</option>
                                                        <option value="custom">Custom...</option>
                                                    </select>
                                                    {med.frequency === "custom" && (
                                                        <input
                                                            type="text"
                                                            className="nrx-cell-input nrx-combo-input"
                                                            placeholder="Type frequency"
                                                            value={med.customFrequency}
                                                            onChange={(e) => updateMedicine(med.id, "customFrequency", e.target.value)}
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="nrx-cell-combo">
                                                    <select
                                                        className="nrx-cell-select"
                                                        value={med.duration}
                                                        onChange={(e) => updateMedicine(med.id, "duration", e.target.value)}
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="1 Day">1 Day</option>
                                                        <option value="3 Days">3 Days</option>
                                                        <option value="5 Days">5 Days</option>
                                                        <option value="7 Days">7 Days</option>
                                                        <option value="10 Days">10 Days</option>
                                                        <option value="14 Days">14 Days</option>
                                                        <option value="21 Days">21 Days</option>
                                                        <option value="30 Days">30 Days</option>
                                                        <option value="60 Days">60 Days</option>
                                                        <option value="90 Days">90 Days</option>
                                                        <option value="custom">Custom...</option>
                                                    </select>
                                                    {med.duration === "custom" && (
                                                        <input
                                                            type="text"
                                                            className="nrx-cell-input nrx-combo-input"
                                                            placeholder="e.g., 45 Days"
                                                            value={med.customDuration}
                                                            onChange={(e) => updateMedicine(med.id, "customDuration", e.target.value)}
                                                        />
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="nrx-cell-input"
                                                    placeholder="e.g., After breakfast"
                                                    value={med.instructions}
                                                    onChange={(e) => updateMedicine(med.id, "instructions", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="nrx-row-del-btn"
                                                    onClick={() => deleteMedicineRow(med.id)}
                                                >
                                                    <Icon type="trash" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile card view — shown only on small screens via CSS */}
                        <div className="nrx-med-cards">
                            {medicines.map((med, idx) => (
                                <div key={med.id} className="nrx-med-card">
                                    <div className="nrx-med-card-header">
                                        <span className="nrx-med-card-num">#{idx + 1}</span>
                                        <button
                                            type="button"
                                            className="nrx-row-del-btn"
                                            onClick={() => deleteMedicineRow(med.id)}
                                        >
                                            <Icon type="trash" />
                                        </button>
                                    </div>
                                    <div className="nrx-med-card-body">
                                        <div className="nrx-med-card-field full">
                                            <label className="nrx-med-card-label">Medicine Name</label>
                                            <input
                                                type="text"
                                                className="nrx-cell-input"
                                                placeholder="Medicine name"
                                                value={med.name}
                                                onChange={(e) => updateMedicine(med.id, "name", e.target.value)}
                                            />
                                        </div>
                                        <div className="nrx-med-card-field full">
                                            <label className="nrx-med-card-label">Form / Strength</label>
                                            <input
                                                type="text"
                                                className="nrx-med-form-input"
                                                placeholder="e.g., Tablet 10mg"
                                                value={med.formStrength}
                                                onChange={(e) => updateMedicine(med.id, "formStrength", e.target.value)}
                                            />
                                        </div>
                                        <div className="nrx-med-card-field">
                                            <label className="nrx-med-card-label">Dose</label>
                                            <input
                                                type="text"
                                                className="nrx-cell-input"
                                                placeholder="e.g., 1 Tablet"
                                                value={med.dose}
                                                onChange={(e) => updateMedicine(med.id, "dose", e.target.value)}
                                            />
                                        </div>
                                        <div className="nrx-med-card-field">
                                            <label className="nrx-med-card-label">Frequency</label>
                                            <div className="nrx-cell-combo">
                                                <select
                                                    className="nrx-cell-select"
                                                    value={med.frequency}
                                                    onChange={(e) => updateMedicine(med.id, "frequency", e.target.value)}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="1 + 1 + 1">1 + 1 + 1</option>
                                                    <option value="1 + 0 + 1">1 + 0 + 1</option>
                                                    <option value="1 + 0 + 0">1 + 0 + 0</option>
                                                    <option value="0 + 1 + 0">0 + 1 + 0</option>
                                                    <option value="0 + 0 + 1">0 + 0 + 1</option>
                                                    <option value="1 + 1 + 0">1 + 1 + 0</option>
                                                    <option value="1 + 1 + 1 + 1">1 + 1 + 1 + 1</option>
                                                    <option value="Every 4 Hours">Every 4 Hours</option>
                                                    <option value="Every 6 Hours">Every 6 Hours</option>
                                                    <option value="Every 8 Hours">Every 8 Hours</option>
                                                    <option value="Once Weekly">Once Weekly</option>
                                                    <option value="Twice Weekly">Twice Weekly</option>
                                                    <option value="As Needed">As Needed</option>
                                                    <option value="custom">Custom...</option>
                                                </select>
                                                {med.frequency === "custom" && (
                                                    <input
                                                        type="text"
                                                        className="nrx-cell-input nrx-combo-input"
                                                        placeholder="Type frequency"
                                                        value={med.customFrequency}
                                                        onChange={(e) => updateMedicine(med.id, "customFrequency", e.target.value)}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="nrx-med-card-field">
                                            <label className="nrx-med-card-label">Duration</label>
                                            <div className="nrx-cell-combo">
                                                <select
                                                    className="nrx-cell-select"
                                                    value={med.duration}
                                                    onChange={(e) => updateMedicine(med.id, "duration", e.target.value)}
                                                >
                                                    <option value="">Select</option>
                                                    <option value="1 Day">1 Day</option>
                                                    <option value="3 Days">3 Days</option>
                                                    <option value="5 Days">5 Days</option>
                                                    <option value="7 Days">7 Days</option>
                                                    <option value="10 Days">10 Days</option>
                                                    <option value="14 Days">14 Days</option>
                                                    <option value="21 Days">21 Days</option>
                                                    <option value="30 Days">30 Days</option>
                                                    <option value="60 Days">60 Days</option>
                                                    <option value="90 Days">90 Days</option>
                                                    <option value="custom">Custom...</option>
                                                </select>
                                                {med.duration === "custom" && (
                                                    <input
                                                        type="text"
                                                        className="nrx-cell-input nrx-combo-input"
                                                        placeholder="e.g., 45 Days"
                                                        value={med.customDuration}
                                                        onChange={(e) => updateMedicine(med.id, "customDuration", e.target.value)}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="nrx-med-card-field full">
                                            <label className="nrx-med-card-label">Instructions</label>
                                            <input
                                                type="text"
                                                className="nrx-cell-input"
                                                placeholder="e.g., After breakfast"
                                                value={med.instructions}
                                                onChange={(e) => updateMedicine(med.id, "instructions", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="nrx-add-row-btn" onClick={addMedicineRow}>
                            <Icon type="plus" /> Add Medicine
                        </button>
                    </div>

                    {/* Additional Instructions Card */}
                    <div className="nrx-card">
                        <h3 className="nrx-section-title">
                            <Icon type="clipboard" /> Additional Instructions
                        </h3>
                        <div className="nrx-instr-list">
                            {additionalInstructions.map((instruction, idx) => (
                                <div key={idx} className="nrx-instr-row">
                                    <span className="nrx-instr-dot"></span>
                                    <input
                                        type="text"
                                        className="nrx-instr-input"
                                        placeholder="Instruction"
                                        value={instruction}
                                        onChange={(e) => updateInstruction(idx, e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="nrx-instr-del-btn"
                                        onClick={() => deleteInstruction(idx)}
                                    >
                                        <Icon type="trash" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="nrx-add-instr-btn" onClick={addInstruction}>
                            <Icon type="plus" /> Add Instruction
                        </button>
                    </div>

                    {/* Attachments Card */}
                    <div className="nrx-card">
                        <h3 className="nrx-section-title">
                            <Icon type="paperclip" /> Attachments
                        </h3>
                        <div
                            className={`nrx-upload-zone ${isDragOver ? "drag-over" : ""}`}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                        >
                            <div className="nrx-upload-icon">
                                <Icon type="upload" />
                            </div>
                            <p className="nrx-upload-title">Drag & drop files here</p>
                            <p className="nrx-upload-sub">or</p>
                            <label className="nrx-upload-btn-label">
                                <Icon type="upload" /> Browse Files
                                <input
                                    type="file"
                                    multiple
                                    style={{ display: "none" }}
                                    onChange={(e) => handleFileUpload(e.target.files)}
                                />
                            </label>
                            <p className="nrx-upload-sub">Supported: PDF, JPG, PNG, DOC (Max 10MB)</p>
                        </div>
                        {attachments.length > 0 && (
                            <div className="nrx-uploaded-files">
                                {attachments.map((att) => (
                                    <div key={att.id} className="nrx-uploaded-file">
                                        <div className={`nrx-file-icon ${getFileIconClass(att.type)}`}>
                                            <Icon type={getFileIconType(att.type)} />
                                        </div>
                                        <div className="nrx-file-info">
                                            <p className="nrx-file-name">{att.name}</p>
                                            <p className="nrx-file-size">{formatFileSize(att.size)}</p>
                                        </div>
                                        <button
                                            type="button"
                                            className="nrx-file-del-btn"
                                            onClick={() => removeAttachment(att.id)}
                                        >
                                            <Icon type="trash" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className="nrx-right-col">
                    {/* Patient Search Card */}
                    <div className="nrx-patient-search-card">
                        <h4 className="nrx-right-section-title">Patient Information</h4>
                        {!selectedPatient ? (
                            <>
                                <div className="nrx-patient-search-box">
                                    <Icon type="search" />
                                    <input
                                        type="text"
                                        placeholder="Search by name, ID, or phone..."
                                        value={patientSearchQuery}
                                        onChange={(e) => {
                                            setPatientSearchQuery(e.target.value);
                                            setShowPatientSuggestions(true);
                                        }}
                                        onFocus={() => setShowPatientSuggestions(true)}
                                    />
                                </div>
                                {showPatientSuggestions && patientSearchQuery && (
                                    <div className="nrx-patient-suggestions" style={{ marginTop: 8 }}>
                                        {filteredPatients.map((patient) => (
                                            <div
                                                key={patient.id}
                                                className="nrx-patient-suggestion-item"
                                                style={{
                                                    padding: "8px 12px",
                                                    cursor: "pointer",
                                                    borderRadius: 8,
                                                    marginBottom: 4,
                                                    background: "#f8fafc",
                                                }}
                                                onClick={() => handleSelectPatient(patient)}
                                            >
                                                <div style={{ fontWeight: 600 }}>{patient.name}</div>
                                                <div style={{ fontSize: 11, color: "#94a3b8" }}>{patient.id}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div className="nrx-selected-patient">
                                    <div className="nrx-sel-patient-avatar">
                                        {selectedPatient.avatar ? (
                                            <img src={selectedPatient.avatar} alt="" />
                                        ) : (
                                            <Icon type="user" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="nrx-sel-patient-name">{selectedPatient.name}</p>
                                        <p className="nrx-sel-patient-meta">
                                            {selectedPatient.age} yrs, {selectedPatient.gender}
                                        </p>
                                        <p className="nrx-sel-patient-pid">{selectedPatient.id}</p>
                                    </div>
                                    <button className="nrx-clear-patient-btn" onClick={handleClearPatient}>
                                        <Icon type="x" />
                                    </button>
                                </div>
                                <div className="nrx-patient-detail-rows">
                                    <div className="nrx-patient-detail-row">
                                        <Icon type="phone" /> {selectedPatient.phone}
                                    </div>
                                    <div className="nrx-patient-detail-row">
                                        <Icon type="mail" /> {selectedPatient.email}
                                    </div>
                                    <div className="nrx-patient-detail-row">
                                        <Icon type="mapPin" /> {selectedPatient.address}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Prescription Summary Card */}
                    <div className="nrx-summary-card">
                        <h4 className="nrx-right-section-title">Prescription Summary</h4>
                        <div className="nrx-summary-rows">
                            <div className="nrx-summary-row">
                                <span className="nrx-summary-key">Total Medicines</span>
                                <span className="nrx-summary-val">{summary.totalMedicines}</span>
                            </div>
                            <div className="nrx-summary-row">
                                <span className="nrx-summary-key">Total Instructions</span>
                                <span className="nrx-summary-val">{summary.totalInstructions}</span>
                            </div>
                            <div className="nrx-summary-row">
                                <span className="nrx-summary-key">Follow-up Date</span>
                                <span className="nrx-summary-val blue">
                                    {summary.followUpDate === "Not set" ? summary.followUpDate : summary.followUpDate}
                                </span>
                            </div>
                            <div className="nrx-summary-row">
                                <span className="nrx-summary-key">Next Visit</span>
                                <span className="nrx-summary-val blue">{summary.nextVisit}</span>
                            </div>
                            <div className="nrx-summary-row">
                                <span className="nrx-summary-key">Prescription Type</span>
                                <span className="nrx-summary-val green">
                                    {prescriptionType === "new"
                                        ? "New"
                                        : prescriptionType === "refill"
                                            ? "Refill"
                                            : "Repeat"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Doctor Info Card */}
                    <div className="nrx-doctor-card">
                        <h4 className="nrx-right-section-title">Prescribing Doctor</h4>
                        <div className="nrx-doctor-info-block">
                            <div className="nrx-doctor-avatar">
                                {doctor.avatar ? <img src={doctor.avatar} alt="" /> : <Icon type="doctor" />}
                            </div>
                            <div>
                                <p className="nrx-doctor-name">{doctor.name}</p>
                                <p className="nrx-doctor-spec">{doctor.specialization}</p>
                            </div>
                        </div>
                        <div className="nrx-doctor-detail-rows">
                            <div className="nrx-doctor-detail-row">
                                <Icon type="stethoscope" /> {doctor.department}
                            </div>
                            <div className="nrx-doctor-detail-row">
                                <Icon type="mail" /> {doctor.email}
                            </div>
                            <div className="nrx-doctor-detail-row">
                                <Icon type="phone" /> {doctor.phone}
                            </div>
                        </div>
                    </div>

                    {/* Submit Actions Card */}
                    <div className="nrx-submit-card">
                        <button className="nrx-submit-btn save" onClick={handleSavePrescription}>
                            <Icon type="save" /> Save Prescription
                        </button>
                        <button className="nrx-submit-btn draft" onClick={handleSaveAsDraft}>
                            Save as Draft
                        </button>
                        <button className="nrx-submit-btn preview" onClick={handlePreview}>
                            <Icon type="eye" /> Preview & Print
                        </button>
                        <div className="nrx-divider"></div>
                        <Link
                            href="/doctor-portal/prescriptions"
                            className="nrx-submit-btn draft"
                            style={{ textAlign: "center", textDecoration: "none" }}
                        >
                            Cancel
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}