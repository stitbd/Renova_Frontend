"use client";

import { useState } from "react";
import Link from "next/link";
import "./patient-massages.css";

const TODAY = new Date().toDateString();

const conversations = [
  {
    id: 1,
    name: "Masud Rana",
    lastMessageDate: new Date().toDateString(),
    preview: "Thank you doctor. I will follow...",
    time: "10:35 AM",
    unread: 2,
    online: true,
    patientId: "PT-2025-00123",
    phone: "01712-345678",
    consultationReason: "Chest pain, Breathing problem",
    consultationStarted: "Started at 10:30 AM",
    summary: [
      { key: "Blood Group", val: "B+" },
      { key: "Height / Weight", val: "5'8\" / 72 kg" },
      { key: "Allergies", val: "No Known Allergies" },
      { key: "Chronic Condition", val: "Hypertension" },
    ],
  },
  {
    id: 2,
    name: "Sadia Afrin",
    lastMessageDate: new Date().toDateString(),
    preview: "Ok doctor, see you tomorrow.",
    time: "10:20 AM",
    unread: 1,
    online: false,
    patientId: "PT-2025-00098",
    phone: "01811-223344",
    consultationReason: "Fever, Headache",
    consultationStarted: "Started at 09:15 AM",
    summary: [
      { key: "Blood Group", val: "A+" },
      { key: "Height / Weight", val: "5'4\" / 55 kg" },
      { key: "Allergies", val: "Penicillin" },
      { key: "Chronic Condition", val: "None" },
    ],
  },
  {
    id: 3,
    name: "Rashed Hasan",
    lastMessageDate: new Date().toDateString(),
    preview: "Prescription ta pathiye diben?",
    time: "09:45 AM",
    unread: 0,
    online: false,
    patientId: "PT-2025-00075",
    phone: "01912-556677",
    consultationReason: "Back pain, Fatigue",
    consultationStarted: "Started at 11:00 AM",
    summary: [
      { key: "Blood Group", val: "O+" },
      { key: "Height / Weight", val: "5'10\" / 80 kg" },
      { key: "Allergies", val: "No Known Allergies" },
      { key: "Chronic Condition", val: "Diabetes" },
    ],
  },
  {
    id: 4,
    name: "Farzana Akter",
    lastMessageDate: new Date().toDateString(),
    preview: "Thank you so much doctor.",
    time: "10:45 AM",
    unread: 0,
    online: false,
    patientId: "PT-2025-00061",
    phone: "01712-998877",
    consultationReason: "Joint pain, Swelling",
    consultationStarted: "Started at 08:30 AM",
    summary: [
      { key: "Blood Group", val: "AB+" },
      { key: "Height / Weight", val: "5'1\" / 80 kg" },
      { key: "Allergies", val: "Aspirin" },
      { key: "Chronic Condition", val: "Arthritis" },
    ],
  },
  {
    id: 5,
    name: "Mahmudul Islam",
    lastMessageDate: new Date().toDateString(),
    preview: "BP check korar age ki ki khabo na?",
    time: "11:45 AM",
    unread: 1,
    online: true,
    patientId: "PT-2025-00055",
    phone: "01611-445566",
    consultationReason: "High BP",
    consultationStarted: "Started at 11:45 AM",
    summary: [
      { key: "Blood Group", val: "B+" },
      { key: "Height / Weight", val: "5'5\" / 80 kg" },
      { key: "Allergies", val: "No Known Allergies" },
      { key: "Chronic Condition", val: "Hypertension" },
    ],
  },
  {
    id: 6,
    name: "Jannatul Ferdous",
    lastMessageDate: new Date().toDateString(),
    preview: "Appointment confirm korlam.",
    time: "12:45 PM",
    unread: 0,
    online: false,
    patientId: "PT-2025-00044",
    phone: "01922-334455",
    consultationReason: "Back pain, Fatigue",
    consultationStarted: "Started at 11:00 AM",
    summary: [
      { key: "Blood Group", val: "O+" },
      { key: "Height / Weight", val: "5'2\" / 80 kg" },
      { key: "Allergies", val: "No Known Allergies" },
      { key: "Chronic Condition", val: "Diabetes" },
    ],
  },
  {
    id: 7,
    name: "Abdullah Al Mamun",
    lastMessageDate: new Date().toDateString(),
    preview: "Report ready hoyeche?",
    time: "01:45 PM",
    unread: 0,
    online: false,
    patientId: "PT-2025-00038",
    phone: "01812-667788",
    consultationReason: "Fever, Headache",
    consultationStarted: "Started at 09:15 AM",
    summary: [
      { key: "Blood Group", val: "A+" },
      { key: "Height / Weight", val: "5'4\" / 55 kg" },
      { key: "Allergies", val: "Penicillin" },
      { key: "Chronic Condition", val: "None" },
    ],
  },
  {
    id: 8,
    name: "Tanjina Rahman",
    lastMessageDate: new Date().toDateString(),
    preview: "Follow up kobe korbo?",
    time: "02:45 PM",
    unread: 0,
    online: false,
    patientId: "PT-2025-00031",
    phone: "01711-223366",
    consultationReason: "Chest pain, Breathing problem",
    consultationStarted: "Started at 10:30 AM",
    summary: [
      { key: "Blood Group", val: "B+" },
      { key: "Height / Weight", val: "5'3\" / 72 kg" },
      { key: "Allergies", val: "No Known Allergies" },
      { key: "Chronic Condition", val: "Hypertension" },
    ],
  },
  {
    id: 9,
    name: "Masud Rana",
    lastMessageDate: new Date().toDateString(),
    preview: "Thank you doctor. I will follow...",
    time: "10:35 AM",
    unread: 2,
    online: true,
    patientId: "PT-2025-00123",
    phone: "01712-345678",
    consultationReason: "Chest pain, Breathing problem",
    consultationStarted: "Started at 10:30 AM",
    summary: [
      { key: "Blood Group", val: "B+" },
      { key: "Height / Weight", val: "5'8\" / 72 kg" },
      { key: "Allergies", val: "No Known Allergies" },
      { key: "Chronic Condition", val: "Hypertension" },
    ],
  },
  {
    id: 10,
    name: "Sadia Afrin",
    lastMessageDate: new Date().toDateString(),
    preview: "Ok doctor, see you tomorrow.",
    time: "10:20 AM",
    unread: 1,
    online: false,
    patientId: "PT-2025-00098",
    phone: "01811-223344",
    consultationReason: "Chest pain, Breathing problem",
    consultationStarted: "Started at 10:30 AM",
    summary: [
      { key: "Blood Group", val: "B+" },
      { key: "Height / Weight", val: "5'0\" / 72 kg" },
      { key: "Allergies", val: "No Known Allergies" },
      { key: "Chronic Condition", val: "Hypertension" },
    ],
  },
  {
    id: 11,
    name: "Rashed Hasan",
    lastMessageDate: new Date().toDateString(),
    preview: "Prescription ta pathiye diben?",
    time: "09:45 AM",
    unread: 0,
    online: false,
    patientId: "PT-2025-00075",
    phone: "01912-556677",
    consultationReason: "Chest pain, Breathing problem",
    consultationStarted: "Started at 10:30 AM",
    summary: [
      { key: "Blood Group", val: "B+" },
      { key: "Height / Weight", val: "5'9\" / 72 kg" },
      { key: "Allergies", val: "No Known Allergies" },
      { key: "Chronic Condition", val: "Hypertension" },
    ],
  },
  {
    id: 12,
    name: "Farzana Akter",
    lastMessageDate: new Date().toDateString(),
    preview: "Thank you so much doctor.",
    time: "10:45 AM",
    unread: 0,
    online: false,
    patientId: "PT-2025-00061",
    phone: "01712-998877",
    consultationReason: "Chest pain, Breathing problem",
    consultationStarted: "Started at 10:30 AM",
    summary: [
      { key: "Blood Group", val: "B+" },
      { key: "Height / Weight", val: "5'2\" / 72 kg" },
      { key: "Allergies", val: "No Known Allergies" },
      { key: "Chronic Condition", val: "Hypertension" },
    ],
  },
  {
    id: 13,
    name: "Mahmudul Islam",
    lastMessageDate: new Date().toDateString(),
    preview: "BP check korar age ki ki khabo na?",
    time: "11:45 AM",
    unread: 1,
    online: true,
    patientId: "PT-2025-00055",
    phone: "01611-445566",
    consultationReason: "Chest pain, Breathing problem",
    consultationStarted: "Started at 10:30 AM",
    summary: [
      { key: "Blood Group", val: "B+" },
      { key: "Height / Weight", val: "5'5\" / 72 kg" },
      { key: "Allergies", val: "No Known Allergies" },
      { key: "Chronic Condition", val: "Hypertension" },
    ],
  },
  {
    id: 14,
    name: "Jannatul Ferdous",
    lastMessageDate: new Date().toDateString(),
    preview: "Appointment confirm korlam.",
    time: "12:45 PM",
    unread: 0,
    online: false,
    patientId: "PT-2025-00044",
    phone: "01922-334455",
    consultationReason: "Chest pain, Breathing problem",
    consultationStarted: "Started at 10:30 AM",
    summary: [
      { key: "Blood Group", val: "B+" },
      { key: "Height / Weight", val: "5'1\" / 72 kg" },
      { key: "Allergies", val: "No Known Allergies" },
      { key: "Chronic Condition", val: "Hypertension" },
    ],
  },
  {
    id: 15,
    name: "Abdullah Al Mamun",
    lastMessageDate: new Date().toDateString(),
    preview: "Report ready hoyeche?",
    time: "01:45 PM",
    unread: 0,
    online: false,
    patientId: "PT-2025-00038",
    phone: "01812-667788",
    consultationReason: "Fever, Headache",
    consultationStarted: "Started at 09:15 AM",
    summary: [
      { key: "Blood Group", val: "A+" },
      { key: "Height / Weight", val: "5'4\" / 55 kg" },
      { key: "Allergies", val: "Penicillin" },
      { key: "Chronic Condition", val: "None" },
    ],
  },
  {
    id: 16,
    name: "Tanjina Rahman",
    lastMessageDate: new Date().toDateString(),
    preview: "Follow up kobe korbo?",
    time: "02:45 PM",
    unread: 0,
    online: false,
    patientId: "PT-2025-00031",
    phone: "01711-223366",
    consultationReason: "Back pain, Fatigue",
    consultationStarted: "Started at 11:00 AM",
    summary: [
      { key: "Blood Group", val: "O+" },
      { key: "Height / Weight", val: "5'3\" / 80 kg" },
      { key: "Allergies", val: "No Known Allergies" },
      { key: "Chronic Condition", val: "Diabetes" },
    ],
  },
];

