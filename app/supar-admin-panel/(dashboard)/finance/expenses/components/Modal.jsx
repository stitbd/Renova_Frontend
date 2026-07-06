// app/super-admin/finance/expenses/components/Modal.jsx
"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({ open, onClose, title, subtitle, icon: Icon, width = 640, children }) {
    // Lock body scroll while a modal is open, close on Escape
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose?.();
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="em-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onMouseDown={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
                >
                    <motion.div
                        className="em-modal"
                        style={{ maxWidth: width }}
                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.98 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="em-modal-header">
                            <div className="em-modal-header-left">
                                {Icon && (
                                    <div className="em-modal-icon">
                                        <Icon size={18} />
                                    </div>
                                )}
                                <div>
                                    <h3>{title}</h3>
                                    {subtitle && <p>{subtitle}</p>}
                                </div>
                            </div>
                            <button className="em-modal-close" onClick={onClose} aria-label="Close">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="em-modal-body">{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}