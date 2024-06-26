import { useEffect } from 'react';
import api from "../../helpers/api"

const TrackVisit = () => {
  useEffect(() => {
    api.post('visits/').then(response => {
      console.log('Visit count:', response.data.count);
    }).catch(error => {
      console.error('Error tracking visit:', error);
    });
  }, []);

  return null;
};

export default TrackVisit;
