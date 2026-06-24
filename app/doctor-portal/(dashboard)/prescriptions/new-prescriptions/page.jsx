"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { API_URL } from "@/config";
import { useAppSelector } from "@/redux/hook";
import {
    generatePrescriptionPDF,
    buildPrescriptionDataFromForm,
} from "@/utils/prescriptionPDF";
import PrescriptionPreviewModal from "@/components/PrescriptionPreviewModal";

import "./new-prescriptions.css";

function Icon({ type }) {
    const icons = {
        arrowLeft: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
        ),
        save: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
            </svg>
        ),
        plus: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
            </svg>
        ),
        trash: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
        ),
        user: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        ),
        calendar: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        ),
        clock: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        phone: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 3.08 4.18 2 2 0 0 1 5.06 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.77.66 2.6a2 2 0 0 1-.45 2.11L9 9.7a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.83.32 1.7.54 2.6.66A2 2 0 0 1 22 16.92z" />
            </svg>
        ),
        mail: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
        fileText: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
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
                <rect x="8" y="2" width="8" height="4" rx="1" />
            </svg>
        ),
        x: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        ),
    };

    return icons[type] || null;
}

const createEmptyMedicine = () => ({
    id: crypto.randomUUID(),
    medicineName: "",
    dosage: "",
    frequency: "",
    duration: "",
    instruction: "",
});

const createEmptyTest = () => ({
    id: crypto.randomUUID(),
    testName: "",
    instruction: "",
});

const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-GB");
};

