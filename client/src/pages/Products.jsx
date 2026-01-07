import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getApiUrl, API_CONFIG } from '../config/api';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import '../styles/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    sortBy: 'Popular',
    categories: [],
    gender: []
  });
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setFilters(prev => ({
        ...prev,
        categories: [category]
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(getApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS));
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // Filter by gender
    if (filters.gender.length > 0) {
      filtered = filtered.filter(product => 
        filters.gender.includes(product.gender)
      );
    }

    // Sort products
    switch (filters.sortBy) {
      case 'Price (low to high)':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'Price (high to low)':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'Discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default:
        // Popular - keep original order
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'sortBy') {
        return { ...prev, sortBy: value };
      } else {
        const currentValues = prev[filterType];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        return { ...prev, [filterType]: newValues };
      }
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Filters Sidebar */}
        <div className="col-md-3 bg-light p-4">
          <h5>Filters</h5>
          
          {/* Sort By */}
          <div className="mb-4">
            <h6>Sort By</h6>
            {['Popular', 'Price (low to high)', 'Price (high to low)', 'Discount'].map(option => (
              <div key={option} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="sortBy"
                  checked={filters.sortBy === option}
                  onChange={() => handleFilterChange('sortBy', option)}
                />
                <label className="form-check-label">{option}</label>
              </div>
            ))}
          </div>

          {/* Categories */}
          <div className="mb-4">
            <h6>Categories</h6>
            {['Fashion', 'Electronics', 'Sports-Equipment', 'Mobiles', 'Groceries'].map(category => (
              <div key={category} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleFilterChange('categories', category)}
                />
                <label className="form-check-label">{category}</label>
              </div>
            ))}
          </div>

          {/* Gender */}
          <div className="mb-4">
            <h6>Gender</h6>
            {['Men', 'Women', 'Unisex'].map(gender => (
              <div key={gender} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={filters.gender.includes(gender)}
                  onChange={() => handleFilterChange('gender', gender)}
                />
                <label className="form-check-label">{gender}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="col-md-9 p-4">
          <h4>All Products</h4>
          <div className="row">
            {filteredProducts.map(product => (
              <div key={product._id} className="col-md-4 mb-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center mt-5">
              <p>No products found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;