import { API_URL } from "@/config";

const API_BASE_URL = API_URL;

async function request(endpoint, token) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || data?.success === false) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}

export const userProfileApi = {
  getPatient(token, patientId) {
    return request(`/patients/getSingle/${patientId}`, token);
  },

  getDoctor(token, doctorId) {
    return request(`/doctors/getSingle/${doctorId}`, token);
  },
};