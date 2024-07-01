import React, { useEffect, useState } from 'react';
import '../styles/views/PopularTopics.scss';
import api from '../helpers/api';

const PopularTopics = ({ setSelectedCategory }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchPopularTopics = async () => {
      const response = await api.get('help-center/popular-topics');
      setTopics(response.data);
    };
    fetchPopularTopics();
  }, []);

  return (
    <div className="popular-topics">
      <h2>Popular Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id} onClick={() => setSelectedCategory(topic.category)}>
            {topic.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularTopics;