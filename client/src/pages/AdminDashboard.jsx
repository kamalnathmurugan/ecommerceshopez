import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import apiClient from '../utils/apiClient';
import '../styles/Admin.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0
  });
  const [bannerUrl, setBannerUrl] = useState('');
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.userType !== 'Admin') {
      navigate('/');
      return;
    }
    fetchStats();
    fetchBanner();
  }, [user, navigate]);

  const fetchStats = async () => {
    try {
      const [usersRes, productsRes, ordersRes] = await Promise.all([
        apiClient.get('/users'),
        apiClient.get('/products'),
        apiClient.get('/orders')
      ]);
      
      setStats({
        totalUsers: usersRes.data.length,
        totalProducts: productsRes.data.length,
        totalOrders: ordersRes.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchBanner = async () => {
    try {
      const response = await apiClient.get('/admin/settings');
      setBannerUrl(response.data.banner || '');
    } catch (error) {
      console.error('Error fetching banner:', error);
    }
  };

  const updateBanner = async () => {
    try {
      await apiClient.put('/admin/banner', { banner: bannerUrl });
      alert('Banner updated successfully!');
    } catch (error) {
      console.error('Error updating banner:', error);
      alert('Error updating banner');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
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
        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="stat-card bg-dark p-4 rounded text-center">
              <h3>Total users</h3>
              <h1>{stats.totalUsers}</h1>
              <button className="btn btn-outline-warning">View all</button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card bg-dark p-4 rounded text-center">
              <h3>All Products</h3>
              <h1>{stats.totalProducts}</h1>
              <button className="btn btn-outline-warning" onClick={() => navigate('/admin/products')}>View all</button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card bg-dark p-4 rounded text-center">
              <h3>All Orders</h3>
              <h1>{stats.totalOrders}</h1>
              <button className="btn btn-outline-warning" onClick={() => navigate('/admin/orders')}>View all</button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card bg-dark p-4 rounded text-center">
              <h3>Add Product</h3>
              <h1>(new)</h1>
              <button className="btn btn-outline-warning" onClick={() => navigate('/admin/new-product')}>Add now</button>
            </div>
          </div>
        </div>

        {/* Update Banner Section */}
        <div className="row">
          <div className="col-md-6">
            <div className="bg-dark p-4 rounded">
              <h4>Update banner</h4>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control bg-secondary text-white border-0"
                  placeholder="Banner url"
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                />
              </div>
              <button className="btn btn-outline-warning" onClick={updateBanner}>Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;