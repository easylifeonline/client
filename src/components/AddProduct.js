import React, { useState, useEffect } from 'react';
import api from "../helpers/api";
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import '../styles/views/AddProduct.scss';
import Popup from './Popup'; 

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
  const [popupMessage, setPopupMessage] = useState('');
  const [previewPopup, setPreviewPopup] = useState(false);
  const [descriptionLength, setDescriptionLength] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('categories/');
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
      if (name === 'description') {
        setDescriptionLength(value.length);
      }
    }
  };

  const handleAddImage = () => {
    if (newImage) {
      setImageFiles(prevImages => [...prevImages, newImage]);
      setNewImage(null);
    }
  };

  const handleRemoveImage = (index) => {
    setImageFiles(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const productData = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'images') {
        productData.append(key, formData[key]);
      }
    });
    imageFiles.forEach(file => productData.append('uploaded_images', file));

    try {
      const token = localStorage.getItem('access_token');
      const response = await api.post('products/', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      setIsSubmitting(false);
      if (response.status === 201) {
        setPopupMessage("Product added successfully");
        setShowPopup(true);
        setTimeout(() => navigate('/vendor/products'), 1500);
      } else {
        throw new Error(`Failed to add product: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setPopupMessage(`Failed to add product: ${error.message}`);
      setShowPopup(true);
    }
  };

  const isFormValid = () => (
    formData.title &&
    formData.description &&
    formData.description.length > 100 &&
    formData.price &&
    formData.category_id &&
    formData.sku &&
    imageFiles.length > 0
  );

  const closePopup = () => setShowPopup(false);

  const openPreviewPopup = () => setPreviewPopup(true);

  const closePreviewPopup = () => setPreviewPopup(false);

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        {/* Form Fields */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
          <div className="description-info">
            <span>{descriptionLength} characters</span>
            <span>100 characters are required</span>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="category_id">Category</label>
          <select id="category_id" name="category_id" value={formData.category_id} onChange={handleChange}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="sku">SKU</label>
          <input type="text" id="sku" name="sku" value={formData.sku} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="images">Images</label>
          <input type="file" id="images" name="images" onChange={handleChange} multiple />
          {newImage && (
            <button type="button" className="add-image-button" onClick={handleAddImage}>
              + Add Image
            </button>
          )}
          <div className="uploaded-images">
            {imageFiles.map((file, index) => (
              <div key={index} className="image-preview">
                <img src={URL.createObjectURL(file)} alt={`preview ${index}`} />
                <button type="button" className="remove-image-button" onClick={() => handleRemoveImage(index)}>X</button>
              </div>
            ))}
          </div>
        </div>
        <div className="form-buttons">
          <button type="button" className="cancel-button" onClick={() => navigate('/vendor/products')}>
            Cancel
          </button>
          <button type="button" className="preview-button" onClick={openPreviewPopup} disabled={!isFormValid()}>
            Preview
          </button>
          <button type="submit" className="submit-button" disabled={!isFormValid() || isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </form>
      {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
      {previewPopup && (
        <div className="preview-popup">
          <h3>Product Preview</h3>
          <p><strong>Title:</strong> {formData.title}</p>
          <p><strong>Description:</strong> {formData.description}</p>
          <p><strong>Price:</strong> {formData.price}</p>
          <p><strong>Category:</strong> {categories.find(cat => cat.id === formData.category_id)?.name}</p>
          <p><strong>SKU:</strong> {formData.sku}</p>
          <div className="preview-images">
            {imageFiles.map((file, index) => (
              <div key={index} className="image-preview">
                <img src={URL.createObjectURL(file)} alt={`preview ${index}`} />
              </div>
            ))}
          </div>
          <div className="preview-buttons">
            <button onClick={closePreviewPopup}>Continue Editing</button>
            <button onClick={handleSubmit}>Create Product</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;

