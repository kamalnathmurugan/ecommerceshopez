import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import apiClient from '../utils/apiClient';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ username: '', email: '', userType: 'Customer', password: '' });
  const [showForm, setShowForm] = useState(false);
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.userType !== 'Admin') {
      navigate('/');
      return;
    }
    fetchUsers();
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await apiClient.put(`/admin/users/${editingUser._id}`, formData);
      } else {
        await apiClient.post('/admin/users', formData);
      }
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ username: user.username, email: user.email, userType: user.userType, password: '' });
    setShowForm(true);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await apiClient.delete(`/admin/users/${userId}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const resetForm = () => {
    setEditingUser(null);
    setFormData({ username: '', email: '', userType: 'Customer', password: '' });
    setShowForm(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      {/* Admin Navbar */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand">ShopEZ (admin)</span>
          <div className="d-flex">
            <button className="btn btn-outline-light me-2" onClick={() => navigate('/admin')}>Home</button>
            <button className="btn btn-outline-light me-2" onClick={() => navigate('/admin/users')}>Users</button>
            <button className="btn btn-outline-light me-2" onClick={() => navigate('/admin/orders')}>Orders</button>
            <button className="btn btn-outline-light me-2" onClick={() => navigate('/admin/products')}>Products</button>
            <button className="btn btn-outline-light me-2" onClick={() => navigate('/admin/new-product')}>New Product</button>
            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      <div className="container-fluid p-4" style={{backgroundColor: '#2c3e50', minHeight: '100vh', color: 'white'}}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Users</h3>
          <button className="btn btn-success" onClick={() => setShowForm(true)}>Add User</button>
        </div>
        
        {showForm && (
          <div className="card bg-dark mb-4">
            <div className="card-body">
              <h5>{editingUser ? 'Edit User' : 'Add New User'}</h5>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control bg-secondary text-white border-0"
                      placeholder="Username"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <input
                      type="email"
                      className="form-control bg-secondary text-white border-0"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <select
                      className="form-select bg-secondary text-white border-0"
                      value={formData.userType}
                      onChange={(e) => setFormData({...formData, userType: e.target.value})}
                    >
                      <option value="Customer">Customer</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <input
                      type="password"
                      className="form-control bg-secondary text-white border-0"
                      placeholder={editingUser ? "New Password (optional)" : "Password"}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required={!editingUser}
                    />
                  </div>
                  <div className="col-md-2">
                    <button type="submit" className="btn btn-primary me-2">{editingUser ? 'Update' : 'Add'}</button>
                    <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge ${user.userType === 'Admin' ? 'bg-danger' : 'bg-primary'}`}>
                      {user.userType}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(user)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;