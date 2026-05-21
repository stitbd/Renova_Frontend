// app/doctor-portal/patients/page.jsx
"use client";

import { useState } from "react";
import "@/styles/pages/doctor-dashboard.css";

const patientsData = [
  { id: 1, name: "Masud Rana", age: 32, gender: "Male", phone: "+880 1712-345678", email: "masud.rana@email.com", lastVisit: "10 May 2025", totalVisits: 5, bloodGroup: "O+", avatar: "/images/patients/01.jpg" },
  { id: 2, name: "Farhana Akter", age: 28, gender: "Female", phone: "+880 1812-345678", email: "farhana.akter@email.com", lastVisit: "09 May 2025", totalVisits: 3, bloodGroup: "A+", avatar: "/images/patients/02.jpg" },
  { id: 3, name: "Abdullah Al Mamun", age: 45, gender: "Male", phone: "+880 1912-345678", email: "abdullah.mamun@email.com", lastVisit: "08 May 2025", totalVisits: 12, bloodGroup: "B+", avatar: "/images/patients/03.jpg" },
  { id: 4, name: "Sumiya Rahman", age: 30, gender: "Female", phone: "+880 1612-345678", email: "sumiya.rahman@email.com", lastVisit: "07 May 2025", totalVisits: 2, bloodGroup: "AB+", avatar: "/images/patients/04.jpg" },
  { id: 5, name: "Rafiq Hasan", age: 50, gender: "Male", phone: "+880 1512-345678", email: "rafiq.hasan@email.com", lastVisit: "06 May 2025", totalVisits: 8, bloodGroup: "O-", avatar: "/images/patients/05.jpg" },
];

export default function PatientsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patientsData.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

    return (
    <div className="dashboard-content">
          <div className="patients-search">
            <div className="search-input-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input 
                type="text" 
                placeholder="Search by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="patients-table-container">
            <table className="patients-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Contact</th>
                  <th>Blood Group</th>
                  <th>Last Visit</th>
                  <th>Total Visits</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>
                      <div className="table-patient-info">
                        <div className="patient-avatar-tiny">
                          <img src={patient.avatar} alt={patient.name} />
                        </div>
                        <div>
                          <div className="patient-name-table">{patient.name}</div>
                          <div className="patient-age-table">{patient.age} Years, {patient.gender}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div>{patient.phone}</div>
                        <div className="email-text">{patient.email}</div>
                      </div>
                    </td>
                    <td><span className="blood-group-badge">{patient.bloodGroup}</span></td>
                    <td>{patient.lastVisit}</td>
                    <td>{patient.totalVisits}</td>
                    <td>
                      <div className="table-actions">
                        <button className="btn-icon-small">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                        <button className="btn-icon-small">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  );
}


