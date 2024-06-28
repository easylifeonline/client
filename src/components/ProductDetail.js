import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from "../helpers/api"
import '../styles/views/ProductDetail.scss';
import { importedImages } from '../helpers/importImages'; 

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);


  const getPathFromUrl = (url) => {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname.split('/').pop();
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`products/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-image">
        {product.image ? (
          <img src={importedImages[getPathFromUrl(product.image)]} alt={product.title} />
        ) : (
          <div className="product-image-placeholder">No Image Available</div>
        )}
      </div>
      <div className="product-info">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Price: ${product.price}</p>
        <p className="product-sku">SKU: {product.sku}</p>
      </div>
    </div>
  );
};

export default ProductDetail;