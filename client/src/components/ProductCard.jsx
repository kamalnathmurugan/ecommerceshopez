import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import apiClient from '../utils/apiClient';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, user } = useAppContext();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }
    
    try {
      const cartItem = {
        productId: product._id,
        title: product.title,
        description: product.description,
        mainImg: product.mainImg,
        size: product.sizes?.[0] || 'M',
        quantity: 1,
        price: product.price,
        discount: product.discount
      };
      
      await apiClient.post('/cart', cartItem);
      addToCart(cartItem);
      
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    }
  };

  const discountedPrice = product.price - (product.price * product.discount / 100);

  return (
    <div className="card h-100">
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
          <button 
            className={`btn btn-sm w-100 ${isAdded ? 'btn-success' : 'btn-primary'}`}
            onClick={handleAddToCart}
          >
            {isAdded ? 'Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;