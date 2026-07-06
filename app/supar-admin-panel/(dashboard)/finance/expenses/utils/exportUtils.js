// app/super-admin/finance/expenses/utils/exportUtils.js
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

// ─── Export Financial Overview + Expense Analytics as single-page A4 PDF ───
export async function exportOverviewToPDF(elementId = "em-printable-report") {
    const node = document.getElementById(elementId);
    if (!node) return;

    const canvas = await html2canvas(node, { scale: 2, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Ensure it never spills onto a 2nd page — shrink to fit height if needed
    const finalHeight = imgHeight > pageHeight ? pageHeight : imgHeight;
    const finalWidth = imgHeight > pageHeight ? (canvas.width * finalHeight) / canvas.height : imgWidth;
    const xOffset = (pageWidth - finalWidth) / 2;

    pdf.addImage(imgData, "PNG", xOffset, 0, finalWidth, finalHeight);
    pdf.save(`Expense-Overview-${new Date().toISOString().slice(0, 10)}.pdf`);
}

// ─── Export full expense list as Excel (.xlsx) ───
export function exportExpensesToExcel(expenses, filename = "All-Expenses") {
    const rows = expenses.map((e) => ({
        "Expense ID": e.id,
        "Date": e.date,
        "Title": e.title,
        "Category": e.category,
        "Sub Category": e.sub,
        "Branch": e.branch,
        "Department": e.dept,
        "Vendor": e.vendor,
        "Payment Method": e.method,
        "Invoice No": e.invoice,
        "Amount": e.amount,
        "Tax (%)": e.tax,
        "Discount (%)": e.discount,
        "Net Amount": e.net,
        "Created By": e.created,
        "Approved By": e.approved,
        "Status": e.status,
        "Remarks": e.remarks,
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    worksheet["!cols"] = [
        { wch: 10 }, { wch: 12 }, { wch: 26 }, { wch: 16 }, { wch: 18 },
        { wch: 12 }, { wch: 14 }, { wch: 16 }, { wch: 14 }, { wch: 12 },
        { wch: 12 }, { wch: 8 }, { wch: 10 }, { wch: 12 }, { wch: 14 },
        { wch: 14 }, { wch: 10 }, { wch: 20 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, `${filename}-${new Date().toISOString().slice(0, 10)}.xlsx`);
}