const initialQuestions = [
    // Account Management
    { category: "Account Management", question: "How do I register for an account?", answer: "Click on the Sign-Up button on the homepage and fill in the required details." },
    { category: "Account Management", question: "How do I reset my password?", answer: "Click on the Forgot Password link on the login page and follow the instructions." },
    { category: "Account Management", question: "What should I do if I forget my username?", answer: "If you forget your username, please contact our support team for assistance." },
    { category: "Account Management", question: "How do I update my profile information?", answer: "You can update your profile information by visiting the Profile section in your account settings." },
    { category: "Account Management", question: "Can I change my email address?", answer: "Yes, you can change your email address by visiting the Profile section in your account settings." },
  
    // Support
    { category: "Support", question: "How do I contact customer support?", answer: "You can contact our support team via the Contact Us page." },
    { category: "Support", question: "How do I report a problem with the website?", answer: "You can report any problems with the website by contacting our support team via the Contact Us page." },
    { category: "Support", question: "What if I have a question not listed here?", answer: "If you have a question that is not listed here, please contact our support team via the Contact Us page." },
  
    // Payment Methods
    { category: "Payment Methods", question: "What payment methods do you accept?", answer: "We accept payments via Stripe, PayPal, and major credit cards." },
    { category: "Payment Methods", question: "How do I add a new payment method?", answer: "You can add a new payment method in the Billing section of your account settings." },
    { category: "Payment Methods", question: "Can I save my payment information for future purchases?", answer: "Yes, you can save your payment information securely for future purchases." },
  
    // Orders
    { category: "Orders", question: "How do I track my order?", answer: "You can track your order status in the Order History section of your profile." },
    { category: "Orders", question: "How do I cancel my order?", answer: "You can cancel your order within 24 hours of placing it by visiting the Order History section and selecting the cancel option." },
    { category: "Orders", question: "How do I know if my order was successful?", answer: "You will receive a confirmation email once your order has been successfully placed." },
    { category: "Orders", question: "What should I do if my order is delayed?", answer: "If your order is delayed, please contact our support team for assistance." },
  
    // Vendor
    { category: "Vendor", question: "How do I become a vendor?", answer: "To become a vendor, please reach out to our support team via the Contact Us page. We typically respond within 3-5 business days." },
    { category: "Vendor", question: "How can a vendor upload their product?", answer: "Vendors can upload their products through the Vendor Dashboard, which is accessible after logging in." },
    { category: "Vendor", question: "How can a vendor remove a product?", answer: "Vendors can remove products through the Vendor Dashboard by selecting the product and choosing the remove option." },
    { category: "Vendor", question: "How can vendors update their business information?", answer: "Vendors can update their business information through the Vendor Profile section in the Vendor Dashboard." },
    { category: "Vendor", question: "How do vendors manage their inventory?", answer: "Vendors can manage their inventory through the Inventory Management section in the Vendor Dashboard." },
  
    // Return Policy
    { category: "Return Policy", question: "What is the return policy?", answer: "Our return policy allows returns within 30 days of purchase. Please refer to our Return Policy page for more details." },
    { category: "Return Policy", question: "What if I receive a damaged product?", answer: "If you receive a damaged product, please contact our support team within 48 hours of delivery to arrange a replacement or refund." },
  
    // Shipping
    { category: "Shipping", question: "How long does shipping take?", answer: "Shipping times vary based on the destination. Typically, it takes 5-7 business days for domestic shipments and 10-15 business days for international shipments." },
    { category: "Shipping", question: "Can I change my shipping address after placing an order?", answer: "You can change your shipping address within 24 hours of placing an order by contacting our support team." },
    { category: "Shipping", question: "How can I update my shipping address?", answer: "You can update your shipping address by visiting the Address section in your account settings." },
  
    // Gift Cards
    { category: "Gift Cards", question: "Do you offer gift cards?", answer: "Yes, we offer gift cards that can be purchased through our website." },
  
    // Billing and Payment
    { category: "Billing and Payment", question: "Can I use multiple discount codes?", answer: "Only one discount code can be applied per order." },
  
    // Newsletter
    { category: "Newsletter", question: "How do I subscribe to the newsletter?", answer: "You can subscribe to our newsletter by entering your email address in the subscription box on the homepage." },
    { category: "Newsletter", question: "How do I unsubscribe from the newsletter?", answer: "You can unsubscribe from the newsletter by clicking the unsubscribe link at the bottom of any of our emails." },
  
    // Reviews
    { category: "Reviews", question: "How do I leave a product review?", answer: "You can leave a product review by visiting the product page and clicking on the Write a Review button." },
  
    // Privacy
    { category: "Privacy", question: "Is my personal information secure?", answer: "Yes, we take the security of your personal information very seriously. Please refer to our Privacy Policy for more details." },
    { category: "Privacy", question: "What is your privacy policy?", answer: "Our Privacy Policy can be viewed on the Privacy Policy page on our website." },
  
    // Cart
    { category: "Cart", question: "Can I save items in my cart for later?", answer: "Yes, you can save items in your cart for later by adding them to your wishlist." },
  
    // Wishlist
    { category: "Wishlist", question: "How do I create a wishlist?", answer: "You can create a wishlist by clicking the Add to Wishlist button on any product page." },
    { category: "Wishlist", question: "Can I share my wishlist with others?", answer: "Yes, you can share your wishlist with others by clicking the Share button on your wishlist page." }
  ];

export default initialQuestions;