import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";   // 👈 use service layer
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 👇 call service function
      const { token, role } = await loginUser(email, password);

      // token already saved in localStorage inside loginUser
      console.log("✅ Logged in with role:", role);

      // redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Welcome back</h2>
        <p className="login-subtitle">Sign in to continue</p>

        <form className="login-form" onSubmit={handleLogin}>
          <label className="login-label">Email</label>
          <input
            className="login-input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="login-label">Password</label>
          <input
            className="login-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
