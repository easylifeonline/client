import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../helpers/api';
import '../styles/views/UpdateProduct.scss';
import Popup from './Popup';

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    sku: '',
    image: '',
    category: ''
  });
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await api.get(`products/${productId}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProduct(response.data);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          sku: response.data.sku,
          image: response.data.image || '',
          category: response.data.category?.id || ''
        });
      } catch (error) {
        console.error('Error fetching product:', error);
        setMessage('Failed to fetch product details.');
        setShowPopup(true);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get('categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setMessage('Failed to fetch categories.');
        setShowPopup(true);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('sku', formData.sku);
      formDataToSend.append('category', formData.category);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await api.patch(`products/${productId}/`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('Product updated successfully.');
      navigate('/vendor/products');
    } catch (error) {
      console.error('Error updating product:', error);
      setMessage('Failed to update product: '+ error.response.data.detail || 'Please try again.');
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="update-product-container">
      <h2>Update Product</h2>
      {product ? (
        <form onSubmit={handleSubmit} className="update-product-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="sku">SKU</label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.length > 0 && (
                <>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="submit-button">Update Product</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
      {showPopup && <Popup message={message} onClose={closePopup} />}
    </div>
  );
};

export default UpdateProduct;