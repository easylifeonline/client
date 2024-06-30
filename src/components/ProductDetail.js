import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../helpers/api';
import '../styles/views/ProductDetail.scss';
import { importedImages } from '../helpers/importImages';
import { useCart } from '../contexts/CartContext';
import ProductByCategory from './ProductByCategory';
import getPathFromUrl from '../helpers/getPathFromUrl';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart, fetchCartSummary } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`products/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
    fetchCartSummary();
  }, [id, fetchCartSummary]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert('Product added to cart');
    } else {
      console.error('Product is undefined');
    }
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail">
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
            <div className="product-quantity">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>
            <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
          </div>
        </div>
        <div className="cart-summary">
          <h2>Cart Summary</h2>
          {cartItems && cartItems.length > 0 ? (
            <ul>
              {cartItems.map((item) => (
                <li key={item.product.id}>
                  {item.product.title} x {item.quantity}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in cart</p>
          )}
          <button onClick={handleViewCart} className="view-cart-button">View Cart</button>
        </div>
      </div>
      <div className="related-products">
        <h2>Related Products</h2>
        <ProductByCategory category={product.category.name} />
      </div>
    </div>
  );
};

export default ProductDetail;

