import "./../styles/access.css";
import { useState, useEffect } from "react";
import { getAccessRoles, addAccessRole, updateAccessRole, deleteAccessRole } from "../services/access";

export default function AccessPage() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({
    role: "",
    permissions: "",
    scope: ""
  });

  // Fetch roles
  const fetchRoles = async () => {
    try {
      const data = await getAccessRoles();
      setRoles(data.roles);
    } catch (err) {
      console.error("❌ Error fetching roles:", err.message);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Add role
  const handleAddRole = async () => {
    try {
      if (!newRole.role) {
        alert("Please enter role name");
        return;
      }
      await addAccessRole(newRole);
      setNewRole({ role: "", permissions: "", scope: "" });
      fetchRoles();
    } catch (err) {
      console.error("❌ Error adding role:", err.message);
    }
  };

  // Update role
  const handleUpdate = async (id) => {
    const updatedScope = prompt("Enter new scope:");
    if (updatedScope) {
      await updateAccessRole(id, { scope: updatedScope });
      fetchRoles();
    }
  };

  // Delete role
  const handleDelete = async (id) => {
    try {
      await deleteAccessRole(id);
      fetchRoles();
    } catch (err) {
      console.error("❌ Error deleting role:", err.message);
    }
  };

  return (
    <div className="access-page">
      {/* Header */}
      <div className="access-header">
        <h1>🔐 Access Management</h1>
      </div>

      {/* Form for new role */}
      <div className="form">
        <input
          type="text"
          placeholder="Role Name"
          value={newRole.role}
          onChange={(e) => setNewRole({ ...newRole, role: e.target.value })}
        />
        <input
          type="text"
          placeholder="Permissions"
          value={newRole.permissions}
          onChange={(e) => setNewRole({ ...newRole, permissions: e.target.value })}
        />
        <input
          type="text"
          placeholder="Scope"
          value={newRole.scope}
          onChange={(e) => setNewRole({ ...newRole, scope: e.target.value })}
        />
        <button className="btn-primary" onClick={handleAddRole}>+ Add Role</button>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="card hoverable">
          <h2>Total Roles</h2>
          <p className="big">{roles.length}</p>
          <span>Defined in system</span>
        </div>
        <div className="card hoverable">
          <h2>Admins</h2>
          <p className="big">{roles.filter(r => r.role === "Admin").length}</p>
          <span>Full access users</span>
        </div>
        <div className="card hoverable">
          <h2>Managers</h2>
          <p className="big">{roles.filter(r => r.role.includes("Manager")).length}</p>
          <span>Limited access users</span>
        </div>
      </div>

      {/* Role Table */}
      <div className="card hoverable">
        <h2>Role Permissions</h2>
        <table className="access-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Role</th>
              <th>Permissions</th>
              <th>Scope</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.length > 0 ? (
              roles.map(r => (
                <tr key={r._id}>
                  <td>{r._id}</td>
                  <td>{r.role}</td>
                  <td>{r.permissions}</td>
                  <td>{r.scope}</td>
                  <td>
                    <button className="btn-secondary small" onClick={() => handleUpdate(r._id)}>Edit</button>
                    <button className="btn-danger small" onClick={() => handleDelete(r._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No roles found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
