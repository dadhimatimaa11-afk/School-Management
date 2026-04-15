import * as XLSX from "xlsx";

export const exportLeadsToExcel = (leads) => {
  // Convert leads array to worksheet
  const worksheet = XLSX.utils.json_to_sheet(
    leads.map((l) => ({
      ID: l._id,
      Name: l.name,
      Source: l.source,
      Status: l.status,
      Date: new Date(l.createdAt).toLocaleDateString(),
    }))
  );

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

  // Export file
  XLSX.writeFile(workbook, "Leads_Report.xlsx");
};