const chatMessages = [
  { id: 1, from: "patient", text: "Assalamualaikum Doctor, ami ajker test report gulo pathiyechi.", time: "10:20 AM", date: "May 14, 2025" },
  { id: 2, from: "doctor", text: "Wa Alaikum Assalam. Report gulo peye gechi. Ami review kore apnake janacchi.", time: "10:22 AM", read: true },
  { id: 3, from: "patient", text: "Ji doctor, amar sugar ektu besi chilo, eta niye ami chintito.", time: "10:23 AM" },
  { id: 4, from: "doctor", text: "Chinta korben na. Diet control r regular exercise korle bhalo thakben. Aro details e janar jonno video consultation korbo.", time: "10:25 AM", read: true },
  { id: 5, from: "patient", text: "Ok doctor. Thanks.", time: "10:26 AM" },
  { id: 6, from: "doctor", text: "Apnar prescription ready. Please collect from your registered outlet.", time: "09:30 AM", date: "May 15, 2025", read: true },
  { id: 7, from: "patient", text: "Thank you doctor. I will follow your advice.", time: "10:35 AM" },
];

const quickActions = [
  { label: "Send Prescription", icon: "prescription", color: "blue" },
  { label: "Send Report", icon: "report", color: "red" },
];


function getIcon(type, cls = "") {
  const icons = {
    search: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>,
    filter: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>,
    phone: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12 19.79 19.79 0 0 1 1 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
    video: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>,
    tick: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>,
    doubletick: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 12 6 7 1" /><path d="M7 6s-5 5-5 12" /><path d="M22 1 11 12" /></svg>,
    attach: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>,
    emoji: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>,
    send: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>,
    user: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    prescription: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" /></svg>,
    report: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    calendar: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    clock: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    message: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>,
    chevrondown: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>,
    doc: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
    sms: <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  };
  return icons[type] || null;
}

