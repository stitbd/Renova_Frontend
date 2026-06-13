// app/doctor-portal/messages/page.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hook";

import "./doctor-dashboard-massages.css";
import { chatApi } from "@/utils/chatApi";
import { getSocket } from "@/utils/socket";
import { Phone, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { videoCallApi } from "@/utils/videoCallApi";
import { saveCallSession } from "@/utils/callSession";

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

  return {
    id: conv.id,
    appointmentId: conv.appointmentId,
    receiverId: user.id,
    name: user.name || "Unknown Patient",
    phone: user.phone || "N/A",
    patientId: user.id || "N/A",
    lastMessage: conv.lastMessage?.message || "",
    lastMessageAt:
      conv.lastMessage?.createdAt || conv.updatedAt || conv.createdAt,
    unread: conv.unreadCount || 0,
    raw: conv,
  };
}

function normalizeMessage(msg, authUserId) {
  const senderId = msg.senderId || msg.sender?.id;
  const mine = senderId === authUserId;

  return {
    id: msg.id,
    text: msg.message || msg.text || "",
    fileUrl: msg.fileUrl,
    fileName: msg.fileName,
    mine,
    createdAt: msg.createdAt,
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


export default function MessagesPage() {
  const token = useAppSelector((state) => state.auth.accessToken);
  const authUser = useAppSelector((state) => state.auth.user);
  const searchParams = useSearchParams();

  const receiverIdFromUrl = searchParams.get("receiverId");
  const appointmentIdFromUrl = searchParams.get("appointmentId");

  const [conversations, setConversations] = useState([]);
  const [selectedConv, setSelectedConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const chatBodyRef = useRef(null);

  const selectedMessages = useMemo(() => {
    return uniqueMessages(messages).map((msg) =>
      normalizeMessage(msg, authUser?.id)
    );
  }, [messages, authUser?.id]);


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
        setConversations(normalized);

        if (receiverIdFromUrl) {
          const detailResult = await chatApi.getConversationByParticipant(token, {
            receiverId: receiverIdFromUrl,
            appointmentId: appointmentIdFromUrl,
          });

          const detail = detailResult.data;

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
              phone: "N/A",
              patientId: detail.otherUser?.id || receiverIdFromUrl,
              lastMessage: "",
              lastMessageAt: null,
              unread: 0,
            };

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
    if (!token || !selectedConv?.id) return;

    let ignore = false;

    async function loadMessages() {
      try {
        setIsLoadingMessages(true);
        setError("");

        const result = await chatApi.getMessages(
          token,
          selectedConv.id
        );

        const list = Array.isArray(result?.data?.data)
          ? result.data.data
          : [];
        setMessages(list);

        if (!ignore) setMessages(list);
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


    socket.on("receive_message", handleIncomingMessage);
    socket.on("message_sent", handleIncomingMessage);
    socket.on("message_seen", handleSeenMessage);

    return () => {
      socket.off("receive_message", handleIncomingMessage);
      socket.off("new_message", handleIncomingMessage);
      socket.off("message", handleIncomingMessage);
    };
  }, [token, selectedConv?.id]);

  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [selectedMessages.length]);

  const handleSend = async () => {
    const text = messageText.trim();

    if (!text || !token || !selectedConv?.receiverId) return;

    const optimisticMessage = {
      id: `temp-${Date.now()}`,
      message: text,
      senderId: authUser?.id,
      receiverId: selectedConv.receiverId,
      conversationId: selectedConv.id,
      ...(selectedConv.appointmentId || appointmentIdFromUrl
        ? { appointmentId: selectedConv.appointmentId || appointmentIdFromUrl }
        : {}),
      createdAt: new Date().toISOString(),
      optimistic: true,
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setMessageText("");

    try {
      const payload = {
        receiverId: selectedConv.receiverId,
        message: text,
      };

      const appointmentId = selectedConv.appointmentId || appointmentIdFromUrl;

      if (appointmentId) {
        payload.appointmentId = appointmentId;
      }

      const result = await chatApi.sendMessage(token, payload);

      const savedMessage = result.data;

      setMessages((prev) => {
        const withoutTemp = prev.filter((msg) => msg.id !== optimisticMessage.id);

        const alreadyExists = withoutTemp.some((msg) => msg.id === savedMessage.id);

        if (alreadyExists) {
          return withoutTemp.map((msg) =>
            msg.id === savedMessage.id ? savedMessage : msg
          );
        }

        return [...withoutTemp, savedMessage];
      });

      if (!selectedConv.id && savedMessage?.conversationId) {
        setSelectedConv((prev) => ({
          ...prev,
          id: savedMessage.conversationId,
        }));

        setConversations((prev) => [
          {
            ...selectedConv,
            id: savedMessage.conversationId,
            lastMessage: savedMessage.message,
            lastMessageAt: savedMessage.createdAt,
          },
          ...prev,
        ]);
      }
    } catch (err) {
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== optimisticMessage.id)
      );
      setError(err.message || "Failed to send message");
    }
  };

  const handleStartCall = async (callType) => {
    if (!token || !selectedConv?.receiverId) return;

    const payload = {
      receiverId: selectedConv.receiverId,
      callType,
    };

    if (selectedConv.appointmentId || appointmentIdFromUrl) {
      payload.appointmentId = selectedConv.appointmentId || appointmentIdFromUrl;
    }

    const result = await videoCallApi.start(token, payload);

    saveCallSession({
      ...result.data,
      receiverId: selectedConv.receiverId,
      receiverName: selectedConv.name,
      role: "CALLER",
    });

    const path =
      callType === "AUDIO"
        ? "/doctor-portal/messages/audio-call"
        : "/doctor-portal/messages/video-call";

    router.push(`${path}?callId=${result.data.callId}`);
  };


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
                        Verified Patient
                      </span>
                    </h4>

                    <p>
                      {selectedConv.phone} • Patient ID: {selectedConv.patientId}
                    </p>
                  </div>
                </div>

                {/* CALL ACTIONS */}
                <div className="msg-chat-actions">
                  <button
                    type="button"
                    className="msg-action-btn"
                    onClick={() => handleStartCall("AUDIO")}
                  >
                    <Phone size={18} />
                  </button>

                  <button
                    type="button"
                    className="msg-action-btn blue"
                    onClick={() => handleStartCall("VIDEO")}
                  >
                    <Video size={18} />
                  </button>
                </div>
              </div>

              <div className="msg-chat-body" ref={chatBodyRef}>
                {isLoadingMessages && <p>Loading messages...</p>}

                {!isLoadingMessages &&
                  selectedMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`msg-bubble-wrap${msg.mine ? " sent" : ""}`}
                    >
                      {!msg.mine && (
                        <div className="msg-bubble-avatar">
                          <span>{getInitials(selectedConv.name)}</span>
                        </div>
                      )}

                      <div>
                        <div
                          className={`msg-bubble${msg.mine ? " sent" : " received"
                            }`}
                        >
                          {msg.text}

                          {msg.fileUrl && (
                            <div style={{ marginTop: 6 }}>
                              <a
                                href={msg.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {msg.fileName || "Attachment"}
                              </a>
                            </div>
                          )}
                        </div>

                        <div
                          className={`msg-bubble-meta${msg.mine ? " sent" : ""
                            }`}
                        >
                          {formatTime(msg.createdAt)}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {error && (
                <p style={{ color: "red", padding: "0 16px" }}>{error}</p>
              )}

              <div className="msg-chat-input-wrap">
                <div className="msg-input-box">
                  <textarea
                    placeholder="Type your message..."
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
                </div>

                <div className="msg-input-actions">
                  <button
                    className="msg-send-btn"
                    onClick={handleSend}
                    disabled={!messageText.trim()}
                  >
                    Send
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
                <p className="msg-patient-id">{selectedConv.phone}</p>
                <p className="msg-patient-id">{selectedConv.patientId}</p>

                <Link
                  href={`/doctor-portal/patients/patient-profile?id=${selectedConv.patientId}&from=/doctor-portal/messages`}
                  className="msg-view-profile-btn"
                  style={{
                    display: "block",
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                >
                  View Full Profile
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}