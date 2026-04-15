export default function BiometricStatus({ lastSync, connected }) {
  return (
    <div className="bio-status">
      <div className={`pill ${connected ? "ok" : "fail"}`}>
        {connected ? "Connected" : "Disconnected"}
      </div>
      <p className="muted">Last sync: {lastSync}</p>
      <div className="hint">Biometric integration pulls device logs and auto‑marks attendance.</div>
    </div>
  );
}
