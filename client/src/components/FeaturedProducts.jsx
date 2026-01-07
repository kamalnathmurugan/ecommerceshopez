import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FeaturedProducts.css';

const FeaturedProducts = () => {
  const navigate = useNavigate();

  const products = [
    {
      _id: '1',
      title: 'Stylish T-Shirt',
      mainImg: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
      price: 999,
      category: 'Fashion'
    },
    {
      _id: '2',
      title: 'Wireless Headphones',
      mainImg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      price: 2999,
      category: 'Electronics'
    },
    {
      _id: '3',
      title: 'Smartphone',
      mainImg: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
      price: 15999,
      category: 'mobiles'
    },
    {
      _id: '4',
      title: 'Fresh Fruits',
      mainImg: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop',
      price: 299,
      category: 'Groceries'
    },
    {
      _id: '5',
      title: 'Football',
      mainImg: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
      price: 1299,
      category: 'Sports-Equipment'
    }
  ];

  const handleProductClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <div className="featured-container">
      <h2>Featured Products</h2>
      <div className="products-row">
        {products.map((product) => (
          <div 
            key={product._id} 
            className="product-card"
            onClick={() => handleProductClick(product.category)}
          >
            <img src={product.mainImg} alt={product.title} />
            <h6>{product.title}</h6>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;