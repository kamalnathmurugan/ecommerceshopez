import { useState, useEffect } from "react";
import "../styles/Banner.css";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [
    {
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=400&fit=crop",
      text: "Fashion Sale - Up to 70% OFF"
    },
    {
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1920&h=400&fit=crop",
      text: "Electronics - 50% OFF"
    },
    {
      image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=1920&h=400&fit=crop",
      text: "Mobiles - Mega Sale 60% OFF"
    },
    {
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&h=400&fit=crop",
      text: "Groceries - Fresh Deals 30% OFF"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner-container">
      <img src={banners[currentSlide].image} className="banner-img" alt="Banner" />
      <div className="banner-text">{banners[currentSlide].text}</div>
    </div>
  );
};

export default Banner;
