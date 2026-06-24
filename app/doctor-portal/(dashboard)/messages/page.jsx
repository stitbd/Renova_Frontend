// app/doctor-portal/messages/page.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hook";

import "./doctor-dashboard-massages.css";
import { chatApi } from "@/utils/chatApi";
import { getSocket } from "@/utils/socket";
import { ArrowDownToLine, Check, CheckCheck, NotebookText, Paperclip, Phone, PhoneOff, Search, Send, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { videoCallApi } from "@/utils/videoCallApi";
import { useCall } from "@/providers/CallProvider";

function getInitials(name = "Patient") {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatTime(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}

function normalizeConversation(conv) {
  const user = conv.otherUser || {};

  console.log('normalize user', user)

  return {
    id: conv.id,
    appointmentId: conv.appointmentId,
    receiverId: user.id,
    name: user.name || "Unknown Patient",
    phone: user.mobileNumber || "N/A",
    gender: user.gender,
    dateOfBirth: user.dateOfBirth,
    patientId: user.id || "N/A",
    lastMessage: conv.lastMessage?.message || "",
    lastMessageAt:
      conv.lastMessage?.createdAt || conv.updatedAt || conv.createdAt,
    unread: conv.unreadCount || 0,
    raw: conv,
  };
}

function normalizeMessage(msg, authUserId) {
  return {
    id: msg.id,
    type: msg.type,
    text: msg.message || msg.text || "",
    fileUrl: msg.fileUrl,
    fileName: msg.fileName,
    mine: msg.senderId === authUserId,
    createdAt: msg.createdAt,
    seenAt: msg.seenAt,
  };
}

function uniqueMessages(messages) {
  const map = new Map();

  for (const msg of messages) {
    if (!msg?.id) continue;
    map.set(msg.id, msg);
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
}

const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return "N/A";

  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};



export default function MessagesPage() {
  const call = useCall();
  const token = useAppSelector((state) => state.auth.accessToken);
  const authUser = useAppSelector((state) => state.auth.user);
  const searchParams = useSearchParams();

  const receiverIdFromUrl = searchParams.get("receiverId");
  const appointmentIdFromUrl = searchParams.get("appointmentId");

  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const [onlineUserIds, setOnlineUserIds] = useState(new Set());
  const [typingUsers, setTypingUsers] = useState({});
  const typingTimeoutRef = useRef(null);
  const [chatSearchTerm, setChatSearchTerm] = useState("");

  const MESSAGE_LIMIT = 30;

  const [messagePage, setMessagePage] = useState(1);
  const [hasMoreMessages, setHasMoreMessages] = useState(false);
  const [isLoadingOlderMessages, setIsLoadingOlderMessages] = useState(false);
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [busyCall, setBusyCall] = useState(null);

  const isPrependingRef = useRef(false);
  const previousScrollHeightRef = useRef(0);


  console.log('selectedConv', selectedConv)

  const [error, setError] = useState("");
  const router = useRouter();
  const chatBodyRef = useRef(null);
  const selectedMessages = useMemo(() => {
    return uniqueMessages(messages).map((msg) =>
      normalizeMessage(msg, authUser?.id)
    );
  }, [messages, authUser?.id]);


  const loadOlderMessages = async () => {
    if (
      !token ||
      !selectedConv?.id ||
      isLoadingOlderMessages ||
      !hasMoreMessages
    ) {
      return;
    }

    const container = chatBodyRef.current;
    if (!container) return;

    const nextPage = messagePage + 1;

    isPrependingRef.current = true;
    previousScrollHeightRef.current = container.scrollHeight;

    try {
      setIsLoadingOlderMessages(true);

      const result = await chatApi.getMessages(
        token,
        selectedConv.id,
        nextPage,
        MESSAGE_LIMIT
      );

      const olderMessages = Array.isArray(result?.data?.data)
        ? result.data.data
        : [];

      const meta = result?.data?.meta;

      setMessages((prev) => uniqueMessages([...olderMessages, ...prev]));
      setMessagePage(nextPage);
      setHasMoreMessages(Boolean(meta && meta.page < meta.totalPage));

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const newScrollHeight = container.scrollHeight;
          const previousScrollHeight = previousScrollHeightRef.current;

          container.scrollTop = newScrollHeight - previousScrollHeight;
          isPrependingRef.current = false;
        });
      });
    } catch (err) {
      setError(err.message || "Failed to load older messages");
      isPrependingRef.current = false;
    } finally {
      setIsLoadingOlderMessages(false);
    }
  };

  const handleChatScroll = () => {
    const container = chatBodyRef.current;
    if (!container) return;

    if (container.scrollTop <= 80) {
      loadOlderMessages();
    }
  };


  useEffect(() => {
    if (!token) return;

    let ignore = false;

    async function loadConversations() {
      try {
        setIsLoadingConversations(true);
        setError("");

        const result = await chatApi.getConversations(token);
        const list = Array.isArray(result.data) ? result.data : [];

        const normalized = list.map(normalizeConversation);
        // console.log('normalized 8',normalized)
        setConversations(normalized);

        if (receiverIdFromUrl) {
          const detailResult = await chatApi.getConversationByParticipant(token, {
            receiverId: receiverIdFromUrl,
            appointmentId: appointmentIdFromUrl,
          });

          const detail = detailResult.data;

          console.log('details', detail)

          const selected = detail.conversation
            ? normalizeConversation({
              ...detail.conversation,
              otherUser: detail.otherUser,
              lastMessage: detail.lastMessage,
            })
            : {
              id: null,
              receiverId: detail.receiverId,
              appointmentId: detail.appointmentId,
              name: detail.otherUser?.name || "Patient",
              phone: detail.otherUser.mobileNumber || "N/A",
              patientId: detail.otherUser?.id || receiverIdFromUrl,
              lastMessage: "",
              lastMessageAt: null,
              unread: 0,
            };

          console.log('selecteed ', selected)

          setSelectedConv(selected);
          return;
        }

        setSelectedConv(normalized[0] || null);
      } catch (err) {
        if (!ignore) setError(err.message || "Failed to load conversations");
      } finally {
        if (!ignore) setIsLoadingConversations(false);
      }
    }

    loadConversations();

    return () => {
      ignore = true;
    };
  }, [token, receiverIdFromUrl, appointmentIdFromUrl]);

  useEffect(() => {
    if (!token || !selectedConv?.id) {
      setMessages([]);
      setMessagePage(1);
      setHasMoreMessages(false);
      return;
    }

    let ignore = false;

    async function loadMessages() {
      try {
        setIsLoadingMessages(true);
        setError("");

        const result = await chatApi.getMessages(
          token,
          selectedConv.id,
          1,
          MESSAGE_LIMIT
        );

        const list = Array.isArray(result?.data?.data)
          ? result.data.data
          : [];

        const meta = result?.data?.meta;

        if (ignore) return;

        setMessages(list);
        setMessagePage(1);
        setHasMoreMessages(Boolean(meta && meta.page < meta.totalPage));

        list.forEach((msg) => {
          markMessageAsSeen(msg);
        });

      } catch (err) {
        if (!ignore) setError(err.message || "Failed to load messages");
      } finally {
        if (!ignore) setIsLoadingMessages(false);
      }
    }

    loadMessages();

    return () => {
      ignore = true;
    };
  }, [token, selectedConv?.id]);

  useEffect(() => {
    if (!token) return;

    const socket = getSocket(token);
    if (!socket) return;

    const handleIncomingMessage = (payload) => {
      const msg = payload?.data || payload;

      if (!msg) return;

      const incomingConversationId =
        msg.conversationId || msg.conversation?.id;

      if (incomingConversationId === selectedConv?.id) {
        setMessages((prev) => {
          const exists = prev.some((item) => item.id === msg.id);

          if (exists) {
            return prev.map((item) => (item.id === msg.id ? msg : item));
          }

          return [...prev, msg];
        });
      }

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === incomingConversationId
            ? {
              ...conv,
              lastMessage: msg.message,
              lastMessageAt: msg.createdAt,
            }
            : conv
        )
      );

      if (
        msg.receiverId === authUser?.id &&
        !msg.seenAt &&
        token
      ) {
        chatApi.markSeen(token, msg.id).catch(() => { });
      }

      if (msg.receiverId === authUser?.id && !msg.seenAt) {
        chatApi.markSeen(token, msg.id).catch(() => { });
      }

    };

    const handleSeenMessage = (payload) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === payload.messageId
            ? { ...msg, seenAt: payload.seenAt }
            : msg
        )
      );
    };

    const handleOnlineUsers = ({ onlineUserIds = [] }) => {
      setOnlineUserIds(new Set(onlineUserIds));
    };

    const handleUserOnline = ({ userId }) => {
      setOnlineUserIds((prev) => {
        const next = new Set(prev);
        next.add(userId);
        return next;
      });
    };

    const handleUserOffline = ({ userId }) => {
      setOnlineUserIds((prev) => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    };

    const handleTypingStart = ({ userId }) => {
      setTypingUsers((prev) => ({
        ...prev,
        [userId]: true,
      }));
    };

    const handleTypingStop = ({ userId }) => {
      setTypingUsers((prev) => ({
        ...prev,
        [userId]: false,
      }));
    };

    const handleCallBusy = (payload) => {
      setBusyCall({
        message: payload?.message || "User is currently busy in another call",
        createdAt: Date.now(),
      });
    };

    socket.on("call_busy", handleCallBusy);
    socket.on("typing_start", handleTypingStart);
    socket.on("typing_stop", handleTypingStop);

    socket.on("online_users", handleOnlineUsers);
    socket.on("user_online", handleUserOnline);
    socket.on("user_offline", handleUserOffline);

    socket.on("receive_message", handleIncomingMessage);
    socket.on("message_sent", handleIncomingMessage);
    socket.on("message_seen", handleSeenMessage);

    return () => {
      socket.off("receive_message", handleIncomingMessage);
      socket.off("new_message", handleIncomingMessage);
      socket.off("message", handleIncomingMessage);
      socket.off("message_seen", handleSeenMessage);
      socket.off("online_users", handleOnlineUsers);
      socket.off("user_online", handleUserOnline);
      socket.off("user_offline", handleUserOffline);
      socket.off("typing_start", handleTypingStart);
      socket.off("typing_stop", handleTypingStop);
      socket.off("call_busy", handleCallBusy);
    };
  }, [token, selectedConv?.id]);

  useEffect(() => {
    if (isPrependingRef.current) return;

    const container = chatBodyRef.current;
    if (!container) return;

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    if (distanceFromBottom < 120) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [selectedMessages.length]);


  const handleSend = async () => {
    const text = messageText.trim();

    const socket = getSocket(token);

    socket?.emit("typing_stop", {
      receiverId: selectedConv.receiverId,
    });

    if ((!text && !selectedFile) || !token || !selectedConv?.receiverId) {
      return;
    }

    const optimisticMessage = {
      id: `temp-${Date.now()}`,
      conversationId: selectedConv.id,
      senderId: authUser?.id,
      receiverId: selectedConv.receiverId,
      message: text || selectedFile?.name || "Attachment",
      fileName: selectedFile?.name,
      fileUrl: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
      type: selectedFile ? "FILE" : "TEXT",
      createdAt: new Date().toISOString(),
      optimistic: true,
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setMessageText("");
    setSelectedFile(null);

    try {
      const formData = new FormData();

      formData.append("receiverId", selectedConv.receiverId);

      if (text) {
        formData.append("message", text);
      }

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const result = await chatApi.sendMessage(token, formData, true);

      const savedMessage = result.data;

      setMessages((prev) => {
        const withoutTemp = prev.filter((msg) => msg.id !== optimisticMessage.id);
        const exists = withoutTemp.some((msg) => msg.id === savedMessage.id);

        if (exists) {
          return withoutTemp.map((msg) =>
            msg.id === savedMessage.id ? savedMessage : msg
          );
        }

        return [...withoutTemp, savedMessage];
      });

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConv.id
            ? {
              ...conv,
              lastMessage: savedMessage.message || savedMessage.fileName || "Attachment",
              lastMessageAt: savedMessage.createdAt,
            }
            : conv
        )
      );
    } catch (err) {
      setMessages((prev) => prev.filter((msg) => msg.id !== optimisticMessage.id));
      setError(err.message || "Failed to send message");
    }
  };
  const handleStartCall = async (callType) => {
    if (!token || !selectedConv?.receiverId) return;

    try {
      const result = await videoCallApi.start(token, {
        receiverId: selectedConv.receiverId,
        callType,
      });

      await call.createCallSession({
        ...result.data,
        receiverId: selectedConv.receiverId,
        receiverName: selectedConv.name,
        role: "CALLER",
        portal: "DOCTOR",
      });

      const path =
        callType === "AUDIO"
          ? "/doctor-portal/messages/audio-call"
          : "/doctor-portal/messages/video-call";

      router.push(`${path}?callId=${result.data.callId}`);
    } catch (err) {
      if (err?.message?.toLowerCase().includes("busy")) {
        setBusyCall({
          message: err.message,
          createdAt: Date.now(),
        });
        return;
      }

      setError(err.message || "Failed to start call");
    }
  };

  const markMessageAsSeen = async (msg) => {
    if (!token || !msg?.id || msg.seenAt) return;
    if (msg.receiverId !== authUser?.id) return;

    try {
      await chatApi.markSeen(token, msg.id);
    } catch {
      // silent fail
    }
  };


  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const maxSize = 50 * 1024 * 1024; // 50MB

    const allowedTypes = [
      // Images
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",

      // Documents
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

      // Videos
      "video/mp4",
      "video/quicktime", // mov
      "video/x-msvideo", // avi
      "video/webm",
      "video/x-matroska", // mkv
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Only images, documents, and videos are allowed."
      );
      e.target.value = "";
      return;
    }

    if (file.size > maxSize) {
      setError("File size must be less than 50MB.");
      e.target.value = "";
      return;
    }

    setError("");
    setSelectedFile(file);
    e.target.value = "";
  };


  const visibleMessages = useMemo(() => {
    const q = chatSearchTerm.trim().toLowerCase();

    if (!q) return selectedMessages;

    return selectedMessages.filter((msg) => {
      return (
        msg.text?.toLowerCase().includes(q) ||
        msg.fileName?.toLowerCase().includes(q)
      );
    });
  }, [selectedMessages, chatSearchTerm]);


  if (!token) {
    return <div className="apt-empty">Authentication token not found.</div>;
  }

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
      <div className="msg-page-wrap">
        <div className="msg-conv-col">
          <div className="msg-tabs">
            <button className="msg-tab active">All Messages</button>
          </div>

          <div className="msg-conv-list">
            {isLoadingConversations && (
              <div className="msg-conv-item">Loading conversations...</div>
            )}

            {!isLoadingConversations &&
              conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`msg-conv-item${selectedConv?.id === conv.id ? " active" : ""
                    }${conv.unread > 0 ? " unread" : ""}`}
                  onClick={() => setSelectedConv(conv)}
                >
                  <div className="msg-conv-avatar">
                    <span>{getInitials(conv.name)}</span>
                  </div>

                  <div className="msg-conv-body">
                    <div className="msg-conv-row">
                      <p className="msg-conv-name">{conv.name}</p>
                      <span className="msg-conv-time">
                        {formatTime(conv.lastMessageAt)}
                      </span>
                    </div>
                    <p className="msg-conv-preview">
                      {conv.lastMessage || "No messages yet"}
                    </p>
                  </div>

                  {conv.unread > 0 && (
                    <span className="msg-unread-badge">{conv.unread}</span>
                  )}
                </div>
              ))}
          </div>
        </div>

        <div className="msg-chat-col">
          {selectedConv ? (
            <>
              <div className="msg-chat-header">
                <div className="msg-chat-patient">
                  <div className="msg-chat-patient-avatar">
                    <span>{getInitials(selectedConv.name)}</span>
                  </div>

                  <div className="msg-chat-patient-info">
                    <h4>
                      {selectedConv.name}
                      <span className="msg-verified-badge">
                        Patient
                      </span>
                    </h4>

                    <div className="msg-user-status">
                      {onlineUserIds.has(selectedConv.receiverId) ? (
                        <>
                          <span className="status-dot online" />
                          Online
                        </>
                      ) : (
                        <>
                          <span className="status-dot offline" />
                          Offline
                        </>
                      )}
                    </div>
                  </div>


                </div>

                {/* CALL ACTIONS */}
                <div className="msg-chat-actions">

                  <div className="msg-chat-search">
                    <Search size={16} />

                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={chatSearchTerm}
                      onChange={(e) => setChatSearchTerm(e.target.value)}
                    />

                    {chatSearchTerm && (
                      <button
                        type="button"
                        onClick={() => setChatSearchTerm("")}
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <button
                    className="msg-action-btn"
                    onClick={() => handleStartCall("AUDIO")}
                  >
                    <Phone size={18} />
                  </button>

                  <button
                    className="msg-action-btn blue"
                    onClick={() => handleStartCall("VIDEO")}
                  >
                    <Video size={18} />
                  </button>

                </div>
              </div>

              <div
                className="msg-chat-body"
                ref={chatBodyRef}
                onScroll={handleChatScroll}
              >
                {isLoadingOlderMessages && (
                  <div className="msg-load-older">Loading older messages...</div>
                )}
                {isLoadingMessages && (
                  <div className="msg-load-older">Loading  messages...</div>
                )}


                {!isLoadingMessages && visibleMessages.map((msg) => {
                  const isCall = msg.type === "CALL";

                  return (
                    <div
                      key={msg.id}
                      className={`msg-bubble-wrap${msg.mine ? " sent" : ""}`}
                    >
                      {!msg.mine && !isCall && (
                        <div className="msg-bubble-avatar">
                          <span>{getInitials(selectedConv.name)}</span>
                        </div>
                      )}

                      {isCall ? (
                        <div className={`msg-call-message ${msg.mine ? "sent" : "received"}`}>
                          {!msg.mine && (
                            <div className="msg-bubble-avatar">
                              <span>{getInitials(selectedConv.name)}</span>
                            </div>
                          )}

                          <div className="msg-call-stack">
                            <div className={`msg-call-bubble ${msg.mine ? "sent" : "received"}`}>
                              <div className="msg-call-content">
                                <div className="msg-call-title">
                                  {msg.text || msg.message}
                                </div>
                                <div className="msg-call-subtitle">Call history</div>
                              </div>
                            </div>

                            <div className={`msg-bubble-meta${msg.mine ? " sent" : ""}`}>
                              {formatTime(msg.createdAt)}

                              {msg.mine && (
                                <span className={`msg-seen-status${msg.seenAt ? " seen" : ""}`}>
                                  {msg.seenAt ? <CheckCheck size={16} /> : <Check size={16} />}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={`msg-content-stack${msg.mine ? " sent" : ""}`}>
                          <div
                            className={`msg-bubble${msg.mine ? " sent" : " received"}${msg.fileUrl ? " has-file" : ""
                              }`}
                          >
                            {msg.text && <div className="msg-text-content">{msg.text}</div>}

                            {msg.fileUrl && (
                              <div className="msg-media-wrapper">
                                {msg.type === "IMAGE" ||
                                  msg.fileName?.match(/\.(jpg|jpeg|png|webp)$/i) ? (
                                  <button
                                    type="button"
                                    className="msg-image-preview-btn"
                                    onClick={() =>
                                      setPreviewImage({
                                        url: msg.fileUrl,
                                        name: msg.fileName || "Image",
                                      })
                                    }
                                  >
                                    <img
                                      src={msg.fileUrl}
                                      alt={msg.fileName || "Image attachment"}
                                      className="msg-image-preview"
                                    />
                                  </button>
                                ) : msg.fileName?.match(/\.(mp4|mov|avi|webm|mkv)$/i) ? (
                                  <video controls className="msg-video-preview">
                                    <source src={msg.fileUrl} />
                                  </video>
                                ) : (
                                  <div className="msg-file-card">
                                    <button
                                      type="button"
                                      className="msg-file-main"
                                      onClick={() => window.open(msg.fileUrl, "_blank", "noopener,noreferrer")}
                                    >
                                      <div className="msg-file-icon">
                                        {msg.fileName?.toLowerCase().endsWith(".pdf")
                                          ? "📄"
                                          : msg.fileName?.match(/\.(doc|docx)$/i)
                                            ? "📝"
                                            : msg.fileName?.match(/\.(xls|xlsx|csv)$/i)
                                              ? "📊"
                                              : "📎"}
                                      </div>

                                      <div className="msg-file-info">
                                        <div className="msg-file-name">
                                          {msg.fileName || "Attachment"}
                                        </div>

                                        <div className="msg-file-type">
                                          {msg.fileName?.split(".").pop()?.toUpperCase() || "FILE"}
                                        </div>
                                      </div>
                                    </button>

                                    <a
                                      href={msg.fileUrl}
                                      download={msg.fileName || "attachment"}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="msg-file-download"
                                      title="Download"
                                    >
                                      <ArrowDownToLine size={16} />
                                    </a>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          <div className={`msg-bubble-meta${msg.mine ? " sent" : ""}`}>
                            {formatTime(msg.createdAt)}

                            {msg.mine && (
                              <span className={`msg-seen-status${msg.seenAt ? " seen" : ""}`}>
                                {msg.seenAt ? <CheckCheck size={16} /> : <Check size={16} />}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {error && (
                <p style={{ color: "red", padding: "0 16px" }}>{error}</p>
              )}

              {typingUsers[selectedConv?.receiverId] && (
                <div className="msg-typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                  <p>{selectedConv?.name} is typing...</p>
                </div>
              )}

              <div className="msg-chat-input-wrap">
                {selectedFile && (
                  <div className="msg-selected-file">
                    <div>
                      <strong>{selectedFile.name}</strong>

                      <span>
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                    >
                      ×
                    </button>
                  </div>
                )}

                <div className="msg-input-composer">
                  <textarea
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => {
                      setMessageText(e.target.value);

                      if (!selectedConv?.receiverId) return;

                      const socket = getSocket(token);

                      socket?.emit("typing_start", {
                        receiverId: selectedConv.receiverId,
                      });

                      clearTimeout(typingTimeoutRef.current);

                      typingTimeoutRef.current = setTimeout(() => {
                        socket?.emit("typing_stop", {
                          receiverId: selectedConv.receiverId,
                        });
                      }, 1000);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    rows={1}
                  />

                  <label className="msg-attach-btn">
                    <Paperclip size={18} />
                    <input
                      type="file"
                      hidden
                      onChange={handleFileSelect}
                    />
                  </label>

                  <button
                    className="msg-send-icon-btn"
                    onClick={handleSend}
                    disabled={!messageText.trim() && !selectedFile}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="msg-chat-body">
              <p>No conversation selected.</p>
            </div>
          )}
        </div>

        <div className="msg-info-col">
          {selectedConv && (
            <>
              <div className="msg-patient-card">
                <div className="msg-patient-avatar-lg">
                  <span>{getInitials(selectedConv.name)}</span>
                </div>

                <h3>{selectedConv.name}</h3>

                <p className="msg-patient-id">
                  {calculateAge(selectedConv.dateOfBirth)} Years, {selectedConv.gender}
                </p>

                <p className="msg-patient-id">{selectedConv.phone}</p>

                <Link
                  href={`/doctor-portal/patients/patient-profile?id=${selectedConv.patientId}&from=/doctor-portal/messages`}
                  className="msg-view-profile-btn"
                >
                  View Full Profile
                </Link>
              </div>

              <div className="msg-quick-actions">
                <h4>Quick Actions</h4>

                <Link href={`/doctor-portal/prescriptions/new-prescriptions?patientId=${selectedConv.patientId}`} className="msg-action-btn">
                  <span className="msg-action-icon blue"><NotebookText /></span>
                  Attach Prescription
                </Link>

                <button className="msg-action-btn">
                  <span className="msg-action-icon red">📋</span>
                  Send Report
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {busyCall && (
        <div className="call-busy-overlay">
          <div className="call-busy-card">
            <button
              type="button"
              className="call-busy-close"
              onClick={() => setBusyCall(null)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="call-busy-icon-wrap">
              <div className="call-busy-pulse"></div>
              <div className="call-busy-icon">  <PhoneOff size={28} />
              </div>
            </div>

            <div className="call-busy-content">
              <span className="call-busy-label">Call unavailable</span>

              <h3 className="call-busy-title">
                {selectedConv?.name || "User"} is busy
              </h3>

              <p className="call-busy-text">
                {busyCall.message ||
                  "This user is currently on another call. Please try again later."}
              </p>
            </div>

            <div className="call-busy-actions">
              <button
                type="button"
                className="call-busy-primary"
                onClick={() => setBusyCall(null)}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
      {previewImage && (
        <div className="msg-image-modal">
          <div className="msg-image-modal-header">
            <span>{previewImage.name}</span>

            <div>
              <a
                href={previewImage.url}
                download={previewImage.name}
                target="_blank"
                rel="noreferrer"
                className="msg-image-modal-action"
              >
                Download
              </a>

              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="msg-image-modal-close"
              >
                ×
              </button>
            </div>
          </div>

          <img src={previewImage.url} alt={previewImage.name} />
        </div>
      )}
    </div>
  );
}
