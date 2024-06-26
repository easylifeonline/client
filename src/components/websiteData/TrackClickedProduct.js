import api from '../../helpers/api';

const trackClickedProduct = (productId) => {
  const data = { product_id: productId };
  api.post('clicked-products/', data).then(response => {
  }).catch(error => {
    console.error('Error tracking product click:', error);
  });
};

export default trackClickedProduct;
