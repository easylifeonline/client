import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../helpers/api';
import '../styles/views/ProductDetail.scss';
import { importedImages } from '../helpers/importImages';
import { useUser } from './UserContext';
import ProductByCategory from './ProductByCategory';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartSummary, setCartSummary] = useState([]);

  const getPathFromUrl = (url) => {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname.split('/').pop();
  };

  const fetchCartSummary = useCallback(async () => {
    if (user) {
      try {
        const response = await api.get('cart/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setCartSummary(response.data);
      } catch (error) {
        console.error('Error fetching cart summary:', error);
      }
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
      setCartSummary(localCart);
    }
  }, [user]);

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

  const handleAddToCart = async () => {
    if (user) {
      try {
        await api.post('cart/items/', { product_id: id, quantity }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        alert('Product added to cart');
        fetchCartSummary();
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    } else {
      let localCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
      const itemIndex = localCart.items.findIndex(item => item.product.id === product.id);

      if (itemIndex > -1) {
        localCart.items[itemIndex].quantity += quantity;
      } else {
        localCart.items.push({
          product: {
            id: product.id,
            title: product.title
          },
          quantity: quantity
        });
      }

      localStorage.setItem('cart', JSON.stringify(localCart));
      alert('Product added to cart');
      setCartSummary(localCart);
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
          {cartSummary.items && cartSummary.items.length > 0 ? (
            <ul>
              {cartSummary.items.map((item) => (
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
