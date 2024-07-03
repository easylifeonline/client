import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../helpers/api';
import '../styles/views/ProductDetail.scss';
import { useCart } from '../contexts/CartContext';
import ProductByCategory from './ProductByCategory';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart, fetchCartSummary } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`products/${id}/`);
        setProduct(response.data);
        setSelectedImage(response.data.images[0]?.image || null);
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
    } else {
      console.error('Product is undefined');
    }
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.product.price) || 0; // Ensure price is a number
      return acc + price * item.quantity;
    }, 0).toFixed(2);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail">
          <div className="product-images">
            <div className="product-thumbnails">
              {product.images.map((img) => (
                <img
                  key={img.id}
                  src={img.image}
                  alt={product.title}
                  onClick={() => handleImageClick(img.image)}
                  className={selectedImage === img.image ? 'selected' : ''}
                />
              ))}
            </div>
            <div className="product-main-image">
              {selectedImage ? (
                <img src={selectedImage} alt={product.title} />
              ) : (
                <div className="product-image-placeholder">No Image Available</div>
              )}
            </div>
          </div>
          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: ${parseFloat(product.price).toFixed(2)}</p>
            <p className="product-sku">SKU: {product.sku}</p>
            <div className="product-quantity">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min="1"
                onChange={handleQuantityChange}
              />
            </div>
            <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
          </div>
        </div>
        <div className="cart-summary">
          <h2>Cart Summary</h2>
          {cartItems && cartItems.length > 0 ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price ($)</th>
                    <th>Quantity</th>
                    <th>Total ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.product.id}>
                      <td>{item.product.title}</td>
                      <td>{parseFloat(item.product.price).toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>{(parseFloat(item.product.price) * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="cart-total">
                <strong>Total:</strong> <strong>${calculateTotal()}</strong>
              </div>
            </>
          ) : (
            <p>No items in cart</p>
          )}
          <div className="view-cart-button-container">
            <button onClick={handleViewCart} className="view-cart-button">View Cart</button>
          </div>
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




// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import api from '../helpers/api';
// import '../styles/views/ProductDetail.scss';
// import { useCart } from '../contexts/CartContext';
// import ProductByCategory from './ProductByCategory';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { cartItems, addToCart, fetchCartSummary } = useCart();
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await api.get(`products/${id}/`);
//         setProduct(response.data);
//         console.log('Product:', response.data.images);
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//       }
//     };

//     fetchProduct();
//     fetchCartSummary();
//   }, [id, fetchCartSummary]);

//   const handleAddToCart = () => {
//     if (product) {
//       addToCart(product, quantity);
//     } else {
//       console.error('Product is undefined');
//     }
//   };

//   const handleViewCart = () => {
//     navigate('/cart');
//   };

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="product-detail-page">
//       <div className="product-detail-container">
//         <div className="product-detail">
//           <div className="product-image">
//             {product.image ? (
//               <img src={product.image} alt={product.title} />
//             ) : (
//               <div className="product-image-placeholder">No Image Available</div>
//             )}
//           </div>
//           <div className="product-info">
//             <h1 className="product-title">{product.title}</h1>
//             <p className="product-description">{product.description}</p>
//             <p className="product-price">Price: ${product.price}</p>
//             <p className="product-sku">SKU: {product.sku}</p>
//             <div className="product-quantity">
//               <label htmlFor="quantity">Quantity:</label>
//               <input
//                 type="number"
//                 id="quantity"
//                 value={quantity}
//                 min="1"
//                 onChange={(e) => setQuantity(parseInt(e.target.value))}
//               />
//             </div>
//             <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
//           </div>
//         </div>
//         <div className="cart-summary">
//           <h2>Cart Summary</h2>
//           {cartItems && cartItems.length > 0 ? (
//             <ul>
//               {cartItems.map((item) => (
//                 <li key={item.product.id}>
//                   {item.product.title} x {item.quantity}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No items in cart</p>
//           )}
//           <button onClick={handleViewCart} className="view-cart-button">View Cart</button>
//         </div>
//       </div>
//       <div className="related-products">
//         <h2>Related Products</h2>
//         <ProductByCategory category={product.category.name} />
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

