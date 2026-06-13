"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { generatePrescriptionPDF } from "@/utils/prescriptionPDF";
import "./patient-prescriptions.css";

const prescriptionsData = [
  {
    id: "RX-2025-000156",
    doctor: { name: "Ayesha Rahman", specialization: "Cardiology" },
    vitalSigns: { bloodPressure: "Blood Pressure (145/90 mmHg)", heartRate: "Heart Rate (82 bpm)", temperature: "Temperature (98.6°F)", oxygenSaturation: "Oxygen Saturation (98%)", bloodSugar: "Blood Sugar (120 mg/dL)" },
    date: "31 May 2025",
    time: "10:30 AM",
    medicines: 5,
    instructions: 2,
    status: "dispensed",
  },
  {
    id: "RX-2025-000155",
    doctor: { name: "Hasan Mahmud", specialization: "Neurology" },
    vitalSigns: { bloodPressure: "BP (130/85 mmHg)", heartRate: "HR (78 bpm)", temperature: "Temp (99.1°F)", oxygenSaturation: "SpO2 (97%)", bloodSugar: "BS (110 mg/dL)" },
    date: "31 May 2025",
    time: "09:15 AM",
    medicines: 3,
    instructions: 1,
    status: "pending",
  },
  {
    id: "RX-2025-000154",
    doctor: { name: "Sumaiya Khan", specialization: "Dermatology" },
    vitalSigns: { bloodPressure: "BP (130/85 mmHg)", heartRate: "HR (78 bpm)", temperature: "Temp (99.1°F)", oxygenSaturation: "SpO2 (97%)", bloodSugar: "BS (110 mg/dL)" },
    date: "30 May 2025",
    time: "04:20 PM",
    medicines: 4,
    instructions: 2,
    status: "dispensed",
  },
  {
    id: "RX-2025-000153",
    doctor: { name: "Jannatul Ferdous", specialization: "Pediatrics" },
    vitalSigns: { bloodPressure: "BP (130/85 mmHg)", heartRate: "HR (78 bpm)", temperature: "Temp (99.1°F)", oxygenSaturation: "SpO2 (97%)", bloodSugar: "BS (110 mg/dL)" },
    date: "30 May 2025",
    time: "11:00 AM",
    medicines: 6,
    instructions: 3,
    status: "dispensed",
  },
  {
    id: "RX-2025-000152",
    doctor: { name: "Rafiq Ahmed", specialization: "Orthopedics" },
    vitalSigns: { bloodPressure: "BP (130/85 mmHg)", heartRate: "HR (78 bpm)", temperature: "Temp (99.1°F)", oxygenSaturation: "SpO2 (97%)", bloodSugar: "BS (110 mg/dL)" },
    date: "29 May 2025",
    time: "03:45 PM",
    medicines: 2,
    instructions: 1,
    status: "cancelled",
  },
  {
    id: "RX-2025-000151",
    doctor: { name: "Nusrat Jahan", specialization: "Gynecology" },
    vitalSigns: { bloodPressure: "BP (130/85 mmHg)", heartRate: "HR (78 bpm)", temperature: "Temp (99.1°F)", oxygenSaturation: "SpO2 (97%)", bloodSugar: "BS (110 mg/dL)" },
    date: "29 May 2025",
    time: "10:20 AM",
    medicines: 4,
    instructions: 2,
    status: "pending",
  },
  {
    id: "RX-2025-000150",
    doctor: { name: "Sakib Khan", specialization: "Cardiology" },
    vitalSigns: { bloodPressure: "BP (130/85 mmHg)", heartRate: "HR (78 bpm)", temperature: "Temp (99.1°F)", oxygenSaturation: "SpO2 (97%)", bloodSugar: "BS (110 mg/dL)" },
    date: "28 May 2025",
    time: "02:30 PM",
    medicines: 5,
    instructions: 2,
    status: "dispensed",
  },
];

