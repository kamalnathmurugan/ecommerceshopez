import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import apiClient from '../utils/apiClient';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    sortBy: 'Popularity',
    categories: [],
    gender: []
  });
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.userType !== 'Admin') {
      navigate('/');
      return;
    }
    fetchProducts();
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await apiClient.delete(`/products/${productId}`);
        fetchProducts(); // Refresh products
      } catch (error) {
        console.error('Error deleting product:', error);
      }
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

      <div className="container-fluid" style={{backgroundColor: '#2c3e50', minHeight: '100vh'}}>
        <div className="row">
          {/* Filters Sidebar */}
          <div className="col-md-3 bg-dark text-white p-4">
            <h5>Filters</h5>
            
            {/* Sort By */}
            <div className="mb-4">
              <h6>Sort By</h6>
              {['Popularity', 'Price (low to high)', 'Price (high to low)', 'Discount'].map(option => (
                <div key={option} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sortBy"
                    checked={filters.sortBy === option}
                    onChange={() => setFilters(prev => ({...prev, sortBy: option}))}
                  />
                  <label className="form-check-label text-white">{option}</label>
                </div>
              ))}
            </div>

            {/* Categories */}
            <div className="mb-4">
              <h6>Categories</h6>
              {['mobiles', 'Electronics', 'Sports-Equipment', 'Fashion', 'Groceries'].map(category => (
                <div key={category} className="form-check">
                  <input className="form-check-input" type="checkbox" />
                  <label className="form-check-label text-white">{category}</label>
                </div>
              ))}
            </div>

            {/* Gender */}
            <div className="mb-4">
              <h6>Gender</h6>
              {['Men', 'Women', 'Unisex'].map(gender => (
                <div key={gender} className="form-check">
                  <input className="form-check-input" type="checkbox" />
                  <label className="form-check-label text-white">{gender}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-md-9 p-4">
            <h4 className="text-white mb-4">All Products</h4>
            <div className="row">
              {products.map(product => {
                const discountedPrice = product.price - (product.price * product.discount / 100);
                return (
                  <div key={product._id} className="col-md-4 mb-4">
                    <div className="card bg-dark text-white h-100">
                      <img 
                        src={product.mainImg} 
                        className="card-img-top" 
                        alt={product.title}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h6 className="card-title">{product.title}</h6>
                        <p className="card-text text-muted small">{product.description}</p>
                        <div className="mt-auto">
                          <div className="d-flex align-items-center mb-2">
                            <span className="fw-bold">₹ {Math.round(discountedPrice)}</span>
                            {product.discount > 0 && (
                              <>
                                <span className="text-muted text-decoration-line-through ms-2">₹{product.price}</span>
                                <span className="text-success ms-2">({product.discount}% off)</span>
                              </>
                            )}
                          </div>
                          <div className="d-flex gap-2">
                            <button className="btn btn-outline-warning btn-sm flex-fill">Update</button>
                            <button 
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => deleteProduct(product._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;