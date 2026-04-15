import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "./../styles/layout.css";


export default function Layout() {
  return (
    <div className="app-layout">
      {/* Sidebar always visible */}
      <Sidebar />

      {/* Main content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
