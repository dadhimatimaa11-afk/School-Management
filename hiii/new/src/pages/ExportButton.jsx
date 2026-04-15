import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ExportButton({ rows, filename }) {
  const exportToExcel = () => {
    // Convert rows to worksheet
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, filename.replace(".csv", ".xlsx"));
  };

  return (
    <button className="btn-primary" onClick={exportToExcel}>
      Download Excel
    </button>
  );
}
