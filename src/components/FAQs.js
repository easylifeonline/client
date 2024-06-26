import React, { useState } from 'react';
import '../styles/views/FAQs.scss';

const initialQuestions = [
  { question: "How do I register for an account?", answer: "Click on the Sign-Up button on the homepage and fill in the required details." },
  { question: "How do I reset my password?", answer: "Click on the Forgot Password link on the login page and follow the instructions." },
  { question: "How do I contact customer support?", answer: "You can contact our support team via the Contact Us page." },
  { question: "What payment methods do you accept?", answer: "We accept payments via Stripe, PayPal, and major credit cards." },
  { question: "How do I track my order?", answer: "You can track your order status in the Order History section of your profile." },
  { question: "How do I become a vendor?", answer: "To become a vendor, please reach out to our support team via the Contact Us page. We typically respond within 3-5 business days." },
  { question: "How can a vendor upload their product?", answer: "Vendors can upload their products through the Vendor Dashboard, which is accessible after logging in." },
  { question: "How can a vendor remove a product?", answer: "Vendors can remove products through the Vendor Dashboard by selecting the product and choosing the remove option." },
  { question: "What is the return policy?", answer: "Our return policy allows returns within 30 days of purchase. Please refer to our Return Policy page for more details." },
  { question: "How long does shipping take?", answer: "Shipping times vary based on the destination. Typically, it takes 5-7 business days for domestic shipments and 10-15 business days for international shipments." },
  { question: "Can I change my shipping address after placing an order?", answer: "You can change your shipping address within 24 hours of placing an order by contacting our support team." },
  { question: "How do I cancel my order?", answer: "You can cancel your order within 24 hours of placing it by visiting the Order History section and selecting the cancel option." },
  { question: "What if I receive a damaged product?", answer: "If you receive a damaged product, please contact our support team within 48 hours of delivery to arrange a replacement or refund." },
  { question: "Do you offer gift cards?", answer: "Yes, we offer gift cards that can be purchased through our website." },
  { question: "Can I use multiple discount codes?", answer: "Only one discount code can be applied per order." },
  { question: "How do I subscribe to the newsletter?", answer: "You can subscribe to our newsletter by entering your email address in the subscription box on the homepage." },
  { question: "How do I unsubscribe from the newsletter?", answer: "You can unsubscribe from the newsletter by clicking the unsubscribe link at the bottom of any of our emails." },
  { question: "What should I do if I forget my username?", answer: "If you forget your username, please contact our support team for assistance." },
  { question: "How do I update my profile information?", answer: "You can update your profile information by visiting the Profile section in your account settings." },
  { question: "Can I change my email address?", answer: "Yes, you can change your email address by visiting the Profile section in your account settings." },
  { question: "How do I leave a product review?", answer: "You can leave a product review by visiting the product page and clicking on the Write a Review button." },
  { question: "How do I report a problem with the website?", answer: "You can report any problems with the website by contacting our support team via the Contact Us page." },
  { question: "Is my personal information secure?", answer: "Yes, we take the security of your personal information very seriously. Please refer to our Privacy Policy for more details." },
  { question: "What is your privacy policy?", answer: "Our Privacy Policy can be viewed on the Privacy Policy page on our website." },
  { question: "How do I know if my order was successful?", answer: "You will receive a confirmation email once your order has been successfully placed." },
  { question: "Can I save items in my cart for later?", answer: "Yes, you can save items in your cart for later by adding them to your wishlist." },
  { question: "How do I create a wishlist?", answer: "You can create a wishlist by clicking the Add to Wishlist button on any product page." },
  { question: "Can I share my wishlist with others?", answer: "Yes, you can share your wishlist with others by clicking the Share button on your wishlist page." },
  { question: "What if I have a question not listed here?", answer: "If you have a question that is not listed here, please contact our support team via the Contact Us page." },
  { question: "How can I update my shipping address?", answer: "You can update your shipping address by visiting the Address section in your account settings." },
  { question: "What should I do if my order is delayed?", answer: "If your order is delayed, please contact our support team for assistance." }
];

const FAQs = () => {
  const [visibleQuestions, setVisibleQuestions] = useState(initialQuestions.slice(0, 10));
  const [currentPage, setCurrentPage] = useState(1);

  const loadMoreQuestions = () => {
    const nextPage = currentPage + 1;
    const newQuestions = initialQuestions.slice(nextPage * 10 - 10, nextPage * 10);
    setVisibleQuestions([...visibleQuestions, ...newQuestions]);
    setCurrentPage(nextPage);
  };

  return (
    <div className="faqs-container">
      <h2>Frequently Asked Questions</h2>
      {visibleQuestions.map((faq, index) => (
        <div className="faq" key={index}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
      {visibleQuestions.length < initialQuestions.length && (
        <button onClick={loadMoreQuestions} className="load-more-btn">Load More</button>
      )}
    </div>
  );
};

export default FAQs;
