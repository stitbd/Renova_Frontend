"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { generatePrescriptionPDF } from "@/utils/prescriptionPDF";
import "./patient-prescriptions.css";
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
  { label: "Total Prescriptions", value: "156", sub: "View all prescriptions", color: "green", icon: FileText },
  { label: "Today's Prescriptions", value: "12", sub: "View today's list", color: "blue", icon: Calendar },
  { label: "Pending", value: "08", sub: "Not Dispensed", color: "yellow", icon: Clock },
  { label: "Dispensed", value: "140", sub: "Completed", color: "teal", icon: CheckCircle },
  { label: "Cancelled", value: "04", sub: "Cancelled prescriptions", color: "red", icon: XCircle },
];

const statusLabel = { dispensed: "Dispensed", pending: "Pending", cancelled: "Cancelled" };

const getDoctorImage = (index) => {
  const imageNum = (index % 9) + 1;
  return `/images/doctors/doctor-${imageNum}.jpg`;
};

const ITEMS_PER_PAGE = 10;

export default function PrescriptionsPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allPrescriptions, setAllPrescriptions] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("prescriptions") || "[]");
    const validSaved = saved.filter(p => p && p.doctor);
    setAllPrescriptions([...validSaved, ...prescriptionsData]);
  }, []);

  const doctorList = [...new Map(allPrescriptions.filter(p => p?.doctor).map(p => [p.doctor.name, p.doctor])).values()];

  const filtered = allPrescriptions.filter((p) => {
    if (!p || !p.doctor) return false;
    const matchSearch =
      p.doctor?.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.id?.toLowerCase().includes(search.toLowerCase());
    const matchDoctor = selectedDoctor === "all" || p.doctor?.name === selectedDoctor;
    const matchStatus = selectedStatus === "all" || p.status === selectedStatus;

    const matchDate = (() => {
      if (!dateFrom && !dateTo) return true;
      const rxDate = new Date(p.date);
      const from = dateFrom ? new Date(dateFrom) : null;
      const to = dateTo ? new Date(dateTo) : null;
      if (from && rxDate < from) return false;
      if (to && rxDate > to) return false;
      return true;
    })();
    return matchSearch && matchDoctor && matchStatus && matchDate;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <div className="rx-stats-row">
        {stats.map((s) => {
          const IconComponent = s.icon;
          return (
            <motion.div
              key={s.label}
              className={`rx-stat-card ${s.color}`}
              whileHover={{ y: -6, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", transition: { duration: 0.2 } }}
            >
              <motion.div
                className={`rx-stat-icon ${s.color}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <IconComponent size={20} />
              </motion.div>
              <div className="rx-stat-body">
                <p className="rx-stat-label">{s.label}</p>
                <p className={`rx-stat-value ${s.color}`}>{s.value}</p>
                <p className="rx-stat-sub">{s.sub}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="rx-filter-bar">
        <div className="rx-filter-group">
          <div className="rx-filter-group-row">
            <div style={{ position: "relative", flex: 1 }}>
              <button className="rx-filter-item" onClick={() => { setShowDatePicker(v => !v); setShowDoctorDropdown(false); setShowStatusDropdown(false); }}>
                <Calendar size={14} />
                <span>{dateFrom && dateTo ? `${dateFrom} – ${dateTo}` : dateFrom ? `From ${dateFrom}` : dateTo ? `To ${dateTo}` : "Date Range"}</span>
                <ChevronDown size={12} className="rx-filter-chevron" />
              </button>
              {showDatePicker && (
                <div className="rx-dropdown rx-date-dropdown">
                  <div className="rx-date-row">
                    <label>From</label>
                    <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
                  </div>
                  <div className="rx-date-row">
                    <label>To</label>
                    <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
                  </div>
                  <div className="rx-date-actions">
                    <button onClick={() => { setDateFrom(""); setDateTo(""); }}>Clear</button>
                    <button className="apply" onClick={() => setShowDatePicker(false)}>Apply</button>
                  </div>
                </div>
              )}
            </div>
            <div style={{ position: "relative", flex: 1 }}>
              <button className="rx-filter-item" onClick={() => { setShowDoctorDropdown(v => !v); setShowStatusDropdown(false); setShowDatePicker(false); }}>
                <span>{selectedDoctor === "all" ? "All Doctors" : selectedDoctor}</span>
                <ChevronDown size={12} className="rx-filter-chevron" />
              </button>
              {showDoctorDropdown && (
                <div className="rx-dropdown">
                  <div className="rx-dropdown-item" onClick={() => { setSelectedDoctor("all"); setShowDoctorDropdown(false); }}>All Doctors</div>
                  {doctorList.map(d => (
                    <div key={d.name} className="rx-dropdown-item" onClick={() => { setSelectedDoctor(d.name); setShowDoctorDropdown(false); }}>
                      {d.name} <span style={{ color: "#94a3b8", fontSize: "10px" }}>{d.specialization}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ position: "relative", flex: 1 }}>
              <button className="rx-filter-item" onClick={() => { setShowStatusDropdown(v => !v); setShowDoctorDropdown(false); setShowDatePicker(false); }}>
                <span>{selectedStatus === "all" ? "All Status" : statusLabel[selectedStatus]}</span>
                <ChevronDown size={12} className="rx-filter-chevron" />
              </button>
              {showStatusDropdown && (
                <div className="rx-dropdown">
                  {[["all", "All Status"], ["dispensed", "Dispensed"], ["pending", "Pending"], ["cancelled", "Cancelled"]].map(([val, label]) => (
                    <div key={val} className="rx-dropdown-item" onClick={() => { setSelectedStatus(val); setShowStatusDropdown(false); }}>
                      {label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="rx-search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search prescriptions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="rx-filter-actions">
          <button className="rx-apply-btn">
            <Filter size={14} /> Apply Filter
          </button>
          <button className="rx-reset-btn" onClick={() => { setSelectedDoctor("all"); setSelectedStatus("all"); setSearch(""); setDateFrom(""); setDateTo(""); setCurrentPage(1); }}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>

      <div className="rx-table-container">
        <div className="rx-table-header">
          <h2 className="rx-table-title">Prescriptions List</h2>
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
                  <td data-label="#" className="rx-serial-td">{(currentPage - 1) * ITEMS_PER_PAGE + i + 1}</td>
                  <td data-label="Prescription ID" className="rx-prescription-id">
                    <span className="rx-card-rxid">{rx.id}</span>
                    <span className={`rx-status-badge ${rx.status} rx-card-status`}>{statusLabel[rx.status]}</span>
                  </td>
                  <td data-label="Doctor Info" className="rx-patient-td">
                    <div className="rx-patient-cell">
                      <div className="rx-patient-avatar">
                        <img
                          src={getDoctorImage(i)}
                          alt={rx.doctor.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<User size={18} color="#014fa1" />';
                          }}
                        />
                      </div>
                      <div className="rx-patient-info">
                        <p className="rx-patient-name">{rx.doctor.name}</p>
                        <p className="rx-patient-spec">{rx.doctor.specialization}</p>
                      </div>
                    </div>
                    <div className="rx-card-actions">
                      <Link href="/patient-portal/prescriptions/prescriptions-details" className="rx-act-btn" title="View"><Eye size={16} /></Link>
                      <button className="rx-act-btn" title="Download" onClick={() => generatePrescriptionPDF({ prescriptionId: rx.id, prescriptionDate: rx.date, prescriptionTime: rx.time, visitType: "OPD", prescriptionType: "New Prescription", status: rx.status, doctor: { name: rx.doctor.name, specialization: rx.doctor.specialization }, patient: { name: rx.patient?.name || "N/A", pid: rx.patient?.pid || "N/A", ageGender: rx.patient?.age || "N/A" }, medicines: [], additionalInstructions: [] }, "download")}><Download size={16} /></button>
                      <button className="rx-act-btn" title="Print" onClick={() => generatePrescriptionPDF({ prescriptionId: rx.id, prescriptionDate: rx.date, prescriptionTime: rx.time, visitType: "OPD", prescriptionType: "New Prescription", status: rx.status, doctor: { name: rx.doctor.name, specialization: rx.doctor.specialization }, patient: { name: rx.patient?.name || "N/A", pid: rx.patient?.pid || "N/A", ageGender: rx.patient?.age || "N/A" }, medicines: [], additionalInstructions: [] }, "print")}><Printer size={16} /></button>
                    </div>
                  </td>
                  <td data-label="Vital Signs" className="rx-vital-td">
                    <div className="rx-vital-cell">
                      <p className="rx-vital-item"><Activity size={12} /> {rx.vitalSigns.bloodPressure}</p>
                      <p className="rx-vital-item"><Activity size={12} /> {rx.vitalSigns.heartRate}</p>
                      <p className="rx-vital-item"><Thermometer size={12} /> {rx.vitalSigns.temperature}</p>
                      <p className="rx-vital-item"><Droplet size={12} /> {rx.vitalSigns.oxygenSaturation}</p>
                      <p className="rx-vital-item"><Gauge size={12} /> {rx.vitalSigns.bloodSugar}</p>
                    </div>
                  </td>
                  <td data-label="Date">
                    <p className="rx-date-primary">{rx.date}</p>
                    <p className="rx-date-time">{rx.time}</p>
                  </td>
                  <td data-label="Medicines">
                    <div className="rx-medicine-icon-wrap">
                      <div className="rx-med-icon"><Pill size={16} /></div>
                      <div>
                        <p className="rx-med-count">{rx.medicines} Medicines</p>
                        <p className="rx-instr-count">{rx.instructions} Instructions</p>
                      </div>
                    </div>
                  </td>
                  <td data-label="Status">
                    <span className={`rx-status-badge ${rx.status}`}>{statusLabel[rx.status]}</span>
                  </td>
                  <td data-label="Action">
                    <div className="rx-action-btns">
                      <Link href={`/patient-portal/prescriptions/prescriptions-details`} className="rx-act-btn" title="View">
                        <Eye size={16} />
                      </Link>
                      <button className="rx-act-btn" title="Download"
                        onClick={() => generatePrescriptionPDF({ prescriptionId: rx.id, prescriptionDate: rx.date, prescriptionTime: rx.time, visitType: "OPD", status: rx.status, doctor: { name: rx.doctor.name, specialization: rx.doctor.specialization }, patient: { name: rx.patient?.name || "N/A", pid: rx.patient?.pid || "N/A", ageGender: rx.patient?.age || "N/A" }, medicines: [], additionalInstructions: [] }, "download")}>
                        <Download size={16} />
                      </button>
                      <button className="rx-act-btn" title="Print"
                        onClick={() => generatePrescriptionPDF({ prescriptionId: rx.id, prescriptionDate: rx.date, prescriptionTime: rx.time, visitType: "OPD", status: rx.status, doctor: { name: rx.doctor.name, specialization: rx.doctor.specialization }, patient: { name: rx.patient?.name || "N/A", pid: rx.patient?.pid || "N/A", ageGender: rx.patient?.age || "N/A" }, medicines: [], additionalInstructions: [] }, "print")}>
                        <Printer size={16} />
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
              <ChevronLeft size={16} />
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
            <button className="rx-page-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}