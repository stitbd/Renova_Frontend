"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hook";
import { videoCallApi } from "@/utils/videoCallApi";
import { clearCallSession, getCallSession } from "@/utils/callSession";
import { getSocket } from "@/utils/socket";

const CALL_TIMEOUT_MS = 31_000;

export function useAgoraCall({ mode }) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAppSelector((state) => state.auth.accessToken);

  const clientRef = useRef(null);
  const localAudioTrackRef = useRef(null);
  const localVideoTrackRef = useRef(null);
  const callSessionRef = useRef(null);
  const acceptedRef = useRef(false);
  const isLeavingRef = useRef(false);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [callSession, setCallSession] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isCallAccepted, setIsCallAccepted] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState("");

  const getMessagesPath = useCallback(() => {
    return pathname?.includes("/doctor-portal")
      ? "/doctor-portal/messages"
      : "/patient-portal/messages";
  }, [pathname]);

  const leaveAndRedirect = useCallback(
    async (payload) => {

       console.log("CALL CLOSE EVENT RECEIVED:", payload);
  console.log("CURRENT CALL SESSION:", callSession);




      const currentCallId = callSessionRef.current?.callId;

      if (payload?.callId && currentCallId && payload.callId !== currentCallId) {
        return;
      }

      if (isLeavingRef.current) return;
      isLeavingRef.current = true;

      try {
        localAudioTrackRef.current?.stop();
        localAudioTrackRef.current?.close();
        localAudioTrackRef.current = null;
      } catch {}

      try {
        localVideoTrackRef.current?.stop();
        localVideoTrackRef.current?.close();
        localVideoTrackRef.current = null;
      } catch {}

      try {
        await clientRef.current?.leave();
        clientRef.current = null;
      } catch {}

      setIsJoined(false);
      clearCallSession();
      router.replace(getMessagesPath());
    },
    [getMessagesPath, router]
  );

  // Init session — runs once on mount
  useEffect(() => {
    const session = getCallSession();

    if (!session?.appId || !session?.channelName || !session?.token || !session?.uid) {
      router.replace(getMessagesPath());
      return;
    }

    isLeavingRef.current = false;
    acceptedRef.current = session.role === "RECEIVER";
    callSessionRef.current = session; // sync ref immediately
    acceptedRef.current = session.role === "RECEIVER";
setIsCallAccepted(session.role === "RECEIVER");

    setCallSession(session);
  }, [getMessagesPath, router]);

  // Timer
useEffect(() => {
  if (!callSession || !isCallAccepted) return;

  const timer = setInterval(() => {
    setSeconds((prev) => prev + 1);
  }, 1000);

  return () => clearInterval(timer);
}, [callSession, isCallAccepted]);


  // Join Agora
  useEffect(() => {
    if (!callSession) return;

    let mounted = true;

    const joinCall = async () => {
      try {
        const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        clientRef.current = client;

        client.on("user-published", async (user, mediaType) => {
          await client.subscribe(user, mediaType);
          if (mediaType === "video" && remoteVideoRef.current) {
            user.videoTrack?.play(remoteVideoRef.current);
          }
          if (mediaType === "audio") {
            user.audioTrack?.play();
          }
        });

        client.on("user-unpublished", (user) => {
          user.audioTrack?.stop();
          user.videoTrack?.stop();
        });

        await client.join(
          callSession.appId,
          callSession.channelName,
          callSession.token,
          Number(callSession.uid)
        );

        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        localAudioTrackRef.current = audioTrack;

        if (mode === "VIDEO") {
          const videoTrack = await AgoraRTC.createCameraVideoTrack();
          localVideoTrackRef.current = videoTrack;
          if (localVideoRef.current) videoTrack.play(localVideoRef.current);
          await client.publish([audioTrack, videoTrack]);
        } else {
          await client.publish([audioTrack]);
        }

        if (mounted) setIsJoined(true);
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message || "Failed to join call");
      }
    };

    joinCall();

    return () => {
      mounted = false;
      if (!isLeavingRef.current) {
        try { localAudioTrackRef.current?.stop(); localAudioTrackRef.current?.close(); } catch {}
        try { localVideoTrackRef.current?.stop(); localVideoTrackRef.current?.close(); } catch {}
        try { clientRef.current?.leave(); } catch {}
      }
    };
  }, [callSession, mode]);

  // ← KEY FIX: Register socket listeners as soon as token is available
  // Use callSessionRef so we don't need callSession state to be set yet
  useEffect(() => {
    if (!token) return;

    const socket = getSocket(token);
    if (!socket) return;

const handleAccepted = (payload) => {
  const currentCallId = callSessionRef.current?.callId;

  if (payload?.callId && currentCallId && payload.callId !== currentCallId) {
    return;
  }

  acceptedRef.current = true;
  setIsCallAccepted(true);
  setSeconds(0);
};

    const handleLeave = (payload) => {
      // If no callId in ref yet, still leave (it's for us)
      const currentCallId = callSessionRef.current?.callId;
      if (payload?.callId && currentCallId && payload.callId !== currentCallId) return;
      leaveAndRedirect(payload);
    };

    socket.on("audio_call_accepted", handleAccepted);
    socket.on("video_call_accepted", handleAccepted);

    socket.on("audio_call_ended", handleLeave);
    socket.on("video_call_ended", handleLeave);

    socket.on("audio_call_missed", handleLeave);
    socket.on("video_call_missed", handleLeave);

    socket.on("audio_call_rejected", handleLeave);
    socket.on("video_call_rejected", handleLeave);

    return () => {
      socket.off("audio_call_accepted", handleAccepted);
      socket.off("video_call_accepted", handleAccepted);

      socket.off("audio_call_ended", handleLeave);
      socket.off("video_call_ended", handleLeave);

      socket.off("audio_call_missed", handleLeave);
      socket.off("video_call_missed", handleLeave);

      socket.off("audio_call_rejected", handleLeave);
      socket.off("video_call_rejected", handleLeave);
    };
  }, [token, leaveAndRedirect]); // ← only depends on token, not callSession

  // Fallback client-side timeout for caller
  useEffect(() => {
    // Read from ref so this works even before state is set
    const session = callSessionRef.current;
    if (!session?.callId || session.role !== "CALLER") return;

    const timeout = setTimeout(() => {
      if (!acceptedRef.current) {
        leaveAndRedirect({ callId: callSessionRef.current?.callId });
      }
    }, CALL_TIMEOUT_MS);

    return () => clearTimeout(timeout);
  }, [callSession, leaveAndRedirect]); // callSession triggers this after state is set

  const toggleMute = async () => {
    const track = localAudioTrackRef.current;
    if (!track) return;
    await track.setEnabled(isMuted);
    setIsMuted((prev) => !prev);
  };

  const toggleVideo = async () => {
    const track = localVideoTrackRef.current;
    if (!track) return;
    await track.setEnabled(isVideoOff);
    setIsVideoOff((prev) => !prev);
  };

  const endCall = async () => {
    try {
      if (token && callSessionRef.current?.callId) {
        await videoCallApi.end(token, callSessionRef.current.callId);
      }
    } finally {
      await leaveAndRedirect({ callId: callSessionRef.current?.callId });
    }
  };

  const formatDuration = () => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

 return {
  callSession,
  localVideoRef,
  remoteVideoRef,
  isJoined,
  isCallAccepted, // important
  isMuted,
  isVideoOff,
  error,
  toggleMute,
  toggleVideo,
  endCall,
  formatDuration,
};
}