const formatTime = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleTimeString("en-BD", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

export default function NewPrescriptionPage() {
    const router = useRouter();
    const token = useAppSelector((state) => state.auth.accessToken);

    const searchParams = useSearchParams();
    const patientId = searchParams.get("patientId");

    const [doctorPatients, setDoctorPatients] = useState([]);
    const [patientsLoading, setPatientsLoading] = useState(false);

    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientAppointments, setPatientAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [appointmentLoading, setAppointmentLoading] = useState(false);

    const [chiefComplaint, setChiefComplaint] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [advice, setAdvice] = useState("");
    const [followUpDate, setFollowUpDate] = useState("");

    const [medicines, setMedicines] = useState([createEmptyMedicine()]);
    const [tests, setTests] = useState([createEmptyTest()]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [previewUrl, setPreviewUrl] = useState(null);
    const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);

    const validMedicines = useMemo(
        () => medicines.filter((item) => item.medicineName.trim()),
        [medicines]
    );

    const validTests = useMemo(
        () => tests.filter((item) => item.testName.trim()),
        [tests]
    );

    const summary = {
        medicines: validMedicines.length,
        tests: validTests.length,
        appointment: selectedAppointment?.appointmentCode || "Not selected",
        followUp: followUpDate || "Not set",
    };

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        setSelectedAppointment(null);
        setPatientAppointments([]);
    };

    const handleClearPatient = () => {
        setSelectedPatient(null);
        setSelectedAppointment(null);
        setPatientAppointments([]);
    };

    const updateMedicine = (id, field, value) => {
        setMedicines((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    const addMedicine = () => {
        setMedicines((prev) => [...prev, createEmptyMedicine()]);
    };

    const removeMedicine = (id) => {
        setMedicines((prev) => {
            if (prev.length === 1) return prev;
            return prev.filter((item) => item.id !== id);
        });
    };

    const updateTest = (id, field, value) => {
        setTests((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    const addTest = () => {
        setTests((prev) => [...prev, createEmptyTest()]);
    };

    const removeTest = (id) => {
        setTests((prev) => {
            if (prev.length === 1) return prev;
            return prev.filter((item) => item.id !== id);
        });
    };

    const validateForm = () => {
        if (!selectedPatient) return "Please select a patient.";
        if (!selectedAppointment) return "Please select an appointment.";
        if (!chiefComplaint.trim()) return "Chief complaint is required.";
        if (!diagnosis.trim()) return "Diagnosis is required.";
        if (!advice.trim()) return "Advice is required.";
        if (!followUpDate) return "Follow-up date is required.";
        if (validMedicines.length === 0) return "Please add at least one medicine.";

        for (const medicine of validMedicines) {
            if (!medicine.dosage.trim()) return "Medicine dosage is required.";
            if (!medicine.frequency.trim()) return "Medicine frequency is required.";
            if (!medicine.duration.trim()) return "Medicine duration is required.";
        }

        return "";
    };

    const handleCreatePrescription = async () => {
        const validationError = validateForm();

        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        try {
            setIsSubmitting(true);
            setErrorMessage("");

            const payload = {
                appointmentId: selectedAppointment.id,
                chiefComplaint: chiefComplaint.trim(),
                diagnosis: diagnosis.trim(),
                advice: advice.trim(),
                followUpDate,
                medicines: validMedicines.map((medicine) => ({
                    medicineName: medicine.medicineName.trim(),
                    dosage: medicine.dosage.trim(),
                    frequency: medicine.frequency.trim(),
                    duration: medicine.duration.trim(),
                    instruction: medicine.instruction.trim(),
                })),
                tests: validTests.map((test) => ({
                    testName: test.testName.trim(),
                    instruction: test.instruction.trim(),
                })),
            };

            const response = await fetch(`${API_URL}/prescription/create`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result?.message || "Failed to create prescription.");
            }

            alert("Prescription created successfully.");

            router.push("/doctor-portal/prescriptions");
        } catch (error) {
            setErrorMessage(error.message || "Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePreview = async () => {
        const validationError = validateForm();

        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        try {
            setIsGeneratingPreview(true);
            setErrorMessage("");

            const previewMedicines = validMedicines.map((medicine) => ({
                id: medicine.id,
                name: medicine.medicineName,
                formStrength: "",
                dose: medicine.dosage,
                frequency: medicine.frequency,
                customFrequency: "",
                duration: medicine.duration,
                customDuration: "",
                instructions: medicine.instruction,
            }));

            const previewTests = validTests.map((test) => ({
                testName: test.testName || "",
                instruction: test.instruction || "",
            }));

            const formData = buildPrescriptionDataFromForm({
                prescriptionDate: new Date().toISOString().split("T")[0],
                visitType: selectedAppointment?.type || "OPD",
                prescriptionType: "new",
                followUpDate,
                clinicalNotes: `Chief Complaint: ${chiefComplaint}\nDiagnosis: ${diagnosis}\nAdvice: ${advice}`,
                medicines: previewMedicines,
                additionalInstructions: [],
                tests: previewTests,

                selectedPatient: {
                    id: selectedPatient?.id || selectedPatient?.patientId || "",
                    name: selectedPatient?.fullName || "",
                    age: selectedPatient?.age || "",
                    gender: selectedPatient?.gender || "",
                    phone: selectedPatient?.mobileNumber || "",
                    email: selectedPatient?.email || "",
                    address: selectedPatient?.address || "",
                },

                doctor: {
                    name: selectedAppointment?.doctor?.fullName || "Doctor",
                    specialization: selectedAppointment?.doctor?.specialization?.name || "",
                    department: selectedAppointment?.doctor?.specialization?.name || "",
                    employeeId: selectedAppointment?.doctor?.id || "",
                    email: selectedAppointment?.doctor?.email || "",
                    phone: selectedAppointment?.doctor?.mobile || "",
                },
            });

            const url = await generatePrescriptionPDF(formData, "preview");
            setPreviewUrl(url);
        } catch (error) {
            console.error("Preview generation error:", error);
            setErrorMessage(error?.message || "Failed to generate preview.");
        } finally {
            setIsGeneratingPreview(false);
        }
    };

    const handleClosePreview = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }

        setPreviewUrl(null);
    };

    useEffect(() => {
        if (!token) return;

        const fetchDoctorPatients = async () => {
            try {
                setPatientsLoading(true);

                const response = await fetch(`${API_URL}/appointments/doctor/patients`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const result = await response.json();

                if (result.success) {
                    setDoctorPatients(Array.isArray(result.data) ? result.data : []);
                }
            } catch (error) {
                console.error("Failed to fetch doctor patients:", error);
            } finally {
                setPatientsLoading(false);
            }
        };

        fetchDoctorPatients();
    }, [token]);

    useEffect(() => {
        if (!patientId || doctorPatients.length === 0) return;

        const foundPatient = doctorPatients.find(
            (patient) => patient.id === patientId || patient.patientId === patientId
        );

        if (foundPatient) {
            handleSelectPatient(foundPatient);
        }
    }, [patientId, doctorPatients]);

    useEffect(() => {
        if (!token || !selectedPatient) return;

        const patientIdForApi = selectedPatient.id || selectedPatient.patientId;

        const fetchPatientAppointments = async () => {
            try {
                setAppointmentLoading(true);

                const response = await fetch(
                    `${API_URL}/appointments/patient/${patientIdForApi}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const result = await response.json();

                if (result.success) {
                    setPatientAppointments(result?.data?.appointments || []);
                }
            } catch (error) {
                console.error("Failed to fetch patient appointments:", error);
                setPatientAppointments([]);
            } finally {
                setAppointmentLoading(false);
            }
        };

        fetchPatientAppointments();
    }, [token, selectedPatient]);

    return (
        <>
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

                    {/* <button
                        type="button"
                        className="nrx-header-btn outline"
                        onClick={handlePreview}
                        disabled={isGeneratingPreview}
                    >
                        <Icon type="fileText" />
                        {isGeneratingPreview ? "Generating..." : "Preview"}
                    </button> */}

                    <button
                        type="button"
                        className="nrx-header-btn primary"
                        onClick={handleCreatePrescription}
                        disabled={isSubmitting}
                    >
                        <Icon type="save" />
                        {isSubmitting ? "Saving..." : "Create Prescription"}
                    </button>
                </div>
            </div>

            {errorMessage && (
                <div className="nrx-card" style={{ borderColor: "#fecaca", color: "#b91c1c" }}>
                    {errorMessage}
                </div>
            )}

            <div className="nrx-layout">
                <div className="nrx-left-col">
                    <div className="nrx-card">
                        <h3 className="nrx-section-title">
                            <Icon type="fileText" /> Patient Assessment
                        </h3>

                        <div className="nrx-form-grid">
                            <div className="nrx-form-group full-width">
                                <label className="nrx-label">
                                    Chief Complaint <span className="nrx-required">*</span>
                                </label>
                                <textarea
                                    className="nrx-textarea"
                                    rows="3"
                                    placeholder="Example: Fever, headache and body pain for 3 days"
                                    value={chiefComplaint}
                                    onChange={(event) => setChiefComplaint(event.target.value)}
                                />
                            </div>

                            <div className="nrx-form-group full-width">
                                <label className="nrx-label">
                                    Diagnosis <span className="nrx-required">*</span>
                                </label>
                                <textarea
                                    className="nrx-textarea"
                                    rows="3"
                                    placeholder="Example: Viral Fever"
                                    value={diagnosis}
                                    onChange={(event) => setDiagnosis(event.target.value)}
                                />
                            </div>

                            <div className="nrx-form-group full-width">
                                <label className="nrx-label">
                                    Advice <span className="nrx-required">*</span>
                                </label>
                                <textarea
                                    className="nrx-textarea"
                                    rows="3"
                                    placeholder="Example: Take rest, drink plenty of water and avoid cold drinks"
                                    value={advice}
                                    onChange={(event) => setAdvice(event.target.value)}
                                />
                            </div>

                            <div className="nrx-form-group">
                                <label className="nrx-label">
                                    Follow-up Date <span className="nrx-required">*</span>
                                </label>
                                <div className="nrx-input-wrap">
                                    <span className="nrx-input-icon">
                                        <Calendar size={16} />
                                    </span>
                                    <input
                                        type="date"
                                        className="nrx-input"
                                        value={followUpDate}
                                        onChange={(event) => setFollowUpDate(event.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="nrx-card">
                        <h3 className="nrx-section-title">
                            <Icon type="pill" /> Medicines
                        </h3>

                        <div className="nrx-med-table-wrap">
                            <table className="nrx-med-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Medicine</th>
                                        <th>Dosage</th>
                                        <th>Frequency</th>
                                        <th>Duration</th>
                                        <th>Instruction</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {medicines.map((medicine, index) => (
                                        <tr key={medicine.id}>
                                            <td>{index + 1}</td>

                                            <td>
                                                <input
                                                    type="text"
                                                    className="nrx-cell-input"
                                                    placeholder="Napa Extra"
                                                    value={medicine.medicineName}
                                                    onChange={(event) =>
                                                        updateMedicine(medicine.id, "medicineName", event.target.value)
                                                    }
                                                />
                                            </td>

                                            <td>
                                                <input
                                                    type="text"
                                                    className="nrx-cell-input"
                                                    placeholder="1 Tablet"
                                                    value={medicine.dosage}
                                                    onChange={(event) =>
                                                        updateMedicine(medicine.id, "dosage", event.target.value)
                                                    }
                                                />
                                            </td>

                                            <td>
                                                <select
                                                    className="nrx-cell-select"
                                                    value={medicine.frequency}
                                                    onChange={(event) =>
                                                        updateMedicine(medicine.id, "frequency", event.target.value)
                                                    }
                                                >
                                                    <option value="">Select</option>
                                                    <option value="1+1+1">1+1+1</option>
                                                    <option value="1+0+1">1+0+1</option>
                                                    <option value="1+0+0">1+0+0</option>
                                                    <option value="0+1+0">0+1+0</option>
                                                    <option value="0+0+1">0+0+1</option>
                                                    <option value="1+1+0">1+1+0</option>
                                                    <option value="Every 6 Hours">Every 6 Hours</option>
                                                    <option value="Every 8 Hours">Every 8 Hours</option>
                                                    <option value="As Needed">As Needed</option>
                                                </select>
                                            </td>

                                            <td>
                                                <input
                                                    type="text"
                                                    className="nrx-cell-input"
                                                    placeholder="5 Days"
                                                    value={medicine.duration}
                                                    onChange={(event) =>
                                                        updateMedicine(medicine.id, "duration", event.target.value)
                                                    }
                                                />
                                            </td>

                                            <td>
                                                <input
                                                    type="text"
                                                    className="nrx-cell-input"
                                                    placeholder="After Meal"
                                                    value={medicine.instruction}
                                                    onChange={(event) =>
                                                        updateMedicine(medicine.id, "instruction", event.target.value)
                                                    }
                                                />
                                            </td>

                                            <td>
                                                <button
                                                    type="button"
                                                    className="nrx-row-del-btn"
                                                    onClick={() => removeMedicine(medicine.id)}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <button type="button" className="nrx-add-row-btn" onClick={addMedicine}>
                            <Icon type="plus" /> Add Medicine
                        </button>
                    </div>

                    <div className="nrx-card">
                        <h3 className="nrx-section-title">
                            <Icon type="clipboard" /> Recommended Tests
                        </h3>

                        <div className="nrx-med-table-wrap">
                            <table className="nrx-med-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Test Name</th>
                                        <th>Instruction</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {tests.map((test, index) => (
                                        <tr key={test.id}>
                                            <td>{index + 1}</td>

                                            <td>
                                                <input
                                                    type="text"
                                                    className="nrx-cell-input"
                                                    placeholder="CBC"
                                                    value={test.testName}
                                                    onChange={(event) =>
                                                        updateTest(test.id, "testName", event.target.value)
                                                    }
                                                />
                                            </td>

                                            <td>
                                                <input
                                                    type="text"
                                                    className="nrx-cell-input"
                                                    placeholder="Complete Blood Count"
                                                    value={test.instruction}
                                                    onChange={(event) =>
                                                        updateTest(test.id, "instruction", event.target.value)
                                                    }
                                                />
                                            </td>

                                            <td>
                                                <button
                                                    type="button"
                                                    className="nrx-row-del-btn"
                                                    onClick={() => removeTest(test.id)}
                                                >
                                                    <Icon type="trash" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <button type="button" className="nrx-add-row-btn" onClick={addTest}>
                            <Icon type="plus" /> Add Test
                        </button>
                    </div>
                </div>

                <div className="nrx-right-col">
                    <div className="nrx-patient-search-card">
                        <h4 className="nrx-right-section-title">Patient Information</h4>

                        {!selectedPatient ? (
                            <div className="nrx-patient-dropdown-wrap">
                                <label className="nrx-label" style={{ marginBottom: 6, display: "block" }}>
                                    Select Patient <span className="nrx-required">*</span>
                                </label>

                                <div className="nrx-patient-select-box">
                                    <Icon type="user" />

                                    <select
                                        className="nrx-patient-native-select"
                                        value=""
                                        disabled={patientsLoading}
                                        onChange={(event) => {
                                            const found = doctorPatients.find(
                                                (patient) =>
                                                    patient.id === event.target.value ||
                                                    patient.patientId === event.target.value
                                            );

                                            if (found) handleSelectPatient(found);
                                        }}
                                    >
                                        <option value="" disabled>
                                            {patientsLoading ? "Loading patients..." : "Select a patient..."}
                                        </option>

                                        {doctorPatients.map((patient) => (
                                            <option
                                                key={patient.id || patient.patientId}
                                                value={patient.id || patient.patientId}
                                            >
                                                {patient.fullName} · {patient.patientCode || "No Code"}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="nrx-selected-patient">
                                    <div className="nrx-sel-patient-avatar">
                                        <Icon type="user" />
                                    </div>

                                    <div>
                                        <p className="nrx-sel-patient-name">{selectedPatient.fullName}</p>
                                        <p className="nrx-sel-patient-meta">
                                            {selectedPatient.age || "N/A"} yrs, {selectedPatient.gender || "N/A"}
                                        </p>
                                        <p className="nrx-sel-patient-pid">
                                            {selectedPatient.patientCode || selectedPatient.id}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="nrx-clear-patient-btn"
                                        onClick={handleClearPatient}
                                    >
                                        <Icon type="x" />
                                    </button>
                                </div>

                                <div className="nrx-patient-detail-rows">
                                    <div className="nrx-patient-detail-row">
                                        <Icon type="phone" /> {selectedPatient.mobileNumber || "N/A"}
                                    </div>
                                    <div className="nrx-patient-detail-row">
                                        <Icon type="mail" /> {selectedPatient.email || "N/A"}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="nrx-patient-search-card">
                        <h4 className="nrx-right-section-title">Appointment Information</h4>

                        {!selectedPatient ? (
                            <p className="nrx-empty-text">Select a patient first.</p>
                        ) : appointmentLoading ? (
                            <p className="nrx-empty-text">Loading appointments...</p>
                        ) : patientAppointments.length === 0 ? (
                            <p className="nrx-empty-text">No appointment found for this patient.</p>
                        ) : (
                            <div className="nrx-patient-dropdown-wrap">
                                <label className="nrx-label" style={{ marginBottom: 6, display: "block" }}>
                                    Select Appointment <span className="nrx-required">*</span>
                                </label>

                                <div className="nrx-patient-select-box">
                                    <Icon type="calendar" />

                                    <select
                                        className="nrx-patient-native-select"
                                        value={selectedAppointment?.id || ""}
                                        onChange={(event) => {
                                            const found = patientAppointments.find(
                                                (appointment) => appointment.id === event.target.value
                                            );

                                            setSelectedAppointment(found || null);
                                        }}
                                    >
                                        <option value="" disabled>
                                            Select an appointment...
                                        </option>

                                        {patientAppointments.map((appointment) => (
                                            <option key={appointment.id} value={appointment.id}>
                                                {formatDate(appointment.appointmentDate)} •{" "}
                                                {formatTime(appointment.startTime)} • {appointment.reason}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        {selectedAppointment && (
                            <div className="nrx-patient-detail-rows" style={{ marginTop: 12 }}>
                                <div className="nrx-patient-detail-row">
                                    <Icon type="calendar" />
                                    {formatDate(selectedAppointment.appointmentDate)}
                                </div>

                                <div className="nrx-patient-detail-row">
                                    <Icon type="clock" />
                                    {formatTime(selectedAppointment.startTime)} -{" "}
                                    {formatTime(selectedAppointment.endTime)}
                                </div>

                                <div className="nrx-patient-detail-row">
                                    <Icon type="fileText" />
                                    {selectedAppointment.type} · {selectedAppointment.status}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="nrx-summary-card">
                        <h4 className="nrx-right-section-title">Prescription Summary</h4>

                        <div className="nrx-summary-rows">
                            <div className="nrx-summary-row">
                                <span className="nrx-summary-key">Appointment</span>
                                <span className="nrx-summary-val blue">{summary.appointment}</span>
                            </div>

                            <div className="nrx-summary-row">
                                <span className="nrx-summary-key">Medicines</span>
                                <span className="nrx-summary-val">{summary.medicines}</span>
                            </div>

                            <div className="nrx-summary-row">
                                <span className="nrx-summary-key">Tests</span>
                                <span className="nrx-summary-val">{summary.tests}</span>
                            </div>

                            <div className="nrx-summary-row">
                                <span className="nrx-summary-key">Follow-up</span>
                                <span className="nrx-summary-val green">{summary.followUp}</span>
                            </div>
                        </div>
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