"use client";

import { useCall } from "@/providers/CallProvider";

export default function PermissionErrorModal() {
    const { permissionError, setPermissionError } = useCall();

    if (!permissionError) return null;

    return (
        <div className="global-call-overlay">
            <div className="global-call-card">
                <div className="global-call-icon">
                    ⚠️
                </div>

                <h3>
                    {permissionError.title}
                </h3>

                <p>
                    {permissionError.message}
                </p>

                <div className="global-call-actions">
                    <button
                        type="button"
                        className="global-call-reject"
                        onClick={() => setPermissionError(null)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}