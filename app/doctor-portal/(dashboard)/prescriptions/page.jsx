"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { API_URL } from "@/config";
import { useAppSelector } from "@/redux/hook";
import { generatePrescriptionPDF } from "@/utils/prescriptionPDF";
import "./prescriptions.css";
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  RotateCcw,
  Search,
  ChevronDown,
  Plus,
  Download,
  Printer,
  Eye,
  User,
  ChevronLeft,
  ChevronRight,
  Pill,
  Stethoscope,
  Activity,
  Thermometer,
  Droplet,
  Gauge
} from "lucide-react";

const ITEMS_PER_PAGE = 10;

function Icon({ type, cls = "" }) {
  const icons = {
    rx: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414A1 1 0 0 1 19 9.414V19a2 2 0 0 1-2 2z" /></svg>,
    calendar: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    search: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>,
    filter: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>,
    reset: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4" /></svg>,
    plus: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    download: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    print: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>,
    eye: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    user: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    chev_left: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>,
    chev_right: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>,
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

const buildPdfData = (rx) => {
  return {
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
  };
};

export default function PrescriptionsPage() {
  const token = useAppSelector((state) => state.auth.accessToken);

  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPrescriptions = async () => {
    if (!token) return;

    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(`${API_URL}/prescription/my`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to load prescriptions.");
      }

      setPrescriptions(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong.");
      setPrescriptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, [token]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedPatient, dateFrom, dateTo]);

  const patientList = useMemo(() => {
    const map = new Map();

    prescriptions.forEach((rx) => {
      const patient = rx.patient;
      if (patient?.id && patient?.fullName) {
        map.set(patient.id, patient);
      }
    });

    return Array.from(map.values());
  }, [prescriptions]);

  const stats = useMemo(() => {
    const today = new Date().toDateString();

    return [
      {
        label: "Total Prescriptions",
        value: prescriptions.length,
        sub: "All prescriptions",
        color: "green",
        icon: "rx",
      },
      {
        label: "Today's Prescriptions",
        value: prescriptions.filter((rx) => new Date(rx.createdAt).toDateString() === today).length,
        sub: "Created today",
        color: "blue",
        icon: "calendar",
      },
      {
        label: "Medicines",
        value: prescriptions.reduce((sum, rx) => sum + (rx.medicines?.length || 0), 0),
        sub: "Total prescribed",
        color: "teal",
        icon: "rx",
      },
      {
        label: "Tests",
        value: prescriptions.reduce((sum, rx) => sum + (rx.tests?.length || 0), 0),
        sub: "Recommended tests",
        color: "yellow",
        icon: "calendar",
      },
      {
        label: "Follow-ups",
        value: prescriptions.filter((rx) => rx.followUpDate).length,
        sub: "Follow-up scheduled",
        color: "blue",
        icon: "calendar",
      }
    ];
  }, [prescriptions]);

  const filteredPrescriptions = useMemo(() => {
    const query = search.trim().toLowerCase();

    return prescriptions.filter((rx) => {
      const patientName = rx.patient?.fullName || "";
      const patientCode = rx.patient?.id || "";
      const rxCode = rx.prescriptionCode || "";
      const diagnosis = rx.diagnosis || "";

      const matchesSearch =
        !query ||
        patientName.toLowerCase().includes(query) ||
        patientCode.toLowerCase().includes(query) ||
        rxCode.toLowerCase().includes(query) ||
        diagnosis.toLowerCase().includes(query);

      const matchesPatient = selectedPatient === "all" || rx.patient?.id === selectedPatient;

      const rxDate = new Date(rx.createdAt);
      const from = dateFrom ? new Date(dateFrom) : null;
      const to = dateTo ? new Date(dateTo) : null;

      if (to) to.setHours(23, 59, 59, 999);

      const matchesDate = (!from || rxDate >= from) && (!to || rxDate <= to);

      return matchesSearch && matchesPatient && matchesDate;
    });
  }, [prescriptions, search, selectedPatient, dateFrom, dateTo]);

  const totalPages = Math.max(1, Math.ceil(filteredPrescriptions.length / ITEMS_PER_PAGE));

  const paginatedPrescriptions = filteredPrescriptions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const resetFilters = () => {
    setSearch("");
    setSelectedPatient("all");
    setDateFrom("");
    setDateTo("");
    setCurrentPage(1);
  };

  const handleDownload = async (rx) => {
    await generatePrescriptionPDF(buildPdfData(rx), "download");
  };

  const handlePrint = async (rx) => {
    await generatePrescriptionPDF(buildPdfData(rx), "print");
  };

  return (
    <>
      <div className="rx-stats-row">
        {stats.map((item) => (
          <div key={item.label} className={`rx-stat-card ${item.color}`}>
            <div className={`rx-stat-icon ${item.color}`}>
              <Icon type={item.icon} />
            </div>
            <div className="rx-stat-body">
              <p className="rx-stat-label">{item.label}</p>
              <p className={`rx-stat-value ${item.color}`}>{item.value}</p>
              <p className="rx-stat-sub">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rx-filter-bar">
        <div className="rx-search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by patient, RX code, or diagnosis..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="rx-filter-group">
          <div className="rx-filter-group-row">
            <select
              className="rx-filter-item"
              value={selectedPatient}
              onChange={(event) => setSelectedPatient(event.target.value)}
            >
              <option value="all">All Patients</option>
              {patientList.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.fullName}
                </option>
              ))}
            </select>

            <input
              type="date"
              className="rx-filter-item"
              value={dateFrom}
              onChange={(event) => setDateFrom(event.target.value)}
            />

            <input
              type="date"
              className="rx-filter-item"
              value={dateTo}
              onChange={(event) => setDateTo(event.target.value)}
            />
          </div>
        </div>

        <div className="rx-filter-actions">
          <button className="rx-reset-btn" type="button" onClick={resetFilters}>
            <Icon type="reset" /> Reset
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="rx-table-container" style={{ padding: 20, color: "#b91c1c" }}>
          {errorMessage}
        </div>
      )}

      <div className="rx-table-container">
        <div className="rx-table-header">
          <div>
            <h2 className="rx-table-title">Prescriptions List</h2>
            <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 13 }}>
              Showing {filteredPrescriptions.length} prescription records
            </p>
          </div>

          <div className="rx-table-actions">
            <Link href="/doctor-portal/prescriptions/new-prescriptions" className="rx-tbl-btn primary">
              <Plus size={16} /> New Prescription
            </Link>
          </div>
        </div>

        <div className="rx-table-responsive-wrapper">
          <table className="rx-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Prescription</th>
                <th>Patient</th>
                <th>Diagnosis</th>
                <th>Date</th>
                <th>Medicines</th>
                <th>Tests</th>
                <th>Follow-up</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", padding: 32 }}>
                    Loading prescriptions...
                  </td>
                </tr>
              ) : paginatedPrescriptions.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center", padding: 32 }}>
                    No prescriptions found.
                  </td>
                </tr>
              ) : (
                paginatedPrescriptions.map((rx, index) => (
                  <tr key={rx.id}>
                    <td className="rx-serial-td">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>

                    <td className="rx-prescription-id">
                      <span className="rx-card-rxid">{rx.prescriptionCode}</span>
                      <p style={{ margin: "4px 0 0", fontSize: 11, color: "#64748b" }}>
                        {rx.appointment?.appointmentCode || "No appointment"}
                      </p>
                    </td>

                    <td className="rx-patient-td">
                      <div className="rx-patient-cell">
                        <div className="rx-patient-avatar">
                          <span>{getInitials(rx.patient?.fullName)}</span>
                        </div>

                        <div className="rx-patient-info">
                          <p className="rx-patient-name">{rx.patient?.fullName || "N/A"}</p>
                          <p className="rx-patient-id">{rx.patient?.mobileNumber || "N/A"}</p>
                          <p className="rx-patient-age">
                            {calculateAge(rx.patient?.dateOfBirth)} yrs, {rx.patient?.gender || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <p style={{ margin: 0, fontWeight: 600, color: "#0f172a" }}>
                        {rx.diagnosis || "N/A"}
                      </p>
                      <p style={{ margin: "4px 0 0", fontSize: 12, color: "#64748b" }}>
                        {rx.chiefComplaint || "No complaint"}
                      </p>
                    </td>

                    <td>
                      <p className="rx-date-primary">{formatDate(rx.createdAt)}</p>
                      <p className="rx-date-time">{formatTime(rx.createdAt)}</p>
                    </td>

                    <td>
                      <div className="rx-medicine-icon-wrap">
                        <div className="rx-med-icon">
                          <Icon type="rx" />
                        </div>
                        <div>
                          <p className="rx-med-count">{rx.medicines?.length || 0} Medicines</p>
                          <p className="rx-instr-count">{rx.advice ? "Advice added" : "No advice"}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="rx-status-badge pending">
                        {rx.tests?.length || 0} Tests
                      </span>
                    </td>

                    <td>
                      <p className="rx-date-primary">{formatDate(rx.followUpDate)}</p>
                    </td>

                    <td>
                      <div className="rx-action-btns">
                        <Link
                          href={`/doctor-portal/prescriptions/prescriptions-details?id=${rx.id}`}
                          className="rx-act-btn"
                          title="View"
                        >
                          <Icon type="eye" />
                        </Link>

                        <button
                          type="button"
                          className="rx-act-btn"
                          title="Download"
                          onClick={() => handleDownload(rx)}
                        >
                          <Icon type="download" />
                        </button>

                        <button
                          type="button"
                          className="rx-act-btn"
                          title="Print"
                          onClick={() => handlePrint(rx)}
                        >
                          <Icon type="print" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="rx-pagination-bar">
          <span className="rx-pagination-info">
            Showing{" "}
            {filteredPrescriptions.length === 0
              ? 0
              : (currentPage - 1) * ITEMS_PER_PAGE + 1}{" "}
            to {Math.min(currentPage * ITEMS_PER_PAGE, filteredPrescriptions.length)} of{" "}
            {filteredPrescriptions.length} entries
          </span>

          <div className="rx-pagination-btns">
            <button
              className="rx-page-btn"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
            >
              <Icon type="chev_left" />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                className={`rx-page-btn${page === currentPage ? " active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="rx-page-btn"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
            >
              <Icon type="chev_right" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}