const emojis = [
  "😊", "😷", "🤒", "💊", "🩺", "🏥", "❤️", "👍", "🙏", "✅",
  "😌", "🤧", "🩹", "💉", "🧬", "🫀", "🧠", "😴", "🤕", "😟",
  "👋", "📋", "📅", "⏰", "🔬", "🩻", "💪", "🌡️", "🍎", "💧",
  "😢", "😰", "🥺", "😔", "🫂", "🤝", "👨‍⚕️", "👩‍⚕️", "🏃", "🧘",
  "🥗", "🥦", "🫁", "🦷", "👁️", "👂", "🦴", "🤞", "💬", "📞"
];

const qaColorMap = { blue: "blue", red: "red", orange: "orange", teal: "teal", purple: "purple" };

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedConv, setSelectedConv] = useState(conversations[0]);
  const [messageText, setMessageText] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);

  const handleTextChange = (e) => {
    setMessageText(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleFileAttach = (accept = "*") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      setAttachedFiles(prev => [...prev, ...files]);
    };
    input.click();
  };

  const handleRemoveFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (!messageText.trim() && attachedFiles.length === 0) return;
    setMessageText("");
    setCharCount(0);
    setAttachedFiles([]);
  };

  const filteredConversations = conversations.filter(conv => {
    if (activeTab === "unread") return conv.unread > 0;
    if (activeTab === "all") return conv.lastMessageDate === TODAY;
    return true;
  });

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
      <div className="msg-page-wrap">
        {/* ── Left: Conversation List ──────────────────────── */}
        <div className="msg-conv-col">
          {/* Tabs */}
          <div className="msg-tabs">
            <button className={`msg-tab${activeTab === "all" ? " active" : ""}`} onClick={() => setActiveTab("all")}>
              All Messages
            </button>
            <button className={`msg-tab${activeTab === "unread" ? " active" : ""}`} onClick={() => setActiveTab("unread")}>
              Unread <span className="badge">24</span>
            </button>
            <button style={{ marginLeft: "auto", padding: "10px 8px", border: "none", background: "transparent", cursor: "pointer" }}>
              {getIcon("filter")}
            </button>
          </div>

          {/* Search */}
          <div className="msg-search-wrap">
            <div className="msg-search-box">
              {getIcon("search")}
              <input type="text" placeholder="Search conversations..." />
            </div>
          </div>

          {/* List */}
          <div className="msg-conv-list">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                className={`msg-conv-item${selectedConv?.id === conv.id ? " active" : ""}${conv.unread > 0 ? " unread" : ""}`}
                onClick={() => setSelectedConv(conv)}
              >
                <div className="msg-conv-avatar">
                  <img
                    src={`/images/patients/${String(conv.id).padStart(2, "0")}.jpg`}
                    alt={conv.name}
                    onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
                  />
                  <span style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}><img
                    src={`/images/patients/${String(selectedConv?.id).padStart(2, "0")}.jpg`}
                    alt={selectedConv?.name}
                    onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
                  />
                    <span style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>{getIcon("user")}</span></span>
                  {conv.online && <span className="msg-online-dot" />}
                </div>
                <div className="msg-conv-body">
                  <div className="msg-conv-row">
                    <p className="msg-conv-name">{conv.name}</p>
                    <span className="msg-conv-time">{conv.time}</span>
                  </div>
                  <p className="msg-conv-preview">{conv.preview}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="msg-unread-badge">{conv.unread}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Middle: Chat ─────────────────────────────────── */}
        <div className="msg-chat-col">
          {/* Chat Header */}
          <div className="msg-chat-header">
            <div className="msg-chat-patient">
              <div className="msg-chat-patient-avatar">
                <img
                  src="/images/patients/01.jpg"
                  alt="Patient"
                  onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
                />
                <span style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>{getIcon("user")}</span>
              </div>
              <div className="msg-chat-patient-info">
                <h4>
                  {selectedConv?.name}
                  <span className="msg-verified-badge">Verified Patient</span>
                </h4>
                <p>{selectedConv?.phone} • Patient ID: {selectedConv?.patientId}</p>
              </div>
            </div>
            <div className="msg-chat-actions">
              <Link href="/patient-portal/messages/audio-call" className="msg-action-btn">
                {getIcon("phone")}
              </Link>
              <Link href="/patient-portal/messages/video-call" className="msg-action-btn blue">
                {getIcon("video")}
              </Link>
            </div>
          </div>

          {/* Chat Body */}
          <div className="msg-chat-body">
            {chatMessages.map((msg, i) => {
              const isDoctor = msg.from === "doctor";
              const showDate = msg.date && (i === 0 || chatMessages[i - 1].date !== msg.date);
              return (
                <div key={msg.id}>
                  {showDate && (
                    <div className="msg-date-divider">
                      <span>{msg.date}</span>
                    </div>
                  )}
                  <div className={`msg-bubble-wrap${isDoctor ? " sent" : ""}`}>
                    {!isDoctor && (
                      <div className="msg-bubble-avatar">
                        <img
                          src={`/images/patients/${String(selectedConv?.id).padStart(2, "0")}.jpg`}
                          alt={selectedConv?.name}
                          onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
                        />
                        <span style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>{getIcon("user")}</span>
                      </div>
                    )}
                    <div>
                      <div className={`msg-bubble${isDoctor ? " sent" : " received"}`}>
                        {msg.text}
                      </div>
                      <div className={`msg-bubble-meta${isDoctor ? " sent" : ""}`}>
                        {msg.time}
                        {isDoctor && (
                          <span className="msg-double-tick">
                            {getIcon("tick")}
                          </span>
                        )}
                      </div>
                    </div>
                    {isDoctor && (
                      <div className="msg-bubble-avatar">
                        <img
                          src={`/images/patients/${String(selectedConv?.id).padStart(2, "0")}.jpg`}
                          alt={selectedConv?.name}
                          onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
                        />
                        <span style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>{getIcon("user")}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input */}
          <div className="msg-chat-input-wrap" style={{ position: "relative" }}>
            <div className="msg-char-count">{charCount}/160</div>
            {attachedFiles.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                {attachedFiles.map((file, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 6, fontSize: 11.5, color: "#014fa1" }}>
                    <span style={{ maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</span>
                    <button onClick={() => handleRemoveFile(index)} style={{ border: "none", background: "none", cursor: "pointer", color: "#64748b", fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
                  </div>
                ))}
              </div>
            )}
            <div className="msg-input-box">
              <textarea
                placeholder="Type your message..."
                value={messageText}
                onChange={handleTextChange}
                rows={1}
              />
            </div>
            <div className="msg-input-actions">
              <div className="msg-input-tools">
                <button className="msg-tool-btn" onClick={() => handleFileAttach("image/*,application/pdf")}>
                  {getIcon("attach")} Attach File
                </button>
                <div>
                  <button className="msg-tool-btn" onClick={() => setShowEmoji(prev => !prev)}>
                    {getIcon("emoji")} Emoji
                  </button>
                  {showEmoji && (
                    <div style={{
                      position: "absolute", bottom: "calc(100% + 8px)", left: 0,
                      background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)", padding: 10,
                      marginLeft: "15px",
                      display: "grid", gridTemplateColumns: "repeat(10, 1fr)", zIndex: 100,
                    }}>
                      <div style={{ gridColumn: "1/-1", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#64748b" }}>Quick Emojis</span>
                        <button onClick={() => setShowEmoji(false)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 16, color: "#94a3b8", lineHeight: 1, padding: 0 }}>×</button>
                      </div>
                      {emojis.map((emoji, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setMessageText(prev => { const updated = prev + emoji; setCharCount(updated.length); return updated; });
                            setShowEmoji(false);
                          }}
                          style={{ border: "none", background: "none", cursor: "pointer", fontSize: 20, padding: "4px 2px", borderRadius: 6, transition: "background 0.15s" }}
                          onMouseEnter={e => e.currentTarget.style.background = "#f1f5f9"}
                          onMouseLeave={e => e.currentTarget.style.background = "none"}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button className="msg-send-btn" onClick={handleSend}>
                Send SMS {getIcon("send")}
              </button>
            </div>
          </div>
        </div>

        {/* ── Right: Patient Info ──────────────────────────── */}
        <div className="msg-info-col">
          {/* Patient Card */}
          <div className="msg-patient-card">
            <div className="msg-patient-avatar-lg">
              <img
                src={`/images/patients/${String(selectedConv?.id).padStart(2, "0")}.jpg`}
                alt={selectedConv?.name}
                onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
              />
              <span style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>{getIcon("user")}</span>
            </div>
            <h3>{selectedConv?.name}</h3>
            <p>32 Years, Male</p>
            <p className="msg-patient-id">{selectedConv?.phone}</p>
            <p className="msg-patient-id">{selectedConv?.patientId}</p>
            <Link
              href={`/patient-portal/profile?id=${selectedConv?.patientId}&from=/patient-portal/messages`}
              className="msg-view-profile-btn"
              style={{ display: "block", textAlign: "center", textDecoration: "none" }}
            >
              View Full Profile
            </Link>
          </div>


          {/* Consultation Reason */}
          <div>
            <p className="call-section-label">Consultation Reason</p>
            <p className="call-reason-text">{selectedConv?.consultationReason || "—"}</p>
            <p className="call-started-text">{selectedConv?.consultationStarted || ""}</p>
          </div>

          {/* Patient Summary */}
          <div>
            <div className="call-panel-list-header">
              <p className="call-section-label" style={{ margin: 0 }}>Patient Summary</p>
            </div>
            {(selectedConv?.summary || []).map((r) => (
              <div key={r.key} className="call-summary-row">
                <span className="call-summary-key">{r.key}</span>
                <span className="call-summary-val">{r.val}</span>
              </div>
            ))}
          </div>
          {/* Quick Actions */}
          <div className="msg-quick-actions">
            <p className="msg-info-section-title">Quick Actions</p>
            {quickActions.map((qa) => (
              <div
                key={qa.label}
                className="msg-quick-action-item"
                onClick={() => {
                  if (qa.label === "Send Prescription") handleFileAttach("application/pdf,image/*");
                  if (qa.label === "Send Report") handleFileAttach("application/pdf,image/*");
                }}
              >
                <div className={`msg-qa-icon ${qaColorMap[qa.color]}`}>
                  {getIcon(qa.icon)}
                </div>
                <span>{qa.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
