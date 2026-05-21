// app/doctor-portal/messages/page.jsx
"use client";

import { useState } from "react";
import "@/styles/pages/doctor-dashboard.css";

const messagesData = [
  { id: 1, from: "Masud Rana", subject: "Question about medication", time: "10:30 AM", unread: true, message: "Doctor, I have a question about the medication you prescribed..." },
  { id: 2, from: "Farhana Akter", subject: "Appointment reschedule request", time: "Yesterday", unread: true, message: "I need to reschedule my appointment to next week..." },
  { id: 3, from: "Abdullah Al Mamun", subject: "Test results inquiry", time: "2 days ago", unread: false, message: "When will my test results be available?" },
];

export default function MessagesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

    return (
    <div className="dashboard-content">
          <div className="messages-container">
            <div className="messages-list">
              {messagesData.map((msg) => (
                <div key={msg.id} className={`message-item ${msg.unread ? "unread" : ""} ${selectedMessage?.id === msg.id ? "selected" : ""}`} onClick={() => setSelectedMessage(msg)}>
                  <div className="message-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <h4 className="sender-name">{msg.from}</h4>
                      <span className="message-time">{msg.time}</span>
                    </div>
                    <p className="message-subject">{msg.subject}</p>
                    <p className="message-preview">{msg.message}</p>
                  </div>
                  {msg.unread && <span className="unread-dot" />}
                </div>
              ))}
            </div>
            
            {selectedMessage && (
              <div className="message-detail">
                <div className="message-detail-header">
                  <h3>{selectedMessage.subject}</h3>
                  <span>From: {selectedMessage.from}</span>
                </div>
                <div className="message-detail-body">
                  {selectedMessage.message}
                </div>
                <div className="message-reply">
                  <textarea placeholder="Type your reply..." />
                  <button className="btn-primary-sm">Send Reply</button>
                </div>
              </div>
            )}
          </div>
        </div>
  );
}


