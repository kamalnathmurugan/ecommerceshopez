import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Categories.css';

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: 'Fashion',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop'
    },
    {
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop'
    },
    {
      name: 'Mobiles',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop'
    },
    {
      name: 'Groceries',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop'
    },
    {
      name: 'Sports-Equipment',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop'
    }
  ];

  const handleCategoryClick = (categoryName) => {
    navigate(`/products?category=${categoryName}`);
  };

  return (
    <div className="categories-container">
      <div className="categories-row">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="category-card" 
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="category-image">
              <img 
                src={category.image} 
                alt={category.name}
                className="img-fluid rounded"
              />
            </div>
            <h6 className="mt-2">{category.name}</h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;