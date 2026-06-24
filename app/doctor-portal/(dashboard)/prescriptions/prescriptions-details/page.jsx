"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { API_URL } from "@/config";
import { useAppSelector } from "@/redux/hook";
import { generatePrescriptionPDF } from "@/utils/prescriptionPDF";
import PrescriptionPreviewModal from "@/components/PrescriptionPreviewModal";
import "./prescriptions-details.css";

function Icon({ type }) {
  const icons = {
    back: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    ),
    print: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
    ),
    download: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
    eye: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    rx: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414A1 1 0 0 1 19 9.414V19a2 2 0 0 1-2 2z" />
      </svg>
    ),
    pill: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7z" />
        <line x1="8.5" y1="8.5" x2="15.5" y2="15.5" />
      </svg>
    ),
    info: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    user: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
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
    calendar: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    test: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 2v6l-4 8a4 4 0 0 0 3.6 6h6.8A4 4 0 0 0 19 16l-4-8V2" />
        <path d="M8 2h8" />
        <path d="M7 14h10" />
      </svg>
    ),
  };

  return icons[type] || null;
}

const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleTimeString("en-BD", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return "N/A";

  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const getInitials = (name = "") => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const buildPdfData = (rx) => ({
  prescriptionId: rx.prescriptionCode,
  prescriptionDate: formatDate(rx.createdAt),
  prescriptionTime: formatTime(rx.createdAt),
  visitType: rx.appointment?.type || "OPD",
  prescriptionType: "New Prescription",
  status: "completed",

  doctor: {
    name: rx.doctor?.fullName || "Doctor",
    specialization: rx.doctor?.specialization?.name || "",
    department: rx.doctor?.specialization?.name || "",
    employeeId: rx.doctor?.id || "",
    email: "",
    phone: "",
  },

  patient: {
    name: rx.patient?.fullName || rx.appointment?.patientName || "N/A",
    pid: rx.patient?.id || rx.patientId || "N/A",
    ageGender: `${calculateAge(rx.patient?.dateOfBirth)} yrs, ${rx.patient?.gender || "N/A"}`,
    phone: rx.patient?.mobileNumber || rx.appointment?.patientPhone || "",
    email: rx.patient?.email || rx.appointment?.patientEmail || "",
  },

  clinicalNotes: `Chief Complaint: ${rx.chiefComplaint || ""}\nDiagnosis: ${rx.diagnosis || ""}\nAdvice: ${rx.advice || ""}`,

  medicines: (rx.medicines || []).map((medicine) => ({
    name: medicine.medicineName,
    formStrength: "",
    dose: medicine.dosage,
    frequency: medicine.frequency,
    duration: medicine.duration,
    instructions: medicine.instruction,
  })),

  tests: (rx.tests || []).map((test) => ({
    testName: test.testName,
    instruction: test.instruction,
  })),

  additionalInstructions: [],
  followUpDate: rx.followUpDate ? formatDate(rx.followUpDate) : "",
});

export default function PrescriptionDetailsPage() {
  const token = useAppSelector((state) => state.auth.accessToken);
  const searchParams = useSearchParams();

  const prescriptionId = searchParams.get("id");

  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const patientAgeGender = useMemo(() => {
    if (!prescription?.patient) return "N/A";

    return `${calculateAge(prescription.patient.dateOfBirth)} yrs, ${
      prescription.patient.gender || "N/A"
    }`;
  }, [prescription]);

  const fetchPrescriptionDetails = async () => {
    if (!token || !prescriptionId) return;

    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(`${API_URL}/prescription/${prescriptionId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to load prescription details.");
      }

      setPrescription(result.data || null);
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong.");
      setPrescription(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptionDetails();
  }, [token, prescriptionId]);

  const handlePreview = async () => {
    if (!prescription) return;

    try {
      setIsGenerating(true);
      const url = await generatePrescriptionPDF(buildPdfData(prescription), "preview");
      setPreviewUrl(url);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!prescription) return;

    try {
      setIsGenerating(true);
      await generatePrescriptionPDF(buildPdfData(prescription), "download");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = async () => {
    if (!prescription) return;

    try {
      setIsGenerating(true);
      await generatePrescriptionPDF(buildPdfData(prescription), "print");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClosePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);
  };

  if (!prescriptionId) {
    return (
      <div className="rxd-card">
        <p style={{ color: "#b91c1c", margin: 0 }}>Prescription id is missing.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rxd-card">
        <p style={{ margin: 0 }}>Loading prescription details...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="rxd-card">
        <p style={{ color: "#b91c1c", margin: 0 }}>{errorMessage}</p>
      </div>
    );
  }

  if (!prescription) {
    return (
      <div className="rxd-card">
        <p style={{ margin: 0 }}>Prescription not found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rxd-sub-header">
        <div className="rxd-breadcrumb">
          <Link href="/doctor-portal/prescriptions">Prescriptions</Link>
          <span className="rxd-breadcrumb-sep">›</span>
          <span className="rxd-breadcrumb-current">{prescription.prescriptionCode}</span>
        </div>

        <div className="rxd-header-actions">
          <Link href="/doctor-portal/prescriptions" className="rxd-header-btn back">
            <Icon type="back" /> Back
          </Link>

          <button className="rxd-header-btn outline" onClick={handlePreview} disabled={isGenerating}>
            <Icon type="eye" /> Preview
          </button>

          <button className="rxd-header-btn outline" onClick={handlePrint} disabled={isGenerating}>
            <Icon type="print" /> Print
          </button>

          <button className="rxd-header-btn primary" onClick={handleDownload} disabled={isGenerating}>
            <Icon type="download" /> {isGenerating ? "Generating..." : "Download"}
          </button>
        </div>
      </div>

      <div className="rxd-layout">
        <div className="rxd-left-col">
          <div className="rxd-card">
            <h3 className="rxd-section-title">
              <Icon type="rx" /> Prescription Overview
            </h3>

            <div className="rxd-info-grid">
              <div>
                <div className="rxd-info-row">
                  <span className="rxd-info-label">Prescription Code</span>
                  <span className="rxd-info-colon">:</span>
                  <span className="rxd-info-value">{prescription.prescriptionCode}</span>
                </div>

                <div className="rxd-info-row">
                  <span className="rxd-info-label">Created</span>
                  <span className="rxd-info-colon">:</span>
                  <span className="rxd-info-value">
                    {formatDate(prescription.createdAt)} {formatTime(prescription.createdAt)}
                  </span>
                </div>

                <div className="rxd-info-row">
                  <span className="rxd-info-label">Appointment</span>
                  <span className="rxd-info-colon">:</span>
                  <span className="rxd-info-value">
                    {prescription.appointment?.appointmentCode || "N/A"}
                  </span>
                </div>

                <div className="rxd-info-row">
                  <span className="rxd-info-label">Visit Type</span>
                  <span className="rxd-info-colon">:</span>
                  <span className="rxd-info-value">{prescription.appointment?.type || "N/A"}</span>
                </div>
              </div>

              <div>
                <div className="rxd-info-row">
                  <span className="rxd-info-label">Doctor</span>
                  <span className="rxd-info-colon">:</span>
                  <span className="rxd-info-value sub">
                    {prescription.doctor?.fullName || "N/A"}
                    <span>{prescription.doctor?.qualification || ""}</span>
                  </span>
                </div>

                <div className="rxd-info-row">
                  <span className="rxd-info-label">Designation</span>
                  <span className="rxd-info-colon">:</span>
                  <span className="rxd-info-value">
                    {prescription.doctor?.currentDesignation || "N/A"}
                  </span>
                </div>

                <div className="rxd-info-row">
                  <span className="rxd-info-label">Department</span>
                  <span className="rxd-info-colon">:</span>
                  <span className="rxd-info-value">
                    {prescription.doctor?.specialization?.name || "N/A"}
                  </span>
                </div>

                <div className="rxd-info-row">
                  <span className="rxd-info-label">Follow-up</span>
                  <span className="rxd-info-colon">:</span>
                  <span className="rxd-info-value blue">
                    {formatDate(prescription.followUpDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rxd-card">
            <h3 className="rxd-section-title">
              <Icon type="info" /> Clinical Assessment
            </h3>

            <div className="rxd-info-grid">
              <div>
                <div className="rxd-info-row">
                  <span className="rxd-info-label">Chief Complaint</span>
                  <span className="rxd-info-colon">:</span>
                  <span className="rxd-info-value">
                    {prescription.chiefComplaint || "N/A"}
                  </span>
                </div>

                <div className="rxd-info-row">
                  <span className="rxd-info-label">Diagnosis</span>
                  <span className="rxd-info-colon">:</span>
                  <span className="rxd-info-value">
                    {prescription.diagnosis || "N/A"}
                  </span>
                </div>
              </div>

              <div>
                <div className="rxd-info-row">
                  <span className="rxd-info-label">Advice</span>
                  <span className="rxd-info-colon">:</span>
                  <span className="rxd-info-value">
                    {prescription.advice || "N/A"}
                  </span>
                </div>

                <div className="rxd-info-row">
                  <span className="rxd-info-label">Appointment Reason</span>
                  <span className="rxd-info-colon">:</span>
                  <span className="rxd-info-value">
                    {prescription.appointment?.reason || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rxd-card">
            <h3 className="rxd-medicines-title">
              <Icon type="pill" /> Prescribed Medicines
            </h3>

            <table className="rxd-med-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Medicine</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Duration</th>
                  <th>Instruction</th>
                </tr>
              </thead>

              <tbody>
                {prescription.medicines?.length ? (
                  prescription.medicines.map((medicine, index) => (
                    <tr key={medicine.id}>
                      <td>{index + 1}</td>
                      <td>
                        <p className="rxd-med-name">{medicine.medicineName}</p>
                      </td>
                      <td>{medicine.dosage}</td>
                      <td>{medicine.frequency}</td>
                      <td>{medicine.duration}</td>
                      <td>{medicine.instruction || "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: 20 }}>
                      No medicines added.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="rxd-card">
            <h3 className="rxd-medicines-title">
              <Icon type="test" /> Diagnostic Tests
            </h3>

            <table className="rxd-med-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Test Name</th>
                  <th>Instruction</th>
                </tr>
              </thead>

              <tbody>
                {prescription.tests?.length ? (
                  prescription.tests.map((test, index) => (
                    <tr key={test.id}>
                      <td>{index + 1}</td>
                      <td>
                        <p className="rxd-med-name">{test.testName}</p>
                      </td>
                      <td>{test.instruction || "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center", padding: 20 }}>
                      No tests recommended.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rxd-right-col">
          <div className="rxd-patient-card">
            <div className="rxd-patient-card-header">
              <h4 className="rxd-patient-card-title">Patient Summary</h4>

              <Link
                href={`/doctor-portal/patients/patient-profile?id=${prescription.patient?.id}&from=/doctor-portal/prescriptions/prescriptions-details?id=${prescription.id}`}
                className="rxd-view-profile-link"
              >
                View Profile
              </Link>
            </div>

            <div className="rxd-patient-info-block">
              <div className="rxd-patient-avatar">
                <span>{getInitials(prescription.patient?.fullName)}</span>
              </div>

              <div>
                <p className="rxd-patient-name">{prescription.patient?.fullName || "N/A"}</p>
                <p className="rxd-patient-pid">{prescription.patient?.id || "N/A"}</p>
              </div>
            </div>

            <div className="rxd-patient-detail-rows">
              <div className="rxd-patient-detail-row">
                <Icon type="user" /> {patientAgeGender}
              </div>
              <div className="rxd-patient-detail-row">
                <Icon type="phone" /> {prescription.patient?.mobileNumber || "N/A"}
              </div>
              <div className="rxd-patient-detail-row">
                <Icon type="mail" /> {prescription.patient?.email || "N/A"}
              </div>
            </div>
          </div>

          <div className="rxd-summary-card">
            <h4 className="rxd-summary-title">Prescription Summary</h4>

            <div className="rxd-summary-rows">
              <div className="rxd-summary-row">
                <span className="rxd-summary-key">Medicines</span>
                <span className="rxd-summary-val">{prescription.medicines?.length || 0}</span>
              </div>

              <div className="rxd-summary-row">
                <span className="rxd-summary-key">Tests</span>
                <span className="rxd-summary-val">{prescription.tests?.length || 0}</span>
              </div>

              <div className="rxd-summary-row">
                <span className="rxd-summary-key">Appointment Status</span>
                <span className="rxd-summary-val blue">
                  {prescription.appointment?.status || "N/A"}
                </span>
              </div>

              <div className="rxd-summary-row">
                <span className="rxd-summary-key">Payment</span>
                <span className="rxd-summary-val">
                  {prescription.appointment?.paymentStatus || "N/A"}
                </span>
              </div>

              <div className="rxd-summary-row">
                <span className="rxd-summary-key">Follow-up</span>
                <span className="rxd-summary-val blue">
                  {formatDate(prescription.followUpDate)}
                </span>
              </div>
            </div>
          </div>

          <div className="rxd-notes-card">
            <h4 className="rxd-notes-title">Doctor Advice</h4>
            <p className="rxd-notes-text">{prescription.advice || "No advice added."}</p>
          </div>

          <div className="rxd-actions-card">
            <h4 className="rxd-actions-title">Quick Actions</h4>

            <div className="rxd-actions-grid">
              <button className="rxd-action-btn share" onClick={handlePreview} disabled={isGenerating}>
                <Icon type="eye" /> Preview
              </button>

              <button className="rxd-action-btn whatsapp" onClick={handleDownload} disabled={isGenerating}>
                <Icon type="download" /> Download
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