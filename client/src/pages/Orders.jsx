import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import apiClient from '../utils/apiClient';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAppContext();

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get(`/orders/user/${user.id}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
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

  if (!user) {
    return <div className="container mt-5 text-center">Please login to view orders</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h6>Username: {user.username}</h6>
              <p>Email: {user.email || 'hola@gmail.com'}</p>
              <p>Orders: {orders.length}</p>
              <button className="btn btn-danger btn-sm">Logout</button>
            </div>
          </div>
        </div>
        
        <div className="col-md-9">
          <h4>Orders</h4>
          {orders.length === 0 ? (
            <div className="text-center mt-5">
              <p>No orders found</p>
            </div>
          ) : (
            orders.map(order => (
              <div key={order._id} className="card mb-3">
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
                      <h6 className="card-title">{order.title}</h6>
                      <p className="card-text">{order.description}</p>
                      <div className="row">
                        <div className="col-md-6">
                          <p><strong>Size:</strong> {order.size}</p>
                          <p><strong>Quantity:</strong> {order.quantity}</p>
                          <p><strong>Price:</strong> ₹ {order.price}</p>
                          <p><strong>Payment method:</strong> {order.paymentMethod}</p>
                        </div>
                        <div className="col-md-6">
                          <p><strong>Address:</strong> {order.address}</p>
                          <p><strong>Pincode:</strong> {order.pincode}</p>
                          <p><strong>Ordered on:</strong> {order.orderDate}</p>
                          <p><strong>Order status:</strong> 
                            <span className={`badge ms-2 ${order.orderStatus === 'order placed' ? 'bg-success' : 'bg-warning'}`}>
                              {order.orderStatus}
                            </span>
                          </p>
                        </div>
                      </div>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;