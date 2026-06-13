const API_BASE_URL = "http://192.168.0.164:5001/api/v1";

async function request(endpoint, token, options = {}) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || data?.success === false) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}

export const videoCallApi = {
  start(token, payload) {
    return request("/video-calls/start", token, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  accept(token, callId) {
    return request("/video-calls/accept", token, {
      method: "POST",
      body: JSON.stringify({ callId }),
    });
  },

  reject(token, callId) {
    return request("/video-calls/reject", token, {
      method: "POST",
      body: JSON.stringify({ callId }),
    });
  },

  end(token, callId) {
    return request("/video-calls/end", token, {
      method: "POST",
      body: JSON.stringify({ callId }),
    });
  },
};