// lib/socket.js

import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5001";

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