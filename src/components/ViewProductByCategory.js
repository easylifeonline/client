import React from 'react';
import ProductByCategory from './ProductByCategory';
import { useParams } from 'react-router-dom';

const ViewProductByCategory = () => {
    const { category } = useParams();
    return <ProductByCategory category={category} />;
    };

export default ViewProductByCategory;