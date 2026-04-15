import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Students from "./pages/Students.jsx";
import Fees from "./pages/Fees";
import AttendancePage from "./pages/AttendancePage.jsx";
import ReportPage from "./pages/ReportPage";
import BranchPage from "./pages/BranchPage.jsx";
import BatchPage from "./pages/BatchPage.jsx";
import CoursePage from "./pages/CoursePage.jsx";
import LeadPage from "./pages/LeadPage.jsx";
import SalaryPage from "./pages/SalaryPage.jsx";
import InvoicePage from "./pages/InvoicePage.jsx";
import AccessPage from "./pages/AccessPage.jsx";
import CampaignPage from "./pages/CampaignPage.jsx";
import Layout from "./layout/Layout.jsx";

function App() {
  return (
    <Routes>
      {/* Login page without sidebar */}
      <Route path="/" element={<Login />} />

      {/* All other pages inside Layout with sidebar */}
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="fees" element={<Fees />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="reports" element={<ReportPage />} />
        <Route path="branches" element={<BranchPage />} />
        <Route path="batches" element={<BatchPage />} />
        <Route path="courses" element={<CoursePage />} />
        <Route path="leads" element={<LeadPage />} />
        <Route path="salary" element={<SalaryPage />} />
        <Route path="invoice" element={<InvoicePage />} />
        <Route path="access" element={<AccessPage />} />
        <Route path="campaign" element={<CampaignPage />} />
      </Route>
    </Routes>
  );
}

export default App;
