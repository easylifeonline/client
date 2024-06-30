import React, { useState, useEffect } from 'react';
import api from '../helpers/api';
import '../styles/views/HomePage.scss';
import HeroSection from './HeroSection';
import FeaturedProducts from './FeaturedProducts';
import PromotionalBanner from './PromotionalBanner';
import CategoriesOverview from './CategoriesOverview';
import CustomerTestimonials from './CustomerTestimonials';
import NewsletterSignup from './NewsletterSignup';
import categoryDescriptions from '../models/categoryDescriptions';
import categoryPictures from '../models/categoryPictures';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await api.get('products/');
        setProducts(productResponse.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setErrorMessage('Failed to load products. Please try again later.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('categories/');
        const parentCategories = response.data.filter(category => category.parent === null);

        setCategories(parentCategories);

        // Format the parent categories data for CategoriesOverview component
        const formattedCategories = parentCategories.map(category => ({
          id: category.id,
          name: category.name,
          image: categoryPictures[category.name],
          description: categoryDescriptions[category.name] 
        }));
        setCategoriesData(formattedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const testimonials = [
    {
      id: 1,
      text: "EasyLife Marketplace has transformed the way I shop. The convenience and variety are unmatched!",
      author: "Jane Doe",
      date: "2023-05-10",
      time: "14:30",
      country: "USA"
    },
    {
      id: 2,
      text: "I love the quick delivery and the quality of the products. Highly recommend EasyLife Marketplace!",
      author: "John Smith",
      date: "2023-05-12",
      time: "09:15",
      country: "Canada"
    },
    {
      id: 3,
      text: "Great customer service and amazing deals. I always find what I'm looking for.",
      author: "Alice Johnson",
      date: "2023-05-14",
      time: "11:45",
      country: "UK"
    }
  ]; 

  return (
    <div className="homepage-container">
      <HeroSection />
      <FeaturedProducts title="Best Sellers" type="best-sellers" />
      <FeaturedProducts title="New Arrivals" type="new-arrivals" />
      <FeaturedProducts title="Most Visited" type="most-visited" />
      <PromotionalBanner image="/images/swiss45.jpeg" title="Big Sale!" subtitle="Up to 50% off on selected items" />
      <CategoriesOverview categories={categoriesData} />
      <CustomerTestimonials testimonials={testimonials} />
      <NewsletterSignup />
    </div>
  );
};

export default Homepage;

