import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';

const NewProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mainImg: '',
    carousel: ['', '', ''],
    sizes: [],
    category: '',
    gender: '',
    price: '',
    discount: 0
  });
  const [selectedSizes, setSelectedSizes] = useState([]);
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCarouselChange = (index, value) => {
    const newCarousel = [...formData.carousel];
    newCarousel[index] = value;
    setFormData(prev => ({
      ...prev,
      carousel: newCarousel
    }));
  };

  const handleSizeToggle = (size) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(newSizes);
    setFormData(prev => ({
      ...prev,
      sizes: newSizes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount),
        carousel: formData.carousel.filter(url => url.trim() !== '')
      };
      
      await axios.post('http://localhost:5000/api/products', productData);
      alert('Product added successfully!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user || user.userType !== 'Admin') {
    navigate('/');
    return null;
  }

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

      <div className="container-fluid p-4" style={{backgroundColor: '#2c3e50', minHeight: '100vh'}}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card bg-dark text-white">
              <div className="card-body">
                <h3 className="card-title text-center mb-4">New Product</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Product name</label>
                      <input
                        type="text"
                        className="form-control bg-secondary text-white border-0"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Product Description</label>
                      <textarea
                        className="form-control bg-secondary text-white border-0"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Thumbnail Img url</label>
                    <input
                      type="url"
                      className="form-control bg-secondary text-white border-0"
                      name="mainImg"
                      value={formData.mainImg}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label className="form-label">Add on img1 url</label>
                      <input
                        type="url"
                        className="form-control bg-secondary text-white border-0"
                        value={formData.carousel[0]}
                        onChange={(e) => handleCarouselChange(0, e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Add on img2 url</label>
                      <input
                        type="url"
                        className="form-control bg-secondary text-white border-0"
                        value={formData.carousel[1]}
                        onChange={(e) => handleCarouselChange(1, e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Add on img3 url</label>
                      <input
                        type="url"
                        className="form-control bg-secondary text-white border-0"
                        value={formData.carousel[2]}
                        onChange={(e) => handleCarouselChange(2, e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select bg-secondary text-white border-0"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Mobiles">Mobiles</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Sports-Equipment">Sports Equipment</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Gender</label>
                      <select
                        className="form-select bg-secondary text-white border-0"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Unisex">Unisex</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Available Size</label>
                    <div className="d-flex gap-3">
                      {['S', 'M', 'L', 'XL'].map(size => (
                        <div key={size} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedSizes.includes(size)}
                            onChange={() => handleSizeToggle(size)}
                          />
                          <label className="form-check-label text-white">{size}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control bg-secondary text-white border-0"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Discount (%)</label>
                      <input
                        type="number"
                        className="form-control bg-secondary text-white border-0"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">Add product</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;