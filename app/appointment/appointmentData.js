   getIo().to(receiverId).emit(
        callType === "AUDIO" ? "incoming_audio_call" : "incoming_video_call",
        {
            callId: call.callId,
            channelName: call.channelName,
            appointmentId: call.appointmentId,
            callerId,
            callerName: caller?.name || "Unknown",
            callType,
        }
    );