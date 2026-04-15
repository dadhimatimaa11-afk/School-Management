import "../styles/dashboard.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <h3>Welcome back 👋</h3>
      <div className="profile">
        <img src="/avatar.png" alt="user" />
        <span>Admin</span>
      </div>
    </div>
  );
}
