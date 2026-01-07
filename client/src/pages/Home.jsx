import React from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <FeaturedProducts />
    </div>
  );
};

export default Home;