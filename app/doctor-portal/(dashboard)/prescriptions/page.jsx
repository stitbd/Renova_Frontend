"use client";

import { useState } from "react";
import Link from "next/link";
import { generatePrescriptionPDF } from "@/utils/prescriptionPDF";
import "./prescriptions.css";

const prescriptionsData = [
  {
    id: "RX-2025-000156",
    patient: { name: "Ayesha Rahman", pid: "PT-2025-000123", age: "28 Years, Female" },
    doctor: { name: "Dr. Abdullah Al Noman", spec: "Cardiologist" },
    date: "31 May 2025",
    time: "10:30 AM",
    medicines: 5,
    instructions: 2,
    status: "dispensed",
  },
  {
    id: "RX-2025-000155",
    patient: { name: "Hasan Mahmud", pid: "PT-2025-000122", age: "45 Years, Male" },
    doctor: { name: "Dr. Farhana Akter", spec: "Dermatologist" },
    date: "31 May 2025",
    time: "09:15 AM",
    medicines: 3,
    instructions: 1,
    status: "pending",
  },
  {
    id: "RX-2025-000154",
    patient: { name: "Sumaiya Khan", pid: "PT-2025-000121", age: "32 Years, Female" },
    doctor: { name: "Dr. Hasan Mahmud", spec: "Physiotherapist" },
    date: "30 May 2025",
    time: "04:20 PM",
    medicines: 4,
    instructions: 2,
    status: "dispensed",
  },
  {
    id: "RX-2025-000153",
    patient: { name: "Jannatul Ferdous", pid: "PT-2025-000120", age: "29 Years, Female" },
    doctor: { name: "Dr. Abdullah Al Noman", spec: "Cardiologist" },
    date: "30 May 2025",
    time: "11:00 AM",
    medicines: 6,
    instructions: 3,
    status: "dispensed",
  },
  {
    id: "RX-2025-000152",
    patient: { name: "Rafiq Ahmed", pid: "PT-2025-000119", age: "38 Years, Male" },
    doctor: { name: "Dr. Farhana Akter", spec: "Dermatologist" },
    date: "29 May 2025",
    time: "03:45 PM",
    medicines: 2,
    instructions: 1,
    status: "cancelled",
  },
  {
    id: "RX-2025-000151",
    patient: { name: "Nusrat Jahan", pid: "PT-2025-000118", age: "26 Years, Female" },
    doctor: { name: "Dr. Hasan Mahmud", spec: "Physiotherapist" },
    date: "29 May 2025",
    time: "10:20 AM",
    medicines: 4,
    instructions: 2,
    status: "pending",
  },
  {
    id: "RX-2025-000150",
    patient: { name: "Sakib Khan", pid: "PT-2025-000117", age: "41 Years, Male" },
    doctor: { name: "Dr. Abdullah Al Noman", spec: "Cardiologist" },
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

const getPatientImage = (index) => {
  const imageNum = (index % 9) + 1;
  const imageNumStr = imageNum.toString().padStart(2, '0');
  return `/images/patients/${imageNumStr}.jpg`;
};

const getDoctorImage = (index) => {
  const imageNum = (index % 9) + 1;
  return `/images/doctors/doctor-${imageNum}.jpg`;
};

export default function PrescriptionsPage() {
  const [search, setSearch] = useState("");
  const [currentPage] = useState(1);

  const filtered = prescriptionsData.filter((p) =>
    p.patient.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Page Header */}
      <div className="rx-page-header">
        <h1 className="rx-page-title">Prescriptions</h1>
        <div className="rx-breadcrumb">
          <a href="/doctor-portal/dashboard">Home</a>
          <span className="rx-breadcrumb-sep">›</span>
          <span className="rx-breadcrumb-current">Prescriptions</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="rx-stats-row">
        {stats.map((s) => (
          <div key={s.label} className="rx-stat-card">
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

      {/* Filter Bar */}
      <div className="rx-filter-bar">
        <button className="rx-filter-item">
          <Icon type="date" />
          01 May 2025 – 31 May 2025
          <Icon type="chevdown" cls="rx-filter-chevron" />
        </button>
        <button className="rx-filter-item">
          All Patients <Icon type="chevdown" cls="rx-filter-chevron" />
        </button>
        <button className="rx-filter-item">
          All Status <Icon type="chevdown" cls="rx-filter-chevron" />
        </button>
        <div className="rx-search-box">
          <Icon type="search" />
          <input
            type="text"
            placeholder="Search prescriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="rx-apply-btn">
          <Icon type="filter" /> Apply Filter
        </button>
        <button className="rx-reset-btn">
          <Icon type="reset" /> Reset
        </button>
      </div>

      {/* Table */}
      <div className="rx-table-container">
        <div className="rx-table-header">
          <h2 className="rx-table-title">Prescriptions List</h2>
          <div className="rx-table-actions">
            <button className="rx-tbl-btn primary">
              <Link
                href="/doctor-portal/prescriptions/new-prescriptions"
                className="rx-tbl-btn primary"
              >
                <Icon type="plus" /> New Prescription
              </Link>
            </button>
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
                doctor: { name: rx.doctor.name, specialization: rx.doctor.spec },
                patient: { name: rx.patient.name, pid: rx.patient.pid, ageGender: rx.patient.age },
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
                doctor: { name: rx.doctor.name, specialization: rx.doctor.spec },
                patient: { name: rx.patient.name, pid: rx.patient.pid, ageGender: rx.patient.age },
                medicines: [],
                additionalInstructions: [],
              }, "print")}
            >
              <Icon type="print" />
            </button>
          </div>
        </div>

        <table className="rx-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Prescription ID</th>
              <th>Patient Info</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Medicines</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((rx, i) => (
              <tr key={rx.id}>
                <td>{i + 1}</td>
                <td style={{ fontWeight: 600, fontSize: 12.5, color: "#014fa1" }}>{rx.id}</td>
                <td>
                  <div className="rx-patient-cell">
                    <div className="rx-patient-avatar">
                      <img
                        src={getPatientImage(i)}
                        alt={rx.patient.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#014fa1" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
                        }}
                      />
                    </div>
                    <div>
                      <p className="rx-patient-name">{rx.patient.name}</p>
                      <p className="rx-patient-id">{rx.patient.pid}</p>
                      <p className="rx-patient-age">{rx.patient.age}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="rx-doctor-cell">
                    <div className="rx-doctor-avatar">
                      <img
                        src={getDoctorImage(i)}
                        alt={rx.doctor.name}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
                        }}
                      />
                    </div>
                    <div>
                      <p className="rx-doctor-name">{rx.doctor.name}</p>
                      <p className="rx-doctor-spec">{rx.doctor.spec}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="rx-date-primary">{rx.date}</p>
                  <p className="rx-date-time">{rx.time}</p>
                </td>
                <td>
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
                <td>
                  <span className={`rx-status-badge ${rx.status}`}>
                    {statusLabel[rx.status]}
                  </span>
                </td>
                <td>
                  <div className="rx-action-btns">
                    <Link href={`/doctor-portal/prescriptions/prescriptions-details`} className="rx-act-btn" title="View">
                      <Icon type="eye" />
                    </Link>
                    <button className="rx-act-btn" title="Download">
                      <Icon type="download" />
                    </button>
                    <button className="rx-act-btn" title="Print">
                      <Icon type="print" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="rx-pagination-bar">
          <span className="rx-pagination-info">
            Showing 1 to {filtered.length} of 156 entries
          </span>
          <div className="rx-pagination-btns">
            <button className="rx-page-btn">
              <Icon type="chev_left" />
            </button>
            {[1, 2, 3].map((p) => (
              <button key={p} className={`rx-page-btn${p === currentPage ? " active" : ""}`}>
                {p}
              </button>
            ))}
            <button className="rx-page-btn dots">...</button>
            <button className="rx-page-btn">23</button>
            <button className="rx-page-btn">
              <Icon type="chev_right" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
