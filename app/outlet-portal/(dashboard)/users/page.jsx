// app/outlet/users/page.jsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import "./outlet-users.css";
import { Plus, User, Mail, Shield, CheckCircle, XCircle, Edit, Trash2, Users, Key } from "lucide-react";

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("users");

  const users = [
    { id: "USR-001", name: "Aminul Hasan", role: "Outlet Manager", email: "aminul@renova.life", status: "Active", lastLogin: "15 May 2025" },
    { id: "USR-002", name: "Farhana Akter", role: "Doctor", email: "farhana@renova.life", status: "Active", lastLogin: "14 May 2025" },
    { id: "USR-003", name: "Kamal Hossain", role: "Staff", email: "kamal@renova.life", status: "Active", lastLogin: "13 May 2025" },
    { id: "USR-004", name: "Sadita Afrin", role: "Receptionist", email: "sadita@renova.life", status: "Inactive", lastLogin: "10 May 2025" },
  ];

  const roles = [
    { name: "Outlet Manager", permissions: ["Manage Staff", "View Reports", "Manage Inventory", "Process Payments"], users: 1 },
    { name: "Doctor", permissions: ["View Patients", "Create Consultations", "View Reports"], users: 2 },
    { name: "Staff", permissions: ["View Appointments", "Process Check-ins"], users: 3 },
    { name: "Receptionist", permissions: ["Manage Appointments", "View Patients"], users: 1 },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <motion.div className="page-header">
        <h1 className="page-title">Users & Roles</h1>
        <motion.button className="btn btn-primary" whileHover={{ scale: 1.02 }}>
          <Plus size={18} />
          Add User
        </motion.button>
      </motion.div>

      {/* Tabs */}
      <motion.div className="tabs-bar">
        {["users", "roles"].map(tab => (
          <motion.button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab === "users" ? "Users" : "Roles & Permissions"}
          </motion.button>
        ))}
      </motion.div>

      {activeTab === "users" ? (
        /* Users Table */
        <motion.div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Email</th>
                <th>Last Login</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ backgroundColor: "#f8fafc" }}
                >
                  <td>
                    <div className="table-user">
                      <div className="user-avatar-small">
                        <User size={18} />
                      </div>
                      <div>
                        <span className="user-name">{user.name}</span>
                        <span className="user-id">{user.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>{user.role}</td>
                  <td><Mail size={14} /> {user.email}</td>
                  <td>{user.lastLogin}</td>
                  <td>
                    {user.status === "Active" ? (
                      <span className="status-badge active"><CheckCircle size={12} /> Active</span>
                    ) : (
                      <span className="status-badge inactive"><XCircle size={12} /> Inactive</span>
                    )}
                  </td>
                  <td>
                    <div className="table-actions">
                      <motion.button className="btn-icon edit" whileHover={{ scale: 1.1 }}><Edit size={16} /></motion.button>
                      <motion.button className="btn-icon delete" whileHover={{ scale: 1.1 }}><Trash2 size={16} /></motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      ) : (
        /* Roles List */
        <motion.div className="roles-grid">
          {roles.map((role, i) => (
            <motion.div
              key={role.name}
              className="role-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="role-header">
                <h4 className="role-name"><Shield size={16} /> {role.name}</h4>
                <span className="role-users"><Users size={14} /> {role.users} user{role.users > 1 ? "s" : ""}</span>
              </div>
              <div className="role-permissions">
                <h5>Permissions:</h5>
                <ul>
                  {role.permissions.map((perm, j) => (
                    <li key={j}>
                      <CheckCircle size={14} />
                      {perm}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="role-actions">
                <motion.button className="btn-small" whileHover={{ scale: 1.05 }}><Edit size={14} /> Edit Role</motion.button>
                <motion.button className="btn-small outline" whileHover={{ scale: 1.05 }}><Users size={14} /> View Users</motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}