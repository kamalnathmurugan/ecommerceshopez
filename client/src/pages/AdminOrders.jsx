import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import apiClient from '../utils/apiClient';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.userType !== 'Admin') {
      navigate('/');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await apiClient.put(`/orders/${orderId}`, { orderStatus: newStatus });
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await apiClient.delete(`/orders/${orderId}`);
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
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
        <h3 className="mb-4">Orders</h3>
        
        {orders.length === 0 ? (
          <div className="text-center mt-5">
            <p>No orders found</p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order._id} className="card mb-3 bg-dark text-white">
              <div className="row g-0">
                <div className="col-md-3">
                  <img 
                    src={order.mainImg} 
                    className="img-fluid rounded-start h-100" 
                    alt={order.title}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                    <h6 className="card-title text-info">{order.title}</h6>
                    <p className="card-text">{order.description}</p>
                    <div className="row">
                      <div className="col-md-4">
                        <p><strong>Size:</strong> {order.size}</p>
                        <p><strong>Quantity:</strong> {order.quantity}</p>
                        <p><strong>Price:</strong> ₹ {order.price}</p>
                        <p><strong>Payment method:</strong> {order.paymentMethod}</p>
                      </div>
                      <div className="col-md-4">
                        <p><strong>UserId:</strong> {order.userId}</p>
                        <p><strong>Name:</strong> {order.name}</p>
                        <p><strong>Email:</strong> {order.email}</p>
                        <p><strong>Mobile:</strong> {order.mobile}</p>
                      </div>
                      <div className="col-md-4">
                        <p><strong>Ordered on:</strong> {order.orderDate}</p>
                        <p><strong>Address:</strong> {order.address}</p>
                        <p><strong>Pincode:</strong> {order.pincode}</p>
                        <p><strong>Order status:</strong> {order.orderStatus}</p>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <select 
                        className="form-select form-select-sm bg-secondary text-white border-0"
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        style={{width: 'auto'}}
                      >
                        <option value="order placed">Order Placed</option>
                        <option value="in-transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => updateOrderStatus(order._id, document.querySelector(`select[value="${order.orderStatus}"]`).value)}
                      >
                        Update
                      </button>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => cancelOrder(order._id)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrders;