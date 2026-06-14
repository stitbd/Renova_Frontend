"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hook";
import { chatApi } from "@/utils/chatApi";
import { getSocket } from "@/utils/socket";
import "./patient-massages.css";
import {
  Search,
  Phone,
  Video,
  Send,
  User,
  Paperclip
} from "lucide-react";
import { CheckCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { videoCallApi } from "@/utils/videoCallApi";
import { saveCallSession } from "@/utils/callSession";


function getInitials(name = "User") {
  return String(name)
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
  const doctor = conv.otherUser || {};

  return {
    id: conv.id,
    receiverId: doctor.id,
    doctorId: doctor.id,
    name: doctor.name || "Unknown Doctor",
    userType: doctor.userType || "DOCTOR",
    lastMessage: conv.lastMessage?.message || "",
    lastMessageAt: conv.lastMessage?.createdAt || conv.updatedAt || conv.createdAt,
    unread: conv.unreadCount || 0,
    raw: conv,
  };
}

function normalizeMessage(msg, authUserId) {
  return {
    id: msg.id,
    type: msg.type, // add this
    text: msg.message || "",
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

export default function PatientMessagesPage() {
  const token = useAppSelector((state) => state.auth.accessToken);
  const authUser = useAppSelector((state) => state.auth.user);

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);


  const MESSAGE_LIMIT = 20;

  const [messagePage, setMessagePage] = useState(1);
  const [hasMoreMessages, setHasMoreMessages] = useState(false);
  const [isLoadingOlderMessages, setIsLoadingOlderMessages] = useState(false);
  const isPrependingRef = useRef(false);
  const previousScrollHeightRef = useRef(0);


  const [error, setError] = useState("");

  const router = useRouter();
  const [incomingCall, setIncomingCall] = useState(null);


  const chatBodyRef = useRef(null);

  const selectedMessages = useMemo(() => {
    return uniqueMessages(messages).map((msg) =>
      normalizeMessage(msg, authUser?.id)
    );
  }, [messages, authUser?.id]);

  const filteredConversations = useMemo(() => {
    let list = [...conversations];

    if (activeTab === "unread") {
      list = list.filter((conv) => conv.unread > 0);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((conv) => conv.name.toLowerCase().includes(q));
    }

    return list;
  }, [conversations, activeTab, searchTerm]);

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

        if (ignore) return;

        setConversations(normalized);
        setSelectedConv((prev) => prev || normalized[0] || null);
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
  }, [token]);

  useEffect(() => {
    if (!token || !selectedConv?.id) {
      setMessages([]);
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
        setHasMoreMessages(meta?.page < meta?.totalPage);
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
      if (!msg?.id) return;

      const conversationId = msg.conversationId;

      if (conversationId === selectedConv?.id) {
        setMessages((prev) => {
          const exists = prev.some((item) => item.id === msg.id);

          if (exists) {
            return prev.map((item) => (item.id === msg.id ? msg : item));
          }

          return [...prev, msg];
        });
      }

      setConversations((prev) => {
        const exists = prev.some((conv) => conv.id === conversationId);

        if (exists) {
          return prev
            .map((conv) =>
              conv.id === conversationId
                ? {
                  ...conv,
                  lastMessage: msg.message,
                  lastMessageAt: msg.createdAt,
                  unread:
                    selectedConv?.id === conversationId
                      ? conv.unread
                      : (conv.unread || 0) + 1,
                }
                : conv
            )
            .sort(
              (a, b) =>
                new Date(b.lastMessageAt || 0) - new Date(a.lastMessageAt || 0)
            );
        }

        const newConversation = {
          id: conversationId,
          receiverId: msg.senderId,
          doctorId: msg.senderId,
          name: msg.sender?.name || msg.sender?.fullName || "Doctor",
          userType: msg.sender?.userType || "DOCTOR",
          lastMessage: msg.message || "",
          lastMessageAt: msg.createdAt,
          unread: selectedConv?.id === conversationId ? 0 : 1,
          raw: null,
        };

        return [newConversation, ...prev];
      });
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
    const handleIncomingCall = (payload) => {
      setIncomingCall({
        ...payload,
        receivedAt: Date.now(),
      });
    };

    const handleCallMissed = (payload) => {
      setIncomingCall((prev) => {
        if (!prev) return null;
        if (!payload?.callId || prev.callId === payload.callId) return null;
        return prev;
      });
    };

    socket.on("audio_call_missed", handleCallMissed);
    socket.on("video_call_missed", handleCallMissed);

    socket.on("incoming_audio_call", handleIncomingCall);
    socket.on("incoming_video_call", handleIncomingCall);

    socket.on("receive_message", handleIncomingMessage);
    socket.on("message_sent", handleIncomingMessage);
    socket.on("message_seen", handleSeenMessage);

    return () => {
      socket.off("receive_message", handleIncomingMessage);
      socket.off("message_sent", handleIncomingMessage);
      socket.off("message_seen", handleSeenMessage);
      socket.off("incoming_audio_call", handleIncomingCall);
      socket.off("incoming_video_call", handleIncomingCall);
      socket.off("audio_call_missed", handleCallMissed);
      socket.off("video_call_missed", handleCallMissed);
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

  useEffect(() => {
    if (!incomingCall?.callId) return;

    const timer = setTimeout(() => {
      setIncomingCall((prev) => {
        if (prev?.callId === incomingCall.callId) return null;
        return prev;
      });
    }, 31_000);

    return () => clearTimeout(timer);
  }, [incomingCall?.callId]);


  const handleChatScroll = () => {
    const container = chatBodyRef.current;
    if (!container) return;

    if (container.scrollTop <= 80) {
      loadOlderMessages();
    }
  };


  const handleSend = async () => {
    const text = messageText.trim();

    if (!text || !token || !selectedConv?.receiverId) return;

    const optimisticMessage = {
      id: `temp-${Date.now()}`,
      conversationId: selectedConv.id,
      senderId: authUser?.id,
      receiverId: selectedConv.receiverId,
      message: text,
      createdAt: new Date().toISOString(),
      optimistic: true,
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setMessageText("");

    try {
      const result = await chatApi.sendMessage(token, {
        receiverId: selectedConv.receiverId,
        message: text,
      });

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
              lastMessage: savedMessage.message,
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

  const handleAcceptCall = async () => {
    if (!incomingCall?.callId || !token) return;

    const result = await videoCallApi.accept(token, incomingCall.callId);

    saveCallSession({
      ...result.data,
      callerId: incomingCall.callerId,
      callerName: incomingCall.callerName,
      role: "RECEIVER",
    });

    const path =
      incomingCall.callType === "AUDIO"
        ? "/patient-portal/messages/audio-call"
        : "/patient-portal/messages/video-call";

    setIncomingCall(null);
    router.push(`${path}?callId=${incomingCall.callId}`);
  };

  const handleStartCall = async (callType) => {
    if (!token || !selectedConv?.receiverId) return;

    const result = await videoCallApi.start(token, {
      receiverId: selectedConv.receiverId,
      callType,
    });

    saveCallSession({
      ...result.data,
      receiverId: selectedConv.receiverId,
      receiverName: selectedConv.name,
      role: "CALLER",
    });

    const path =
      callType === "AUDIO"
        ? "/patient-portal/messages/audio-call"
        : "/patient-portal/messages/video-call";

    router.push(`${path}?callId=${result.data.callId}`);
  };

  const handleRejectCall = async () => {
    if (!incomingCall?.callId || !token) return;

    await videoCallApi.reject(token, incomingCall.callId);
    setIncomingCall(null);
  };


  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    console.log(file);

    // upload file here
  };

  if (!token) {
    return <div className="apt-empty">Authentication token not found.</div>;
  }

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
      <div className="msg-page-wrap">
        <div className="msg-conv-col">
          <div className="msg-tabs">
            <button
              className={`msg-tab${activeTab === "all" ? " active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Messages
            </button>

            <button
              className={`msg-tab${activeTab === "unread" ? " active" : ""}`}
              onClick={() => setActiveTab("unread")}
            >
              Unread
            </button>
          </div>

          <div className="msg-search-wrap">
            <div className="msg-search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="msg-conv-list">
            {isLoadingConversations && (
              <div className="msg-conv-item">Loading conversations...</div>
            )}

            {!isLoadingConversations && filteredConversations.length === 0 && (
              <div className="msg-conv-item">No conversations found</div>
            )}

            {!isLoadingConversations &&
              filteredConversations.map((conv) => (
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
                      <span className="msg-verified-badge">Doctor</span>
                    </h4>
                    <p>Doctor ID: {selectedConv.doctorId}</p>
                  </div>
                </div>

                <div className="msg-chat-actions">
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

                {isLoadingMessages && <p>Loading messages...</p>}

                {!isLoadingMessages && selectedMessages.map((msg) => {
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
                              {/* <div className="msg-call-icon">
                                {msg.text?.toLowerCase().includes("video") ? "🎥" : "📞"}
                              </div> */}

                              <div className="msg-call-content">
                                <div className="msg-call-title">
                                  {msg.text || msg.message}
                                </div>
                                <div className="msg-call-subtitle">Call history</div>
                              </div>
                            </div>

                            <div className={`msg-bubble-meta${msg.mine ? " sent" : ""}`}>
                              {formatTime(msg.createdAt)}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className={`msg-bubble${msg.mine ? " sent" : " received"}`}>
                            {msg.text}

                            {msg.fileUrl && (
                              <div className="msg-attachment">
                                <a href={msg.fileUrl} target="_blank" rel="noreferrer">
                                  {msg.fileName || "Attachment"}
                                </a>
                              </div>
                            )}
                          </div>

                          <div className={`msg-bubble-meta${msg.mine ? " sent" : ""}`}>
                            {formatTime(msg.createdAt)}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {error && <p style={{ color: "red", padding: "0 16px" }}>{error}</p>}

              <div className="msg-chat-input-wrap">
                <div className="msg-input-composer">
                  <textarea
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
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
                    disabled={!messageText.trim()}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="msg-chat-body">
              <p>Select a conversation</p>
            </div>
          )}
        </div>

        <div className="msg-info-col">
          {selectedConv && (
            <div className="msg-patient-card">
              <div className="msg-patient-avatar-lg">
                <span>{getInitials(selectedConv.name)}</span>
              </div>

              <h3>{selectedConv.name}</h3>
              <p className="msg-patient-id">Doctor ID: {selectedConv.doctorId}</p>

              <Link
                href={`/patient-portal/doctors/profile?id=${selectedConv.doctorId}&from=/patient-portal/messages`}
                className="msg-view-profile-btn"
                style={{
                  display: "block",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                View Doctor Profile
              </Link>
            </div>
          )}
        </div>
      </div>
      {incomingCall && (
        <div className="incoming-call-overlay">
          <div className="incoming-call-card">
            <p className="incoming-call-label">
              Incoming {incomingCall.callType === "AUDIO" ? "Audio" : "Video"} Call
            </p>

            <h3>{incomingCall.callerName}</h3>

            <div className="incoming-call-actions">
              <button className="incoming-call-reject" onClick={handleRejectCall}>
                Reject
              </button>

              <button className="incoming-call-accept" onClick={handleAcceptCall}>
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}