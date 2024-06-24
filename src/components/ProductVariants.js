import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProductVariants.scss';

const ProductVariants = ({ productId }) => {
  const [variants, setVariants] = useState([]);
  const [variantName, setVariantName] = useState('');
  const [variantValue, setVariantValue] = useState('');

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/variants/?product=${productId}`);
        setVariants(response.data);
      } catch (error) {
        console.error("Error fetching variants:", error);
      }
    };

    fetchVariants();
  }, [productId]);

  const handleAddVariant = async () => {
    try {
      await axios.post('http://localhost:8000/api/variants/', {
        product: productId,
        variant_name: variantName,
        variant_value: variantValue
      });
      alert("Variant added successfully");
    } catch (error) {
      console.error("Error adding variant:", error);
      alert("Failed to ad variant");
    }
  };

  return (
    <div className="product-variants">
      <h2>Product Variants</h2>
      <div className="variant-list">
        {variants.map((variant) => (
          <div key={variant.id} className="variant-item">
            <p>{variant.variant_name}: {variant.variant_value}</p>
          </div>
        ))}
      </div>
      <div className="add-variant">
        <label htmlFor="variantName">Variant Name</label>
        <input type="text" id="variantName" value={variantName} onChange={(e) => setVariantName(e.target.value)} />
        <label htmlFor="variantValue">Variant Value</label>
        <input type="text" id="variantValue" value={variantValue} onChange={(e) => setVariantValue(e.target.value)} />
        <button onClick={handleAddVariant}>Add Variant</button>
      </div>
    </div>
  );
};

export default ProductVariants;
