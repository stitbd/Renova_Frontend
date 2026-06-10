// ═══════════════════════════════════════════════════════════════
// PRESCRIPTION PDF GENERATOR
// File: utils/prescriptionPDF.js
// Uses: jsPDF (npm install jspdf)
// ═══════════════════════════════════════════════════════════════

import jsPDF from "jspdf";

// ── Helpers ──────────────────────────────────────────────────────
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

function setFill(doc, hex) {
    doc.setFillColor(...hexToRgb(hex));
}

function setStroke(doc, hex) {
    doc.setDrawColor(...hexToRgb(hex));
}

function setTextColor(doc, hex) {
    doc.setTextColor(...hexToRgb(hex));
}

function truncate(text, maxLen) {
    if (!text) return "";
    return text.length > maxLen ? text.slice(0, maxLen - 1) + "…" : text;
}

// ── Main Generator ────────────────────────────────────────────────
export async function generatePrescriptionPDF(data, action = "download") {
    // action: "download" | "print" | "preview"

    const {
        prescriptionId = "RX-2025-000000",
        prescriptionDate = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        prescriptionTime = "",
        visitType = "OPD",
        prescriptionType = "New Prescription",
        followUpDate = "",
        clinicalNotes = "",
        doctor = {},
        patient = {},
        medicines = [],
        additionalInstructions = [],
        status = "pending",
    } = data;

    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210;
    const H = 297;
    const ML = 14; // margin left
    const MR = 14; // margin right
    const CW = W - ML - MR; // content width

    // ── Colors ────────────────────────────────────────────────────
    const C = {
        primary: "#014fa1",
        primaryDark: "#013d80",
        green: "#016a1f",
        greenLight: "#dcfce7",
        greenText: "#16a34a",
        white: "#ffffff",
        bg: "#f8fafc",
        border: "#e2e8f0",
        text: "#1a202c",
        muted: "#718096",
        light: "#94a3b8",
        yellow: "#ca8a04",
        yellowBg: "#fef9c3",
        red: "#ef4444",
        redBg: "#fee2e2",
        blueBg: "#dbeafe",
        teal: "#0d9488",
        tealBg: "#ccfbf1",
    };

    let y = 0; // cursor

    // ══════════════════════════════════════════════════════════════
    // HEADER BAND
    // ══════════════════════════════════════════════════════════════
    // Deep blue gradient-like band
    setFill(doc, C.primary);
    doc.roundedRect(0, 0, W, 46, 0, 0, "F");

    // Bottom accent strip
    setFill(doc, C.green);
    doc.rect(0, 40, W, 6, "F");

    // Logo (watermark-style in center of page, drawn later)
    // Logo on header left
    try {
        const logoUrl = "/images/logo.png";
        // We'll try to load logo via Image element
        await new Promise((resolve) => {
            const img = new window.Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                // Draw logo white area
                setFill(doc, C.white);
                doc.roundedRect(ML, 7, 40, 22, 3, 3, "F");
                doc.addImage(img, "PNG", ML + 2, 8.5, 36, 19);
                resolve();
            };
            img.onerror = () => {
                // Fallback: text logo
                setFill(doc, C.white);
                doc.roundedRect(ML, 7, 40, 22, 3, 3, "F");
                setTextColor(doc, C.primary);
                doc.setFontSize(11);
                doc.setFont("helvetica", "bold");
                doc.text("MediCare", ML + 20, 20, { align: "center" });
                doc.setFontSize(7);
                doc.setFont("helvetica", "normal");
                setTextColor(doc, C.muted);
                doc.text("Hospital & Clinic", ML + 20, 25, { align: "center" });
                resolve();
            };
            img.src = logoUrl;
        });
    } catch {
        setFill(doc, C.white);
        doc.roundedRect(ML, 7, 40, 22, 3, 3, "F");
        setTextColor(doc, C.primary);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("MediCare", ML + 20, 20, { align: "center" });
    }

    // Hospital name + tagline (right of logo)
    setTextColor(doc, C.white);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("MEDICARE HOSPITAL & CLINIC", ML + 48, 16);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 210, 255);
    doc.text("Excellence in Healthcare · 24/7 Emergency Services", ML + 48, 22);
    doc.text("Mirpur, Dhaka, Bangladesh  |  +880 2 XXXX XXXX  |  info@medicare.com.bd", ML + 48, 28);

    // Rx label (right side)
    setTextColor(doc, C.white);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("℞", W - MR - 4, 30, { align: "right" });

    y = 54;

    // ══════════════════════════════════════════════════════════════
    // PRESCRIPTION META ROW
    // ══════════════════════════════════════════════════════════════
    setFill(doc, C.bg);
    doc.roundedRect(ML, y, CW, 20, 3, 3, "F");
    setStroke(doc, C.border);
    doc.setLineWidth(0.3);
    doc.roundedRect(ML, y, CW, 20, 3, 3, "S");

    // Meta items
    const metaItems = [
        { label: "Prescription ID", value: prescriptionId },
        { label: "Date & Time", value: prescriptionDate + (prescriptionTime ? "  " + prescriptionTime : "") },
        { label: "Visit Type", value: visitType },
        { label: "Type", value: prescriptionType },
        { label: "Status", value: status.charAt(0).toUpperCase() + status.slice(1) },
    ];

    const colW = CW / metaItems.length;
    metaItems.forEach((item, i) => {
        const x = ML + i * colW + colW / 2;
        setTextColor(doc, C.light);
        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        doc.text(item.label, x, y + 6.5, { align: "center" });

        // Color-code status
        let valColor = C.text;
        if (item.label === "Status") {
            if (status === "dispensed") valColor = C.greenText;
            else if (status === "pending") valColor = C.yellow;
            else if (status === "cancelled") valColor = C.red;
            else valColor = C.primary;
        } else if (item.label === "Prescription ID") {
            valColor = C.primary;
        }
        setTextColor(doc, valColor);
        doc.setFontSize(8.5);
        doc.setFont("helvetica", "bold");
        doc.text(truncate(item.value, 22), x, y + 14, { align: "center" });

        // Divider
        if (i < metaItems.length - 1) {
            setStroke(doc, C.border);
            doc.setLineWidth(0.3);
            doc.line(ML + (i + 1) * colW, y + 2, ML + (i + 1) * colW, y + 18);
        }
    });

    y += 26;

    // ══════════════════════════════════════════════════════════════
    // PATIENT + DOCTOR CARDS (side by side)
    // ══════════════════════════════════════════════════════════════
    const halfW = (CW - 5) / 2;

    // ── Patient Card ─────────────────────────────────────────────
    setFill(doc, C.white);
    doc.roundedRect(ML, y, halfW, 38, 3, 3, "F");
    setStroke(doc, C.border);
    doc.setLineWidth(0.3);
    doc.roundedRect(ML, y, halfW, 38, 3, 3, "S");

    // Card header
    setFill(doc, C.blueBg);
    doc.roundedRect(ML, y, halfW, 9, 3, 3, "F");
    doc.rect(ML, y + 6, halfW, 3, "F");
    setTextColor(doc, C.primary);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("PATIENT INFORMATION", ML + halfW / 2, y + 6, { align: "center" });

    // Patient details
    const patRows = [
        ["Name", patient.name || "—"],
        ["ID", patient.pid || patient.id || "—"],
        ["Age/Sex", patient.ageGender || (patient.age ? `${patient.age} yrs, ${patient.gender || ""}` : "—")],
        ["Contact", patient.phone || patient.contact || "—"],
        ["Address", patient.address || "—"],
    ];
    patRows.forEach(([label, value], i) => {
        const ry = y + 13 + i * 5;
        setTextColor(doc, C.muted);
        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        doc.text(label + ":", ML + 3, ry);
        setTextColor(doc, C.text);
        doc.setFont("helvetica", "bold");
        doc.text(truncate(value, 28), ML + 20, ry);
    });

    // ── Doctor Card ───────────────────────────────────────────────
    const docX = ML + halfW + 5;
    setFill(doc, C.white);
    doc.roundedRect(docX, y, halfW, 38, 3, 3, "F");
    setStroke(doc, C.border);
    doc.setLineWidth(0.3);
    doc.roundedRect(docX, y, halfW, 38, 3, 3, "S");

    setFill(doc, C.greenLight);
    doc.roundedRect(docX, y, halfW, 9, 3, 3, "F");
    doc.rect(docX, y + 6, halfW, 3, "F");
    setTextColor(doc, C.green);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("PRESCRIBING DOCTOR", docX + halfW / 2, y + 6, { align: "center" });

    const docRows = [
        ["Name", doctor.name || "—"],
        ["Spec.", doctor.specialization || doctor.spec || "—"],
        ["Dept.", doctor.department || "—"],
        ["Email", doctor.email || "—"],
        ["Phone", doctor.phone || "—"],
    ];
    docRows.forEach(([label, value], i) => {
        const ry = y + 13 + i * 5;
        setTextColor(doc, C.muted);
        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        doc.text(label + ":", docX + 3, ry);
        setTextColor(doc, C.text);
        doc.setFont("helvetica", "bold");
        doc.text(truncate(value, 28), docX + 20, ry);
    });

    y += 44;

    // ══════════════════════════════════════════════════════════════
    // CLINICAL NOTES (if any)
    // ══════════════════════════════════════════════════════════════
    if (clinicalNotes && clinicalNotes.trim()) {
        setFill(doc, "#fffbeb");
        doc.roundedRect(ML, y, CW, 0, 3, 3, "F"); // placeholder, will resize
        const noteLines = doc.splitTextToSize(clinicalNotes, CW - 24);
        const noteH = noteLines.length * 4.5 + 12;
        setFill(doc, "#fffbeb");
        doc.roundedRect(ML, y, CW, noteH, 3, 3, "F");
        setStroke(doc, "#fde68a");
        doc.setLineWidth(0.3);
        doc.roundedRect(ML, y, CW, noteH, 3, 3, "S");
        // Left accent bar
        setFill(doc, C.yellow);
        doc.roundedRect(ML, y, 3, noteH, 1.5, 1.5, "F");

        setTextColor(doc, C.yellow);
        doc.setFontSize(7.5);
        doc.setFont("helvetica", "bold");
        doc.text("Clinical Notes / Remarks", ML + 7, y + 6);
        setTextColor(doc, "#92400e");
        doc.setFontSize(7.5);
        doc.setFont("helvetica", "normal");
        noteLines.forEach((line, i) => {
            doc.text(line, ML + 7, y + 11 + i * 4.5);
        });
        y += noteH + 5;
    }

    // ══════════════════════════════════════════════════════════════
    // PRESCRIBED MEDICINES TABLE
    // ══════════════════════════════════════════════════════════════
    // Section header
    setFill(doc, C.primary);
    doc.roundedRect(ML, y, CW, 9, 3, 3, "F");
    setTextColor(doc, C.white);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("PRESCRIBED MEDICINES", ML + 5, y + 6.2);

    const medCount = medicines.length;
    const medBadge = `${medCount} Medicine${medCount !== 1 ? "s" : ""}`;
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.text(medBadge, W - MR - 3, y + 6.2, { align: "right" });

    y += 10;

    // Table header
    const cols = [
        { label: "#", w: 8, align: "center" },
        { label: "Medicine Name", w: 38, align: "left" },
        { label: "Form/Strength", w: 28, align: "left" },
        { label: "Dose", w: 18, align: "center" },
        { label: "Frequency", w: 26, align: "center" },
        { label: "Duration", w: 22, align: "center" },
        { label: "Instructions", w: 42, align: "left" },
    ];
    const totalColW = cols.reduce((s, c) => s + c.w, 0);
    const scale = CW / totalColW;
    cols.forEach((c) => { c.w *= scale; });

    setFill(doc, "#1e3a5f");
    doc.roundedRect(ML, y, CW, 8, 2, 2, "F");

    let cx = ML;
    cols.forEach((col) => {
        setTextColor(doc, "#bfdbfe");
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        const tx = col.align === "center" ? cx + col.w / 2 : cx + 2;
        doc.text(col.label, tx, y + 5.3, { align: col.align === "center" ? "center" : "left" });
        cx += col.w;
    });
    y += 9;

    // Table rows
    medicines.forEach((med, idx) => {
        const rowH = 9;
        const isEven = idx % 2 === 0;

        setFill(doc, isEven ? C.white : C.bg);
        doc.rect(ML, y, CW, rowH, "F");

        // Bottom border
        setStroke(doc, C.border);
        doc.setLineWidth(0.2);
        doc.line(ML, y + rowH, ML + CW, y + rowH);

        const rowData = [
            { text: String(idx + 1), col: cols[0] },
            { text: med.name || "—", col: cols[1] },
            { text: med.formStrength || "—", col: cols[2] },
            { text: med.dose || "—", col: cols[3] },
            { text: med.frequency === "custom" ? (med.customFrequency || "—") : (med.frequency || "—"), col: cols[4] },
            { text: med.duration === "custom" ? (med.customDuration || "—") : (med.duration || "—"), col: cols[5] },
            { text: med.instructions || "—", col: cols[6] },
        ];

        cx = ML;
        rowData.forEach((cell, ci) => {
            const col = cols[ci];
            if (ci === 0) {
                // Row number badge
                setFill(doc, C.primary);
                doc.roundedRect(cx + 1.5, y + 1.5, col.w - 3, rowH - 3, 1.5, 1.5, "F");
                setTextColor(doc, C.white);
                doc.setFontSize(7);
                doc.setFont("helvetica", "bold");
                doc.text(cell.text, cx + col.w / 2, y + rowH / 2 + 1.2, { align: "center" });
            } else if (ci === 1) {
                // Medicine name in blue
                setTextColor(doc, C.primary);
                doc.setFontSize(7.5);
                doc.setFont("helvetica", "bold");
                doc.text(truncate(cell.text, 20), cx + 2, y + rowH / 2 + 1.2);
            } else {
                setTextColor(doc, C.text);
                doc.setFontSize(7.5);
                doc.setFont("helvetica", col.align === "center" ? "bold" : "normal");
                const tx = col.align === "center" ? cx + col.w / 2 : cx + 2;
                doc.text(truncate(cell.text, col.align === "center" ? 14 : 22), tx, y + rowH / 2 + 1.2, {
                    align: col.align === "center" ? "center" : "left",
                });
            }
            cx += col.w;
        });

        y += rowH;
    });

    // Table bottom border
    setStroke(doc, C.border);
    doc.setLineWidth(0.4);
    doc.rect(ML, y - medicines.length * 9 - 9, CW, medicines.length * 9 + 9, "S");
    y += 6;

    // ══════════════════════════════════════════════════════════════
    // ADDITIONAL INSTRUCTIONS
    // ══════════════════════════════════════════════════════════════
    const validInstructions = additionalInstructions.filter((i) => i && i.trim());
    if (validInstructions.length > 0) {
        setFill(doc, C.greenLight);
        doc.roundedRect(ML, y, CW, 9, 3, 3, "F");
        setTextColor(doc, C.green);
        doc.setFontSize(9);
        doc.setFont("helvetica", "bold");
        doc.text("ADDITIONAL INSTRUCTIONS", ML + 5, y + 6.2);
        y += 10;

        setFill(doc, "#f0fdf4");
        const instrH = validInstructions.length * 6 + 8;
        doc.roundedRect(ML, y, CW, instrH, 2, 2, "F");
        setStroke(doc, "#bbf7d0");
        doc.setLineWidth(0.3);
        doc.roundedRect(ML, y, CW, instrH, 2, 2, "S");

        validInstructions.forEach((inst, i) => {
            const iy = y + 5 + i * 6;
            // Bullet
            setFill(doc, C.greenText);
            doc.circle(ML + 6, iy - 0.5, 1.2, "F");
            setTextColor(doc, "#1a3a2a");
            doc.setFontSize(8);
            doc.setFont("helvetica", "normal");
            doc.text(truncate(inst, 90), ML + 10, iy);
        });

        y += instrH + 6;
    }

    // ══════════════════════════════════════════════════════════════
    // FOLLOW-UP + SUMMARY ROW
    // ══════════════════════════════════════════════════════════════
    if (followUpDate) {
        setFill(doc, C.blueBg);
        doc.roundedRect(ML, y, CW, 14, 3, 3, "F");
        setStroke(doc, "#bfdbfe");
        doc.setLineWidth(0.3);
        doc.roundedRect(ML, y, CW, 14, 3, 3, "S");

        setTextColor(doc, C.primary);
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.text("Next Follow-up:", ML + 5, y + 6);
        setTextColor(doc, C.primaryDark);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(followUpDate, ML + 40, y + 6);

        setTextColor(doc, C.muted);
        doc.setFontSize(7.5);
        doc.setFont("helvetica", "normal");
        doc.text("Please return on the scheduled date for your follow-up appointment.", ML + 5, y + 12);
        y += 20;
    }

    // ══════════════════════════════════════════════════════════════
    // SIGNATURE SECTION
    // ══════════════════════════════════════════════════════════════
    y += 4;
    const sigW = 55;
    const sigX = W - MR - sigW;

    // Signature box
    setFill(doc, C.bg);
    doc.roundedRect(sigX, y, sigW, 28, 3, 3, "F");
    setStroke(doc, C.border);
    doc.setLineWidth(0.3);
    doc.roundedRect(sigX, y, sigW, 28, 3, 3, "S");

    setTextColor(doc, C.muted);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("Authorized Signature", sigX + sigW / 2, y + 22, { align: "center" });

    // Signature line
    setStroke(doc, C.light);
    doc.setLineWidth(0.5);
    doc.line(sigX + 6, y + 18, sigX + sigW - 6, y + 18);

    setTextColor(doc, C.primary);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(doctor.name || "Prescribing Doctor", sigX + sigW / 2, y + 27, { align: "center" });

    // Left side notes
    setTextColor(doc, C.muted);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("This prescription is valid for 30 days from the date of issue.", ML, y + 6);
    doc.text("Dispense as written. No substitution without doctor's approval.", ML, y + 11);
    doc.text("Keep all medicines out of reach of children.", ML, y + 16);

    y += 33;

    // ══════════════════════════════════════════════════════════════
    // FOOTER
    // ══════════════════════════════════════════════════════════════
    // Green + blue footer band
    setFill(doc, C.green);
    doc.rect(0, H - 14, W, 6, "F");
    setFill(doc, C.primary);
    doc.rect(0, H - 8, W, 8, "F");

    setTextColor(doc, "#bbf7d0");
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("MediCare Hospital & Clinic  |  Mirpur, Dhaka, Bangladesh", W / 2, H - 10, { align: "center" });

    setTextColor(doc, "#93c5fd");
    doc.setFontSize(6.5);
    doc.text(
        `Generated: ${new Date().toLocaleString()}   |   ID: ${prescriptionId}   |   This is a computer-generated prescription`,
        W / 2,
        H - 4,
        { align: "center" }
    );

    // ── Action ────────────────────────────────────────────────────
    const fileName = `Prescription_${prescriptionId.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;

    if (action === "download") {
        doc.save(fileName);
    } else if (action === "print") {
        const blob = doc.output("blob");
        const url = URL.createObjectURL(blob);
        const win = window.open(url, "_blank");
        if (win) {
            win.addEventListener("load", () => {
                win.print();
                setTimeout(() => URL.revokeObjectURL(url), 3000);
            });
        }
    } else if (action === "preview") {
        const blob = doc.output("blob");
        const url = URL.createObjectURL(blob);
        return url; // caller opens in modal
    }
}

// ── Build prescription data from the Details page static data ────
export function buildPrescriptionDataFromDetails({
    prescription,
    medicines,
    additionalInstructions,
    patient,
    summary,
    doctor,
}) {
    return {
        prescriptionId: prescription.id,
        prescriptionDate: prescription.dateTime?.split(",")[0] || "",
        prescriptionTime: prescription.dateTime?.split(",")[1]?.trim() || "",
        visitType: prescription.visitType,
        prescriptionType: prescription.type === "new" ? "New Prescription" : "Refill",
        followUpDate: summary.followUpDate,
        clinicalNotes: prescription.clinicalNotes || "",
        doctor: {
            name: prescription.doctor,
            specialization: prescription.doctorSpec,
            department: prescription.department,
            email: doctor?.email || "",
            phone: doctor?.phone || "",
        },
        patient: {
            name: prescription.patientName,
            pid: prescription.patientId,
            ageGender: prescription.ageGender,
            contact: prescription.contact,
            address: patient.address,
        },
        medicines,
        additionalInstructions,
        status: summary.status,
    };
}

// ── Build prescription data from New/Update form state ────────────
export function buildPrescriptionDataFromForm({
    prescriptionDate,
    visitType,
    prescriptionType,
    followUpDate,
    clinicalNotes,
    medicines,
    additionalInstructions,
    selectedPatient,
    doctor,
    status = "pending",
    prescriptionId = `RX-${new Date().getFullYear()}-DRAFT`,
}) {
    return {
        prescriptionId,
        prescriptionDate,
        prescriptionTime: "",
        visitType,
        prescriptionType:
            prescriptionType === "new" ? "New Prescription" :
                prescriptionType === "refill" ? "Refill" : "Repeat",
        followUpDate,
        clinicalNotes,
        doctor,
        patient: selectedPatient ? {
            name: selectedPatient.name,
            pid: selectedPatient.id,
            ageGender: `${selectedPatient.age} yrs, ${selectedPatient.gender}`,
            contact: selectedPatient.phone,
            address: selectedPatient.address,
        } : {},
        medicines: medicines.filter((m) => m.name?.trim()),
        additionalInstructions: additionalInstructions.filter((i) => i?.trim()),
        status,
    };
}