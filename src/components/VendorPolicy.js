import React, { useState, useEffect } from 'react';
import api from '../helpers/api';
import '../styles/views/VendorPolicy.scss';

const VendorPolicy = () => {
  const [policy, setPolicy] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await api.get('vendor-policies-guidelines/1/');
        setPolicy(response.data);
      } catch (error) {
        console.error('Error fetching policy:', error);
      }
    };

    fetchPolicy();
  }, []);

  const formatDescription = (description) => {
    return description.split('\n').map((item, index) => {
      if (item.startsWith('---')) return <hr key={index} />;
      if (item.startsWith('**')) return <strong key={index}>{item}</strong>;
      if (item.startsWith('-')) return <li key={index}>{item.substring(1).trim()}</li>;
      return <p key={index}>{item}</p>;
    });
  };

  return (
    <div className="vendor-policy-container">
      <h2>{policy.title}</h2>
      <div className="policy-description">{formatDescription(policy.description)}</div>
    </div>
  );
};

export default VendorPolicy;


