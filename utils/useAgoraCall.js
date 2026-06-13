// hooks/useAgoraCall.js
"use client";

import { useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hook";
import { videoCallApi } from "@/utils/videoCallApi";
import { clearCallSession, getCallSession } from "@/utils/callSession";
import { getSocket } from "@/utils/socket";

export function useAgoraCall({ mode }) {
    const router = useRouter();
    const token = useAppSelector((state) => state.auth.accessToken);

    const clientRef = useRef(null);
    const localAudioTrackRef = useRef(null);
    const localVideoTrackRef = useRef(null);

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    const [callSession, setCallSession] = useState(null);
    const [isJoined, setIsJoined] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        const session = getCallSession();

        if (!session?.appId || !session?.channelName || !session?.token || !session?.uid) {
            router.replace("/patient-portal/messages");
            return;
        }

        setCallSession(session);
    }, [router]);

    useEffect(() => {
        if (!callSession) return;

        const timer = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [callSession]);

    useEffect(() => {
        if (!callSession) return;

        let mounted = true;

        const joinCall = async () => {
            try {
                const client = AgoraRTC.createClient({
                    mode: "rtc",
                    codec: "vp8",
                });

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

                let audioTrack = null;
                let videoTrack = null;

                try {
                    audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
                    localAudioTrackRef.current = audioTrack;
                } catch (err) {
                    throw new Error(
                        "Microphone permission denied. Please allow microphone access from browser settings."
                    );
                }

                if (mode === "VIDEO") {
                    try {
                        videoTrack = await AgoraRTC.createCameraVideoTrack();
                        localVideoTrackRef.current = videoTrack;

                        if (localVideoRef.current) {
                            videoTrack.play(localVideoRef.current);
                        }
                    } catch (err) {
                        throw new Error(
                            "Camera permission denied. Please allow camera access from browser settings."
                        );
                    }

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
            cleanupTracks();
        };
    }, [callSession, mode]);

    useEffect(() => {
        if (!token || !callSession?.callId) return;

        const socket = getSocket(token);
        if (!socket) return;

        const handleCallEnded = (payload) => {
            if (payload?.callId === callSession.callId) {
                cleanupTracks();
                clearCallSession();
                router.replace("/patient-portal/messages");
            }
        };

        socket.on("audio_call_ended", handleCallEnded);
        socket.on("video_call_ended", handleCallEnded);

        return () => {
            socket.off("audio_call_ended", handleCallEnded);
            socket.off("video_call_ended", handleCallEnded);
        };
    }, [token, callSession?.callId, router]);

    const cleanupTracks = async () => {
        try {
            localAudioTrackRef.current?.stop();
            localAudioTrackRef.current?.close();

            localVideoTrackRef.current?.stop();
            localVideoTrackRef.current?.close();

            await clientRef.current?.leave();
        } catch {
            // silent cleanup
        }
    };

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
            if (token && callSession?.callId) {
                await videoCallApi.end(token, callSession.callId);
            }
        } finally {
            await cleanupTracks();
            clearCallSession();
            router.replace("/patient-portal/messages");
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
        isMuted,
        isVideoOff,
        error,
        toggleMute,
        toggleVideo,
        endCall,
        formatDuration,
    };
}