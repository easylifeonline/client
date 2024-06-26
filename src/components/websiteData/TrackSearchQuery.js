import api from '../../helpers/api';

const TrackSearchQuery = (query) => {
  const data = { query };
  api.post('search-queries/', data).then(response => {
  }).catch(error => {
    console.error('Error tracking search query:', error);
  });
};

export default TrackSearchQuery;