const stats = [
  { label: "Total Prescriptions", value: "156", sub: "View all prescriptions", color: "green", icon: "rx" },
  { label: "Today's Prescriptions", value: "12", sub: "View today's list", color: "blue", icon: "calendar" },
  { label: "Pending", value: "08", sub: "Not Dispensed", color: "yellow", icon: "clock" },
  { label: "Dispensed", value: "140", sub: "Completed", color: "teal", icon: "check" },
  { label: "Cancelled", value: "04", sub: "Cancelled prescriptions", color: "red", icon: "undo" },
];

function Icon({ type, cls = "" }) {
  const icons = {
    rx: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" /></svg>,
    calendar: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    clock: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    check: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    undo: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4" /></svg>,
    filter: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>,
    reset: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4" /></svg>,
    search: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>,
    chevdown: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>,
    plus: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    download: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    print: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>,
    eye: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    user: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    chev_left: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>,
    chev_right: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>,
    date: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
  };
  return <>{icons[type] || null}</>;
}

const statusLabel = { dispensed: "Dispensed", pending: "Pending", cancelled: "Cancelled" };

const getDoctorImage = (index) => {
  const imageNum = (index % 9) + 1;
  const imageNumStr = imageNum.toString().padStart(2, '0');
  return `/images/doctors/${imageNumStr}.jpg`;
};

const ITEMS_PER_PAGE = 10;

