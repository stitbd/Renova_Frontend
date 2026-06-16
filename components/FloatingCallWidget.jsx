"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  Maximize2,
  Mic,
  MicOff,
  PhoneOff,
  Video,
  VideoOff,
} from "lucide-react";
import { useCall } from "@/providers/CallProvider";
import "../styles/components/floating-call-widget.css";

export default function FloatingCallWidget() {
  const call = useCall();
  const pathname = usePathname();

  const localRef = useRef(null);
  const remoteRef = useRef(null);

  const isCallPage =
    pathname?.includes("/messages/audio-call") ||
    pathname?.includes("/messages/video-call");

  const shouldShow = Boolean(call?.activeCall) && !isCallPage;

  useEffect(() => {
    if (!shouldShow) return;

    call.attachVideoContainers(localRef.current, remoteRef.current);
  }, [shouldShow, call?.isJoined]);

  if (!shouldShow) return null;

  const activeCall = call.activeCall;

  return (
    <div className="floating-call-widget">
      <div className="floating-call-main">
        <div className="floating-call-avatar">
          {activeCall.callType === "VIDEO" ? (
            <Video size={18} />
          ) : (
            <Mic size={18} />
          )}
        </div>

        <div className="floating-call-info">
          <strong>
            {activeCall.receiverName ||
              activeCall.callerName ||
              "Active Call"}
          </strong>

          <span>
            {call.isCallAccepted ? "Connected" : "Connecting"} •{" "}
            {call.isCallAccepted ? call.formatDuration() : "Ringing"}
          </span>
        </div>
      </div>

      {activeCall.callType === "VIDEO" && (
        <div className="floating-call-video-preview">
          <div ref={remoteRef} className="floating-remote-video" />
          <div ref={localRef} className="floating-local-video" />
        </div>
      )}

      <div className="floating-call-actions">
        <button type="button" onClick={call.toggleMute}>
          {call.isMuted ? <MicOff size={16} /> : <Mic size={16} />}
        </button>

        {activeCall.callType === "VIDEO" && (
          <button type="button" onClick={call.toggleVideo}>
            {call.isVideoOff ? <VideoOff size={16} /> : <Video size={16} />}
          </button>
        )}

        <button type="button" onClick={call.openFullCallPage}>
          <Maximize2 size={16} />
        </button>

        <button type="button" className="danger" onClick={call.endCall}>
          <PhoneOff size={16} />
        </button>
      </div>
    </div>
  );
}