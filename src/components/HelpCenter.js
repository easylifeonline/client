import React, { useState, useEffect } from 'react';
import '../styles/views/HelpCenter.scss';
import SearchBar from './SearchBar';
import PopularTopics from './PopularTopics';
import CategoryList from './CategoryList';
import Contact from './Contact';
import Breadcrumbs from './Breadcrumbs';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [articles, setArticles] = useState([]);

  const dummyArticles = [
    {
      id: 1,
      title: "How to create an account",
      category: "Account",
      content: "To create an account, go to the register page and fill in the required details..."
    },
    {
      id: 2,
      title: "How to reset your password",
      category: "Account",
      content: "To reset your password, click on the 'Forgot Password' link on the login page..."
    },
    {
      id: 3,
      title: "How to place an order",
      category: "Orders",
      content: "To place an order, browse the products, add them to your cart, and proceed to checkout..."
    },
    {
      id: 4,
      title: "How to track your order",
      category: "Orders",
      content: "To track your order, go to your account page and click on 'Track Order'..."
    },
    {
      id: 5,
      title: "How to contact support",
      category: "Support",
      content: "To contact support, go to the Contact Us page and fill in the form..."
    }
  ];

  const dummyCategories = [
    { id: 1, name: "Account" },
    { id: 2, name: "Orders" },
    { id: 3, name: "Support" },
  ];

  useEffect(() => {
    // Simulate fetching articles based on selected category or search query
    const fetchArticles = () => {
      let filteredArticles = dummyArticles;

      if (searchQuery) {
        filteredArticles = filteredArticles.filter(article =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.content.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedCategory) {
        filteredArticles = filteredArticles.filter(article =>
          article.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      setArticles(filteredArticles);
    };

    fetchArticles();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="help-center">
      <Breadcrumbs category={selectedCategory} />
      <SearchBar setSearchQuery={setSearchQuery} />
      <PopularTopics setSelectedCategory={setSelectedCategory} />
      <CategoryList setSelectedCategory={setSelectedCategory} />
      {/* Simulating the FAQ component with articles */}
      <div className="faq">
        {articles.map(article => (
          <div key={article.id} className="faq-item">
            <h3>{article.title}</h3>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
      <Contact />
    </div>
  );
};

export default HelpCenter;


// import React, { useState, useEffect } from 'react';
// import '../styles/views/HelpCenter.scss';
// import SearchBar from './SearchBar';
// import PopularTopics from './PopularTopics';
// import CategoryList from './CategoryList';
// import Contact from './Contact';
// import Breadcrumbs from './Breadcrumbs';
// import api from '../helpers/api';

// const HelpCenter = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [articles, setArticles] = useState([]);

//   useEffect(() => {
//     // Fetch articles based on selected category or search query
//     const fetchArticles = async () => {
//       let response;
//       if (searchQuery) {
//         response = await api.get('help-articles/search/', {
//           params: { query: searchQuery },
//         });
//       } else if (selectedCategory) {
//         response = await api.get('help-articles/by_category/', {
//           params: { category_id: selectedCategory },
//         });
//       } else {
//         response = await api.get('help-articles/');
//       }
//       setArticles(response.data);
//     };
//     fetchArticles();
//   }, [selectedCategory, searchQuery]);

//   return (
//     <div className="help-center">
//       <Breadcrumbs category={selectedCategory} />
//       <SearchBar setSearchQuery={setSearchQuery} />
//       <PopularTopics setSelectedCategory={setSelectedCategory} />
//       <CategoryList setSelectedCategory={setSelectedCategory} />
//       {/* <FAQ articles={articles} /> */}
//       <Contact />
//     </div>
//   );
// };

// export default HelpCenter;
