"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Paperclip, Send, Download } from "lucide-react";
import { chatApi } from "@/utils/chatApi";
import { getSocket } from "@/utils/socket";
import { useAppSelector } from "@/redux/hook";
import "../../styles/pages/CallRightPanel.css"

function formatTime(date) {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(new Date(date));
}

function normalizeMessage(msg, authUserId) {
    return {
        id: msg.id,
        type: msg.type,
        text: msg.message || "",
        fileUrl: msg.fileUrl,
        fileName: msg.fileName,
        mine: msg.senderId === authUserId,
        senderId: msg.senderId,
        receiverId: msg.receiverId,
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

export default function CallRightPanel({
    receiverId,
    appointmentId,
}) {
    const token = useAppSelector((state) => state.auth.accessToken);
    const authUser = useAppSelector((state) => state.auth.user);

    const [activeTab, setActiveTab] = useState("Chat");
    const [conversation, setConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState("");

    const chatBodyRef = useRef(null);
    const fileInputRef = useRef(null);

    const normalizedMessages = useMemo(() => {
        return uniqueMessages(messages).map((msg) =>
            normalizeMessage(msg, authUser?.id)
        );
    }, [messages, authUser?.id]);

    const fileMessages = useMemo(() => {
        return normalizedMessages.filter((msg) => msg.fileUrl);
    }, [normalizedMessages]);

    useEffect(() => {
        if (!token || !receiverId) return;

        let ignore = false;

        async function initConversation() {
            try {
                setError("");

                const result = await chatApi.getConversationByParticipant(token, {
                    receiverId,
                    appointmentId,
                });

                if (ignore) return;

                const conv = result?.data?.conversation;

                if (!conv?.id) {
                    setConversation(null);
                    setMessages([]);
                    return;
                }

                setConversation(conv);

                const msgResult = await chatApi.getMessages(token, conv.id, 1, 30);

                const list = Array.isArray(msgResult?.data?.data)
                    ? msgResult.data.data
                    : [];

                if (!ignore) {
                    setMessages(list);
                }
            } catch (err) {
                if (!ignore) {
                    setError(err.message || "Failed to load call chat");
                }
            }
        }

        initConversation();

        return () => {
            ignore = true;
        };
    }, [token, receiverId, appointmentId]);

    useEffect(() => {
        if (!token) return;

        const socket = getSocket(token);
        if (!socket) return;

        const handleIncomingMessage = (payload) => {
            const msg = payload?.data || payload;
            if (!msg?.id) return;

            const incomingConversationId =
                msg.conversationId || msg.conversation?.id;

            if (incomingConversationId !== conversation?.id) return;

            setMessages((prev) => uniqueMessages([...prev, msg]));

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

        socket.on("receive_message", handleIncomingMessage);
        socket.on("message_sent", handleIncomingMessage);
        socket.on("message_seen", handleSeenMessage);

        return () => {
            socket.off("receive_message", handleIncomingMessage);
            socket.off("message_sent", handleIncomingMessage);
            socket.off("message_seen", handleSeenMessage);
        };
    }, [token, conversation?.id, authUser?.id]);

    useEffect(() => {
        const el = chatBodyRef.current;
        if (!el) return;

        el.scrollTo({
            top: el.scrollHeight,
            behavior: "smooth",
        });
    }, [normalizedMessages.length]);

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const maxSize = 50 * 1024 * 1024;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/jpg",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "video/mp4",
            "video/quicktime",
            "video/x-msvideo",
            "video/webm",
            "video/x-matroska",
        ];

        if (!allowedTypes.includes(file.type)) {
            setError("Only images, documents, and videos are allowed.");
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

    const handleSend = async () => {
        const text = messageText.trim();

        if ((!text && !selectedFile) || !token || !receiverId) return;

        const tempMessage = {
            id: `temp-${Date.now()}`,
            conversationId: conversation?.id,
            senderId: authUser?.id,
            receiverId,
            message: text || selectedFile?.name || "Attachment",
            fileName: selectedFile?.name,
            fileUrl: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
            type: selectedFile ? "FILE" : "TEXT",
            createdAt: new Date().toISOString(),
            optimistic: true,
        };

        setMessages((prev) => [...prev, tempMessage]);
        setMessageText("");
        setSelectedFile(null);

        try {
            const formData = new FormData();

            formData.append("receiverId", receiverId);

            if (appointmentId) {
                formData.append("appointmentId", appointmentId);
            }

            if (text) {
                formData.append("message", text);
            }

            if (selectedFile) {
                formData.append("file", selectedFile);
            }

            const result = await chatApi.sendMessage(token, formData);
            const savedMessage = result.data;

            setConversation((prev) => {
                if (prev?.id) return prev;

                return {
                    id: savedMessage.conversationId,
                };
            });

            setMessages((prev) => {
                const withoutTemp = prev.filter((msg) => msg.id !== tempMessage.id);
                return uniqueMessages([...withoutTemp, savedMessage]);
            });
        } catch (err) {
            setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
            setError(err.message || "Failed to send message");
        }
    };

    const renderAttachment = (msg) => {
        if (!msg.fileUrl) return null;

        const isImage =
            msg.type === "IMAGE" ||
            msg.fileName?.match(/\.(jpg|jpeg|png|webp)$/i);

        const isVideo = msg.fileName?.match(/\.(mp4|mov|avi|webm|mkv)$/i);

        if (isImage) {
            return (
                <a href={msg.fileUrl} target="_blank" rel="noreferrer">
                    <img
                        src={msg.fileUrl}
                        alt={msg.fileName || "Attachment"}
                        className="call-chat-image"
                    />
                </a>
            );
        }

        if (isVideo) {
            return (
                <video controls className="call-chat-video">
                    <source src={msg.fileUrl} />
                </video>
            );
        }

        return (
            <a
                href={msg.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="call-chat-file"
            >
                <span>{msg.fileName || "Attachment"}</span>
                <Download size={15} />
            </a>
        );
    };

    return (
        <div className="call-right-panel">
            <div className="call-right-tabs">
                {["Chat", "Files", "Reports"].map((tab) => (
                    <button
                        key={tab}
                        className={`call-right-tab${activeTab === tab ? " active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                        type="button"
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {error && <div className="call-chat-error">{error}</div>}

            {activeTab === "Chat" && (
                <>
                    <div className="call-chat-body" ref={chatBodyRef}>
                        <div className="call-chat-date">Today</div>

                        {normalizedMessages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`call-chat-bubble-wrap${msg.mine ? " sent" : ""}`}
                            >
                                <div className={`call-chat-bubble${msg.mine ? " sent" : ""}`}>
                                    {msg.text && <p>{msg.text}</p>}
                                    {renderAttachment(msg)}
                                </div>

                                <span className="call-chat-time">
                                    {formatTime(msg.createdAt)}
                                </span>
                            </div>
                        ))}
                    </div>

                    {selectedFile && (
                        <div className="call-selected-file">
                            <span>{selectedFile.name}</span>
                            <button type="button" onClick={() => setSelectedFile(null)}>
                                ×
                            </button>
                        </div>
                    )}

                    <div className="call-chat-input">
                        <button
                            type="button"
                            className="call-chat-attach"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Paperclip size={18} />
                        </button>

                        <input
                            type="file"
                            hidden
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                        />

                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSend();
                            }}
                        />

                        <button
                            type="button"
                            className="call-chat-send"
                            onClick={handleSend}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </>
            )}

            {activeTab === "Files" && (
                <div className="call-files-list">
                    {fileMessages.length === 0 ? (
                        <div className="call-empty-state">No files shared yet.</div>
                    ) : (
                        fileMessages.map((msg) => (
                            <a
                                key={msg.id}
                                href={msg.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="call-file-item"
                            >
                                <div>
                                    <strong>{msg.fileName || "Attachment"}</strong>
                                    <span>{formatTime(msg.createdAt)}</span>
                                </div>

                                <Download size={16} />
                            </a>
                        ))
                    )}
                </div>
            )}

            {activeTab === "Reports" && (
                <div className="call-empty-state">
                    Reports integration can be connected here using appointmentId or patientId.
                </div>
            )}
        </div>
    );
}