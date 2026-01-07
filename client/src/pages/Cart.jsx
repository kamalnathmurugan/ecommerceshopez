import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, user } = useAppContext();
  const navigate = useNavigate();



  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const discountedPrice = item.price - (item.price * item.discount / 100);
      return total + (discountedPrice * item.quantity);
    }, 0);
  };

  const calculateDiscount = () => {
    return cart.reduce((total, item) => {
      return total + ((item.price * item.discount / 100) * item.quantity);
    }, 0);
  };

  const handleQuantityChange = (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartQuantity(productId, size, newQuantity);
  };

  const handlePlaceOrder = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>Your cart is empty</h3>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  const totalMRP = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalDiscount = calculateDiscount();
  const finalPrice = calculateTotal();

  return (
    <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px' }}>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <div className="row">
                {/* Cart Items */}
                <div className="col-md-8">
                  <div className="cart-items">
                    {cart.map(item => {
                      const discountedPrice = item.price - (item.price * item.discount / 100);
                      return (
                        <div key={`${item.productId || item._id}-${item.size}`} className="d-flex align-items-center mb-4 pb-3 border-bottom">
                          <img 
                            src={item.mainImg} 
                            alt={item.title}
                            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/80x80/f0f0f0/666?text=No+Image';
                            }}
                          />
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-1 fw-bold">{item.title}</h6>
                            <p className="text-muted mb-2 small">{item.description}</p>
                            <div className="d-flex align-items-center mb-2">
                              <span className="me-3">Size: <strong>{item.size}</strong></span>
                              <span>Quantity: 
                                <button 
                                  className="btn btn-sm btn-outline-secondary ms-2 me-1"
                                  onClick={() => handleQuantityChange(item.productId || item._id, item.size, item.quantity - 1)}
                                  style={{ width: '30px', height: '30px' }}
                                >-</button>
                                <span className="mx-2 fw-bold">{item.quantity}</span>
                                <button 
                                  className="btn btn-sm btn-outline-secondary"
                                  onClick={() => handleQuantityChange(item.productId || item._id, item.size, item.quantity + 1)}
                                  style={{ width: '30px', height: '30px' }}
                                >+</button>
                              </span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <span className="fw-bold">Price: ₹ {Math.round(discountedPrice)}</span>
                                {item.discount > 0 && (
                                  <span className="text-muted text-decoration-line-through ms-2">₹{item.price}</span>
                                )}
                              </div>
                              <button 
                                className="btn btn-link text-danger p-0"
                                onClick={() => removeFromCart(item.productId || item._id, item.size)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Price Details */}
                <div className="col-md-4">
                  <div className="card border-0" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="card-header bg-transparent border-0">
                      <h5 className="mb-0 fw-bold">Price Details</h5>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-2">
                        <span>Total MRP:</span>
                        <span>₹ {Math.round(totalMRP)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2 text-success">
                        <span>Discount on MRP:</span>
                        <span>- ₹ {Math.round(totalDiscount)}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <span>Delivery Charges:</span>
                        <span className="text-success">+ ₹ 0</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between mb-4">
                        <span className="fw-bold fs-5">Final Price:</span>
                        <span className="fw-bold fs-5">₹ {Math.round(finalPrice)}</span>
                      </div>
                      <button 
                        className="btn btn-primary w-100 py-2 fw-bold"
                        onClick={handlePlaceOrder}
                        style={{ backgroundColor: '#6c5ce7', border: 'none' }}
                      >
                        Place order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;