const API_BASE_URL = "http://192.168.0.164:5001/api/v1";

async function request(endpoint, token, options = {}) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...(options.headers || {}),
        },
        cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || data?.success === false) {
        throw new Error(data?.message || "Request failed");
    }

    return data;
}

export const chatApi = {
    getConversations(token) {
        return request("/chat/conversations", token);
    },

    getConversationByParticipant(token, { receiverId, appointmentId }) {
        const params = new URLSearchParams();

        params.set("receiverId", receiverId);

        if (appointmentId) {
            params.set("appointmentId", appointmentId);
        }

        return request(
            `/chat/conversation-by-participant?${params.toString()}`,
            token
        );
    },

getMessages(token, conversationId, page = 1, limit = 20) {
  return request(
    `/chat/conversations/${conversationId}/messages?page=${page}&limit=${limit}`,
    token
  );
},

    sendMessage(token, payload) {
        return request("/chat/send", token, {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },
};