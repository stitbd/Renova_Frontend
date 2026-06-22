import { API_URL } from "@/config";

const API_BASE_URL = API_URL

async function request(endpoint, token, options = {}) {
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
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
  const isFormData = payload instanceof FormData;

  return request("/chat/send", token, {
    method: "POST",
    body: isFormData ? payload : JSON.stringify(payload),
    headers: isFormData ? {} : { "Content-Type": "application/json" },
  });
},
markSeen(token, messageId) {
  return request(`/chat/messages/${messageId}/seen`, token, {
    method: "PATCH",
  });
}
};