import { NavLink } from "react-router-dom";
import "./../styles/sidebar.css";   // 👈 sidebar styles import karo

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">CRM</h2>
      <nav>
        <ul>
          <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>Dashboard</NavLink></li>
          <li><NavLink to="/students" className={({ isActive }) => isActive ? "active" : ""}>Students</NavLink></li>
          <li><NavLink to="/fees" className={({ isActive }) => isActive ? "active" : ""}>Fees</NavLink></li>
          <li><NavLink to="/attendance" className={({ isActive }) => isActive ? "active" : ""}>Attendance</NavLink></li>
          <li><NavLink to="/reports" className={({ isActive }) => isActive ? "active" : ""}>Reports</NavLink></li>
          <li><NavLink to="/branches" className={({ isActive }) => isActive ? "active" : ""}>Branch Management</NavLink></li>
          <li><NavLink to="/batches" className={({ isActive }) => isActive ? "active" : ""}>Batch Management</NavLink></li>
          <li><NavLink to="/courses" className={({ isActive }) => isActive ? "active" : ""}>Course Management</NavLink></li>
          <li><NavLink to="/leads" className={({ isActive }) => isActive ? "active" : ""}>Leads</NavLink></li>
          <li><NavLink to="/salary" className={({ isActive }) => isActive ? "active" : ""}>Salary</NavLink></li>
          <li><NavLink to="/invoice" className={({ isActive }) => isActive ? "active" : ""}>Invoice Management</NavLink></li>
          <li><NavLink to="/access" className={({ isActive }) => isActive ? "active" : ""}>Access Management</NavLink></li>
          <li><NavLink to="/campaign" className={({ isActive }) => isActive ? "active" : ""}>Campaign Management</NavLink></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
