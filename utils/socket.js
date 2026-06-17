// lib/socket.js

import { io } from "socket.io-client";

const SOCKET_URL = "https://d55e-2401-f40-1587-0-ed4f-4bed-3dd2-b569.ngrok-free.app";

let socket = null;

export function getSocket(token) {
  if (!token) return null;

  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: false,
      auth: { token },
    });
  }

  socket.auth = { token };

  if (!socket.connected) {
    socket.connect();
  }

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}