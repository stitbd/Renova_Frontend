"use client";

import { Phone, PhoneOff, Video } from "lucide-react";
import { useCall } from "@/providers/CallProvider";
import "../styles/components/incoming-call-popup.css";

export default function IncomingCallPopup() {
  const call = useCall();

  if (!call?.incomingCall || call?.activeCall) return null;

  const incomingCall = call.incomingCall;
  const isVideo = incomingCall.callType === "VIDEO";

  return (
    <div className="global-call-overlay">
      <div className="global-call-card">
        <div className="global-call-icon">
          {isVideo ? <Video size={28} /> : <Phone size={28} />}
        </div>

        <p className="global-call-label">
          Incoming {isVideo ? "Video" : "Audio"} Call
        </p>

        <h3>{incomingCall.callerName || "Unknown Caller"}</h3>

        <div className="global-call-actions">
          <button
            type="button"
            className="global-call-reject"
            onClick={call.rejectIncomingCall}
          >
            <PhoneOff size={18} />
            Reject
          </button>

          <button
            type="button"
            className="global-call-accept"
            onClick={call.acceptIncomingCall}
          >
            <Phone size={18} />
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}