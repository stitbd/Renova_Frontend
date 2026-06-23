"use client";

import Link from "next/link";
import { useState } from "react";
import { generatePrescriptionPDF, buildPrescriptionDataFromForm } from "@/utils/prescriptionPDF";
import PrescriptionPreviewModal from "@/components/PrescriptionPreviewModal";
import "./new-prescriptions.css";
import {
    ArrowLeft,
    Home,
    Plus,
    Save,
    FileText,
    Pill,
    Clipboard,
    Paperclip,
    Upload,
    User,
    Search,
    X,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Clock,
    Stethoscope,
    Eye,
    Trash2,
    File,
    Image,
    Printer,
    ChevronDown,
    MessageCircle,
    Video,
    Mic
} from "lucide-react";

// ==================== NEW PRESCRIPTION PAGE ====================
export default function NewPrescriptionPage() {
    // --- State for form fields ---
    const [prescriptionDate, setPrescriptionDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [visitType, setVisitType] = useState("OPD");
    const [prescriptionType, setPrescriptionType] = useState("new");
    const [followUpDate, setFollowUpDate] = useState("");
    const [clinicalNotes, setClinicalNotes] = useState("");

    const [previewUrl, setPreviewUrl] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

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

    // --- State for patient search ---
    const [patientSearchQuery, setPatientSearchQuery] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);

    // Today's patient list (mock — replace with API call)
    const mockPatients = [
        { id: "PT-2025-000123", name: "Ayesha Rahman", age: 28, gender: "Female", phone: "017XXXXXXXXXX", email: "ayesha@example.com", address: "Mirpur, Dhaka", avatar: null },
        { id: "PT-2025-000456", name: "Md. Kamal Hossain", age: 45, gender: "Male", phone: "018XXXXXXXXXX", email: "kamal@example.com", address: "Uttara, Dhaka", avatar: null },
        { id: "PT-2025-000789", name: "Fatema Begum", age: 35, gender: "Female", phone: "019XXXXXXXXXX", email: "fatema@example.com", address: "Gulshan, Dhaka", avatar: null },
        { id: "PT-2025-000790", name: "Rafiq Ahmed", age: 38, gender: "Male", phone: "016XXXXXXXXXX", email: "rafiq@example.com", address: "Banani, Dhaka", avatar: null },
        { id: "PT-2025-000791", name: "Nusrat Jahan", age: 26, gender: "Female", phone: "015XXXXXXXXXX", email: "nusrat@example.com", address: "Dhanmondi, Dhaka", avatar: null },
        { id: "PT-2025-000792", name: "Sakib Khan", age: 41, gender: "Male", phone: "014XXXXXXXXXX", email: "sakib@example.com", address: "Mohammadpur, Dhaka", avatar: null },
        { id: "PT-2025-000793", name: "Sumaiya Akter", age: 30, gender: "Female", phone: "013XXXXXXXXXX", email: "sumaiya@example.com", address: "Khilgaon, Dhaka", avatar: null },
        { id: "PT-2025-000794", name: "Tanvir Hossain", age: 52, gender: "Male", phone: "012XXXXXXXXXX", email: "tanvir@example.com", address: "Wari, Dhaka", avatar: null },
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
            alert("Please select a patient first.");
            return;
        }
        const validMeds = medicines.filter((m) => m.name.trim() !== "");
        if (validMeds.length === 0) {
            alert("Please add at least one medicine.");
            return;
        }
        const newRx = {
            id: `RX-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
            patient: {
                name: selectedPatient.name,
                pid: selectedPatient.id,
                age: `${selectedPatient.age} Years, ${selectedPatient.gender}`,
            },
            date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
            time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
            medicines: validMeds.length,
            instructions: additionalInstructions.filter((i) => i.trim() !== "").length,
            status: "pending",
            _fullData: {
                prescriptionDate, visitType, prescriptionType, followUpDate,
                clinicalNotes, medicines: validMeds,
                additionalInstructions: additionalInstructions.filter((i) => i.trim() !== ""),
                doctor, patient: selectedPatient,
            },
        };
        // Save to localStorage so the list page can read it
        const existing = JSON.parse(localStorage.getItem("prescriptions") || "[]");
        localStorage.setItem("prescriptions", JSON.stringify([newRx, ...existing]));
        alert("Prescription saved successfully!");
        window.location.href = "/doctor-portal/prescriptions";
    };

    const handleSaveAsDraft = () => {
        console.log("Saving as draft");
        alert("Prescription saved as draft");
    };

    const handlePreview = async () => {
        setIsGenerating(true);
        const formData = buildPrescriptionDataFromForm({
            prescriptionDate, visitType, prescriptionType, followUpDate, clinicalNotes,
            medicines, additionalInstructions, selectedPatient, doctor,
        });
        const url = await generatePrescriptionPDF(formData, "preview");
        setPreviewUrl(url);
        setIsGenerating(false);
    };

    const handleClosePreview = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
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
                    <span className="nrx-breadcrumb-current">New Prescription</span>
                </div>
                <div className="nrx-header-actions">
                    <Link href="/doctor-portal/prescriptions" className="nrx-header-btn back">
                        <ArrowLeft size={16} /> Back
                    </Link>
                    <button className="nrx-header-btn outline" onClick={handlePreview} disabled={isGenerating}>
                        <Eye size={16} /> {isGenerating ? "Generating…" : "Preview"}
                    </button>
                    <button className="nrx-header-btn primary" onClick={handleSavePrescription}>
                        <Save size={16} /> Save Prescription
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
                            <FileText size={16} /> Prescription Information
                        </h3>
                        <div className="nrx-form-grid">
                            <div className="nrx-form-group">
                                <label className="nrx-label">
                                    Prescription Date <span className="nrx-required">*</span>
                                </label>
                                <div className="nrx-input-wrap">
                                    <span className="nrx-input-icon">
                                        <Calendar size={16} />
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
                            <div className="nrx-form-group">
                                <label className="nrx-label">Prescription Type</label>
                                <div className="nrx-type-selector">
                                    <button
                                        type="button"
                                        className={`nrx-type-btn ${prescriptionType === "new" ? "active" : ""}`}
                                        onClick={() => setPrescriptionType("new")}
                                    >
                                        <FileText size={14} /> New Prescription
                                    </button>
                                    <button
                                        type="button"
                                        className={`nrx-type-btn ${prescriptionType === "refill" ? "active" : ""}`}
                                        onClick={() => setPrescriptionType("refill")}
                                    >
                                        <Clipboard size={14} /> Refill
                                    </button>
                                    <button
                                        type="button"
                                        className={`nrx-type-btn ${prescriptionType === "repeat" ? "active" : ""}`}
                                        onClick={() => setPrescriptionType("repeat")}
                                    >
                                        <Clock size={14} /> Repeat
                                    </button>
                                </div>
                            </div>
                            <div className="nrx-form-group">
                                <label className="nrx-label">Follow-up Date</label>
                                <div className="nrx-input-wrap">
                                    <span className="nrx-input-icon">
                                        <Calendar size={16} />
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
                                <label className="nrx-label">Prescription Notes</label>
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
                            <Pill size={16} /> Prescribed Medicines
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
                                                    <Trash2 size={14} />
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
                                            <Trash2 size={14} />
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
                            <Plus size={14} /> Add Medicine
                        </button>
                    </div>

                    {/* Additional Instructions Card */}
                    <div className="nrx-card">
                        <h3 className="nrx-section-title">
                            <Clipboard size={16} /> Additional Instructions
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
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="nrx-add-instr-btn" onClick={addInstruction}>
                            <Plus size={14} /> Add Instruction
                        </button>
                    </div>
                </div>

                {/* Right Column */}
                <div className="nrx-right-col">
                    {/* Patient Search Card */}
                    <div className="nrx-patient-search-card">
                        <h4 className="nrx-right-section-title">Patient Information</h4>
                        {!selectedPatient ? (
                            <>
                                <div className="nrx-patient-dropdown-wrap">
                                    <label className="nrx-label" style={{ marginBottom: 6, display: "block" }}>
                                        Select Today's Patient <span className="nrx-required">*</span>
                                    </label>
                                    <div className="nrx-patient-select-box">
                                        <User size={16} />
                                        <select
                                            className="nrx-patient-native-select"
                                            value=""
                                            onChange={(e) => {
                                                const found = mockPatients.find((p) => p.id === e.target.value);
                                                if (found) handleSelectPatient(found);
                                            }}
                                        >
                                            <option value="" disabled>Select a patient…</option>
                                            {mockPatients.map((p) => (
                                                <option key={p.id} value={p.id}>
                                                    {p.name}  ·  {p.id}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="nrx-selected-patient">
                                    <div className="nrx-sel-patient-avatar">
                                        {selectedPatient.avatar ? (
                                            <img src={selectedPatient.avatar} alt="" />
                                        ) : (
                                            <User size={16} />
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
                                        <X size={14} />
                                    </button>
                                </div>
                                <div className="nrx-patient-detail-rows">
                                    <div className="nrx-patient-detail-row">
                                        <Phone size={14} /> {selectedPatient.phone}
                                    </div>
                                    <div className="nrx-patient-detail-row">
                                        <Mail size={14} /> {selectedPatient.email}
                                    </div>
                                    <div className="nrx-patient-detail-row">
                                        <MapPin size={14} /> {selectedPatient.address}
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

                    {/* Attachments Card */}
                    <div className="nrx-card">
                        <h3 className="nrx-section-title">
                            <Paperclip size={16} /> Attachments
                        </h3>
                        <div
                            className={`nrx-upload-zone ${isDragOver ? "drag-over" : ""}`}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                        >
                            <div className="nrx-upload-icon">
                                <Upload size={24} />
                            </div>
                            <p className="nrx-upload-title">Drag & drop files here</p>
                            <p className="nrx-upload-sub">or</p>
                            <label className="nrx-upload-btn-label">
                                <Upload size={14} /> Browse Files
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
                                        <div className="nrx-file-icon">
                                            <File size={16} />
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
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {previewUrl && (
                <PrescriptionPreviewModal
                    pdfUrl={previewUrl}
                    onClose={handleClosePreview}
                />
            )}
        </>
    );
}