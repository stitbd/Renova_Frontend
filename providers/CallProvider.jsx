"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hook";
import { videoCallApi } from "@/utils/videoCallApi";
import {
  clearCallSession,
  getCallSession,
  saveCallSession,
} from "@/utils/callSession";
import { getSocket } from "@/utils/socket";

const CallContext = createContext(null);


export const useCall = () => useContext(CallContext);

export default function CallProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const clientRef = useRef(null);
  const remoteAudioTrackRef = useRef(null);
  const localAudioTrackRef = useRef(null);
  const localVideoTrackRef = useRef(null);
  const remoteVideoTrackRef = useRef(null);


  const localVideoContainerRef = useRef(null);
  const remoteVideoContainerRef = useRef(null);
  const [incomingCall, setIncomingCall] = useState(null);


  const remoteAudioElementRef = useRef(null);

  const callRef = useRef(null);
  const acceptedRef = useRef(false);
  const leavingRef = useRef(false);


  const [activeCall, setActiveCall] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isCallAccepted, setIsCallAccepted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState("");

  const isFullCallPage = useCallback(() => {
    return (
      pathname?.includes("/messages/audio-call") ||
      pathname?.includes("/messages/video-call")
    );
  }, [pathname]);


  const getMessagesPath = useCallback(() => {
    return pathname?.includes("/doctor-portal")
      ? "/doctor-portal/messages"
      : "/patient-portal/messages";
  }, [pathname]);

  const attachVideoContainers = useCallback((localEl, remoteEl) => {
    localVideoContainerRef.current = localEl;
    remoteVideoContainerRef.current = remoteEl;

    if (localEl && localVideoTrackRef.current) {
      localVideoTrackRef.current.play(localEl);
    }

    if (remoteEl && remoteVideoTrackRef.current) {
      remoteVideoTrackRef.current.play(remoteEl);
    }
  }, []);

  const cleanupCall = useCallback(async () => {
    leavingRef.current = true;
    clearCallSession();  // ← MOVE THIS TO THE TOP

    try {
      if (remoteAudioElementRef.current) {
        remoteAudioElementRef.current.pause();
        remoteAudioElementRef.current.srcObject = null;
        remoteAudioElementRef.current.remove();
        remoteAudioElementRef.current = null;
      }
    } catch { }


    try {
      localAudioTrackRef.current?.stop();
      localAudioTrackRef.current?.close();
      localAudioTrackRef.current = null;
    } catch { }

    try {
      localVideoTrackRef.current?.stop();
      localVideoTrackRef.current?.close();
      localVideoTrackRef.current = null;
    } catch { }

    try {
      remoteAudioTrackRef.current?.stop();
      remoteAudioTrackRef.current = null;
    } catch { }

    try {
      remoteVideoTrackRef.current?.stop();
      remoteVideoTrackRef.current = null;
    } catch { }

    try {
      await clientRef.current?.leave();
      clientRef.current = null;
    } catch { }

    callRef.current = null;
    acceptedRef.current = false;
    leavingRef.current = false;

    setActiveCall(null);
    setIsJoined(false);
    setIsCallAccepted(false);
    setIsMuted(false);
    setIsVideoOff(false);
    setSeconds(0);
    setError("");
  }, []);

  const startAudioLevelDebug = (audioTrack, label) => {
    const timer = setInterval(() => {
      const level = audioTrack?.getVolumeLevel?.() || 0;
      console.log(`${label} AUDIO LEVEL:`, level);
    }, 1000);

    return timer;
  };

  const playRemoteAudioTrack = useCallback(async (audioTrack) => {
    if (!audioTrack) return;

    try {
      remoteAudioTrackRef.current = audioTrack;

      audioTrack.setVolume?.(100);
      // audioTrack.play();

      const mediaStreamTrack = audioTrack.getMediaStreamTrack?.();

      if (mediaStreamTrack) {
        let audioEl = remoteAudioElementRef.current;

        if (!audioEl) {
          audioEl = document.createElement("audio");
          audioEl.autoplay = true;
          audioEl.playsInline = true;
          audioEl.controls = false;
          audioEl.style.display = "none";
          document.body.appendChild(audioEl);
          remoteAudioElementRef.current = audioEl;
        }

        audioEl.srcObject = new MediaStream([mediaStreamTrack]);
        audioEl.volume = 1;
        audioEl.muted = false;

        try {
          await audioEl.play();
        } catch (err) {
          console.warn("Forced audio element play failed:", err);
        }
      }

      console.log("REMOTE AUDIO FORCE PLAYING");
    } catch (err) {
      console.warn("Remote audio play failed:", err);
    }
  }, []);

  const joinAgora = useCallback(

    async (session) => {

      console.log("JOIN AGORA");
      console.log("CLIENT EXISTS:", !!clientRef.current);

      if (clientRef.current) return;

      try {
        const client = AgoraRTC.createClient({
          mode: "rtc",
          codec: "vp8",
        });

        clientRef.current = client;


        client.on("user-published", async (user, mediaType) => {
          await client.subscribe(user, mediaType);



          if (mediaType === "audio" && user.audioTrack) {
            console.log("AUDIO SUBSCRIBED");

            await playRemoteAudioTrack(user.audioTrack);

            console.log("REMOTE AUDIO PLAYING");
          }

          if (mediaType === "video" && user.videoTrack) {
            remoteVideoTrackRef.current = user.videoTrack;

            if (remoteVideoContainerRef.current) {
              user.videoTrack.play(remoteVideoContainerRef.current);
            }
          }
        });

        client.on("user-unpublished", (user, mediaType) => {

          if (mediaType === "audio") {
            console.log("REMOTE AUDIO UNPUBLISHED");
            user.audioTrack?.stop();

            if (remoteAudioTrackRef.current === user.audioTrack) {
              remoteAudioTrackRef.current = null;
            }
          }

          if (mediaType === "video") {
            user.videoTrack?.stop();

            if (remoteVideoTrackRef.current === user.videoTrack) {
              remoteVideoTrackRef.current = null;
            }
          }
        });

        await client.join(
          session.appId,
          session.channelName,
          session.token,
          Number(session.uid)
        );

        for (const remoteUser of client.remoteUsers) {
          if (remoteUser.hasAudio) {
            await client.subscribe(remoteUser, "audio");
            if (remoteUser.audioTrack) {
              await playRemoteAudioTrack(remoteUser.audioTrack);
            }
          }

          if (remoteUser.hasVideo) {
            await client.subscribe(remoteUser, "video");

            if (remoteUser.videoTrack) {
              remoteVideoTrackRef.current = remoteUser.videoTrack;

              if (remoteVideoContainerRef.current) {
                remoteUser.videoTrack.play(remoteVideoContainerRef.current);
              }
            }
          }
        }


        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack({
          encoderConfig: "speech_standard",
          AEC: true,
          ANS: true,
          AGC: true,
        });

        localAudioTrackRef.current = audioTrack;

        startAudioLevelDebug(audioTrack, "LOCAL MIC");


        if (session.callType === "VIDEO") {
          const videoTrack = await AgoraRTC.createCameraVideoTrack();
          localVideoTrackRef.current = videoTrack;

          if (localVideoContainerRef.current) {
            videoTrack.play(localVideoContainerRef.current);
          }

          await client.publish([audioTrack, videoTrack]);
        } else {
          await client.publish([audioTrack]);
        }

        setIsJoined(true);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to join call");
      }
    },
    [playRemoteAudioTrack]
  );

  const createCallSession = useCallback(

    async (session) => {


      saveCallSession(session);

      callRef.current = session;
      acceptedRef.current = session.role === "RECEIVER";

      setActiveCall(session);
      setIsCallAccepted(session.role === "RECEIVER");
      setSeconds(0);

      await joinAgora(session);
    },
    [joinAgora]
  );

  useEffect(() => {
    const saved = getCallSession();

    if (
      saved?.callId &&
      saved?.appId &&
      saved?.channelName &&
      saved?.token &&
      saved?.uid
    ) {

      // Don't restore if we're already in a call
      if (clientRef.current) return;



      callRef.current = saved;
      acceptedRef.current = saved.role === "RECEIVER";

      setActiveCall(saved);
      setIsCallAccepted(saved.role === "RECEIVER");

      joinAgora(saved);
    }
  }, [joinAgora]);

  useEffect(() => {
    if (!activeCall || !isCallAccepted) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activeCall, isCallAccepted]);

  useEffect(() => {
    if (!accessToken) return;

    const socket = getSocket(accessToken);
    if (!socket) return;

    if (!socket.connected) {
      socket.connect();
    }

    const handleAccepted = (payload) => {
      const current = callRef.current;
      if (!current?.callId) return;
      if (payload?.callId !== current.callId) return;

      acceptedRef.current = true;
      setIsCallAccepted(true);
      setSeconds(0);
    };

    const handleLeave = async (payload) => {
      const current = callRef.current;

      if (!current?.callId) return;
      if (payload?.callId && payload.callId !== current.callId) return;

      await cleanupCall();

      if (isFullCallPage()) {
        router.replace(getMessagesPath());
      }
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

    socket.on("incoming_audio_call", handleIncomingCall);
    socket.on("incoming_video_call", handleIncomingCall);
    socket.on("audio_call_missed", handleCallMissed);
    socket.on("video_call_missed", handleCallMissed);


    socket.on("audio_call_accepted", handleAccepted);
    socket.on("video_call_accepted", handleAccepted);

    socket.on("audio_call_ended", handleLeave);
    socket.on("video_call_ended", handleLeave);
    socket.on("audio_call_rejected", handleLeave);
    socket.on("video_call_rejected", handleLeave);
    socket.on("audio_call_missed", handleLeave);
    socket.on("video_call_missed", handleLeave);

    return () => {
      socket.off("audio_call_accepted", handleAccepted);
      socket.off("video_call_accepted", handleAccepted);

      socket.off("audio_call_ended", handleLeave);
      socket.off("video_call_ended", handleLeave);
      socket.off("audio_call_rejected", handleLeave);
      socket.off("video_call_rejected", handleLeave);
      socket.off("audio_call_missed", handleLeave);
      socket.off("video_call_missed", handleLeave);
      socket.off("incoming_audio_call", handleIncomingCall);
      socket.off("incoming_video_call", handleIncomingCall);
      socket.off("audio_call_missed", handleCallMissed);
      socket.off("video_call_missed", handleCallMissed);
    };
  }, [accessToken, cleanupCall, isFullCallPage, router, getMessagesPath]);

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
    const current = callRef.current;

    try {
      if (accessToken && current?.callId) {
        await videoCallApi.end(accessToken, current.callId);
      }
    } finally {
      await cleanupCall();

      if (isFullCallPage()) {
        router.replace(getMessagesPath());
      }
    }
  };

  const openFullCallPage = () => {
    const current = callRef.current;
    if (!current) return;

    const base =
      current.portal === "DOCTOR"
        ? "/doctor-portal/messages"
        : "/patient-portal/messages";

    const path =
      current.callType === "AUDIO"
        ? `${base}/audio-call`
        : `${base}/video-call`;

    router.push(`${path}?callId=${current.callId}`);
  };

  const formatDuration = () => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const acceptIncomingCall = async () => {
    if (!incomingCall?.callId || !accessToken) return;

    const result = await videoCallApi.accept(accessToken, incomingCall.callId);

    await createCallSession({
      ...result.data,
      callerId: incomingCall.callerId,
      callerName: incomingCall.callerName,
      role: "RECEIVER",
      portal: pathname?.includes("/doctor-portal") ? "DOCTOR" : "PATIENT",
    });

    const base = pathname?.includes("/doctor-portal")
      ? "/doctor-portal/messages"
      : "/patient-portal/messages";

    const path =
      incomingCall.callType === "AUDIO"
        ? `${base}/audio-call`
        : `${base}/video-call`;

    setIncomingCall(null);
    router.push(`${path}?callId=${incomingCall.callId}`);
  };

  const rejectIncomingCall = async () => {
    if (!incomingCall?.callId || !accessToken) return;

    await videoCallApi.reject(accessToken, incomingCall.callId);
    setIncomingCall(null);
  };


  return (
    <CallContext.Provider
      value={{
        activeCall,
        incomingCall,

        isJoined,
        isCallAccepted,
        isMuted,
        isVideoOff,
        error,

        createCallSession,
        attachVideoContainers,

        acceptIncomingCall,
        rejectIncomingCall,

        toggleMute,
        toggleVideo,
        endCall,
        openFullCallPage,
        formatDuration,

      }}
    >
      {children}
    </CallContext.Provider>
  );
}