export default function PrescriptionsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allPrescriptions, setAllPrescriptions] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("prescriptions") || "[]");
    // Filter out any prescriptions without doctor property and merge with default data
    const validSaved = saved.filter(p => p && p.doctor);
    setAllPrescriptions([...validSaved, ...prescriptionsData]);
  }, []);

  const filtered = allPrescriptions.filter((p) => {
    if (!p || !p.doctor) return false;
    return (
      p.doctor.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.id?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <div className="rx-stats-row">
        {stats.map((s) => (
          <div key={s.label} className={`rx-stat-card ${s.color}`}>
            <div className={`rx-stat-icon ${s.color}`}>
              <Icon type={s.icon} />
            </div>
            <div className="rx-stat-body">
              <p className="rx-stat-label">{s.label}</p>
              <p className={`rx-stat-value ${s.color}`}>{s.value}</p>
              <p className="rx-stat-sub">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rx-filter-bar">
        <div className="rx-filter-group">
          <button className="rx-filter-item">
            <Icon type="date" />
            <span>01 May 2025 – 31 May 2025</span>
            <Icon type="chevdown" cls="rx-filter-chevron" />
          </button>
          <button className="rx-filter-item">
            <span>All Doctors</span>
            <Icon type="chevdown" cls="rx-filter-chevron" />
          </button>
          <button className="rx-filter-item">
            <span>All Status</span>
            <Icon type="chevdown" cls="rx-filter-chevron" />
          </button>
        </div>
        <div className="rx-search-box">
          <Icon type="search" />
          <input
            type="text"
            placeholder="Search prescriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="rx-filter-actions">
          <button className="rx-apply-btn">
            <Icon type="filter" /> Apply Filter
          </button>
          <button className="rx-reset-btn">
            <Icon type="reset" /> Reset
          </button>
        </div>
      </div>

      <div className="rx-table-container">
        <div className="rx-table-header">
          <h2 className="rx-table-title">Prescriptions List</h2>
          <div className="rx-table-actions">
            <Link href="/doctor-portal/prescriptions/new-prescriptions" className="rx-tbl-btn primary">
              <Icon type="plus" /> New Prescription
            </Link>
          </div>
        </div>

        <div className="rx-table-responsive-wrapper">
          <table className="rx-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Prescription ID</th>
                <th>Doctor Info</th>
                <th>Vital Signs</th>
                <th>Date</th>
                <th>Medicines</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((rx, i) => (
                <tr key={rx.id}>
                  <td data-label="#">{(currentPage - 1) * ITEMS_PER_PAGE + i + 1}</td>
                  <td data-label="Prescription ID" className="rx-prescription-id">{rx.id}</td>
                  <td data-label="Doctor Info">
                    <div className="rx-patient-cell">
                      <div className="rx-patient-avatar">
                        <img
                          src={getDoctorImage(i)}
                          alt={rx.doctor?.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#014fa1" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
                          }}
                        />
                      </div>
                      <div>
                        <p className="rx-patient-name">Dr. {rx.doctor?.name || 'Unknown'}</p>
                        <p className="rx-patient-id">{rx.doctor?.specialization || 'N/A'}</p>
                      </div>
                    </div>
                  </td>
                  <td data-label="Vital Signs">
                    <div className="rx-vital-cell">
                      <p className="rx-vital-item">{rx.vitalSigns?.bloodPressure || 'N/A'}</p>
                      <p className="rx-vital-item">{rx.vitalSigns?.heartRate || 'N/A'}</p>
                      <p className="rx-vital-item">{rx.vitalSigns?.temperature || 'N/A'}</p>
                      <p className="rx-vital-item">{rx.vitalSigns?.oxygenSaturation || 'N/A'}</p>
                      <p className="rx-vital-item">{rx.vitalSigns?.bloodSugar || 'N/A'}</p>
                    </div>
                  </td>
                  <td data-label="Date">
                    <p className="rx-date-primary">{rx.date}</p>
                    <p className="rx-date-time">{rx.time}</p>
                  </td>
                  <td data-label="Medicines">
                    <div className="rx-medicine-icon-wrap">
                      <div className="rx-med-icon">
                        <Icon type="rx" />
                      </div>
                      <div>
                        <p className="rx-med-count">{rx.medicines} Medicines</p>
                        <p className="rx-instr-count">{rx.instructions} Instructions</p>
                      </div>
                    </div>
                  </td>
                  <td data-label="Status">
                    <span className={`rx-status-badge ${rx.status}`}>
                      {statusLabel[rx.status]}
                    </span>
                  </td>
                  <td data-label="Action">
                    <div className="rx-action-btns">
                      <Link href={`/doctor-portal/prescriptions/prescriptions-details`} className="rx-act-btn" title="View">
                        <Icon type="eye" />
                      </Link>
                      <button
                        className="rx-act-btn"
                        title="Download"
                        onClick={() => generatePrescriptionPDF({
                          prescriptionId: rx.id,
                          prescriptionDate: rx.date,
                          prescriptionTime: rx.time,
                          visitType: "OPD",
                          prescriptionType: "New Prescription",
                          status: rx.status,
                          doctor: { name: `Dr. ${rx.doctor?.name || 'Unknown'}`, specialization: rx.doctor?.specialization || 'N/A' },
                          patient: { name: "Sample Patient", pid: "PT-001", ageGender: "30 Years, Male" },
                          medicines: [],
                          additionalInstructions: [],
                        }, "download")}
                      >
                        <Icon type="download" />
                      </button>
                      <button
                        className="rx-act-btn"
                        title="Print"
                        onClick={() => generatePrescriptionPDF({
                          prescriptionId: rx.id,
                          prescriptionDate: rx.date,
                          prescriptionTime: rx.time,
                          visitType: "OPD",
                          prescriptionType: "New Prescription",
                          status: rx.status,
                          doctor: { name: `Dr. ${rx.doctor?.name || 'Unknown'}`, specialization: rx.doctor?.specialization || 'N/A' },
                          patient: { name: "Sample Patient", pid: "PT-001", ageGender: "30 Years, Male" },
                          medicines: [],
                          additionalInstructions: [],
                        }, "print")}
                      >
                        <Icon type="print" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rx-pagination-bar">
          <span className="rx-pagination-info">
            Showing {filtered.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} entries
          </span>
          <div className="rx-pagination-btns">
            <button className="rx-page-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              <Icon type="chev_left" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .reduce((acc, p, idx, arr) => {
                if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, idx) =>
                p === "..." ? (
                  <button key={`dots-${idx}`} className="rx-page-btn dots">…</button>
                ) : (
                  <button
                    key={p}
                    className={`rx-page-btn${p === currentPage ? " active" : ""}`}
                    onClick={() => handlePageChange(p)}
                  >
                    {p}
                  </button>
                )
              )}
            <button className="rx-page-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              <Icon type="chev_right" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}