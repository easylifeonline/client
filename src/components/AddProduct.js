import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import '../styles/views/AddProduct.scss';
import Popup from './Popup'; // Assuming Popup is a component that displays messages

const AddProduct = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category_id: '',
    images: [],
    sku: ''
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setNewImage(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleAddImage = () => {
    if (newImage) {
      setImageFiles([...imageFiles, newImage]);
      setNewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start the spinner

    const productData = new FormData();
    for (let key in formData) {
      if (key === 'images') {
        imageFiles.forEach((file) => {
          productData.append('images', file);
        });
      } else {
        productData.append(key, formData[key]);
      }
    }

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.post('http://localhost:8000/api/products/', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        Popup("Product added successfully");
        setShowPopup(true);
        navigate('/vendor/products');
      } else {
        Popup(`Failed to add product: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        Popup(`Failed to add product: ${error.response.data.detail || error.response.statusText}`);
      } else {
        Popup(`Failed to add product: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false); // Stop the spinner
    }
  };

  const isFormValid = () => {
    return (
      formData.title &&
      formData.description &&
      formData.price &&
      formData.category_id &&
      formData.sku &&
      imageFiles.length > 0
    );
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" id="price" name="price" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="category_id">Category</label>
          <select id="category_id" name="category_id" onChange={handleChange}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="sku">SKU</label>
          <input type="text" id="sku" name="sku" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="images">Images</label>
          <input type="file" id="images" name="images" onChange={handleChange} multiple />
          {newImage && (
            <button type="button" className="add-image-button" onClick={handleAddImage}>
              + Add Image
            </button>
          )}
        </div>
        <div className="uploaded-images">
          {imageFiles.map((file, index) => (
            <div key={index} className="image-preview">
              <img src={URL.createObjectURL(file)} alt={`preview ${index}`} />
            </div>
          ))}
        </div>
        <button type="submit" className="submit-button" disabled={!isFormValid() || isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Product'}
        </button>
      </form>
        {showPopup && <Popup message="Product added successfully" closePopup={setShowPopup} />}
    </div>
  );
};

export default AddProduct;


