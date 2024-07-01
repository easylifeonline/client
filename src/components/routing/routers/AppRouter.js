import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../../HomePage";
import Header from "../../Header";
import Register from "../../Register";
import Login from "../../Login";
import UserAddresses from "../../UserAddresses";
import UserProfile from "../../UserProfile";
import UpdateUserDetail from "../../UpdateUserDetail";
import { UserProvider } from '../../UserContext';
import ProtectedRoute from "../../ProtectedRoute"; 
import Home from "../../Home";
import PasswordResetRequest from "../../PasswordResetRequest";
import PasswordResetConfirm from "../../PasswordResetConfirm";
import NotFound from "../../NotFound";
import ProductList from "../../ProductList";
import AddProduct from "../../AddProduct";
import InventoryManagement from "../../InventoryManagement";
import AdminDashboard from "../../AdminDashboard";
import ProductDetail from "../../ProductDetail";
import Contact from "../../Contact";
import ContactForm from "../../ContactForm";
import VendorContactForm from "../../VendorContactForm";
import About from "../../About";
import FAQs from "../../FAQs";
import TermsOfService from "../../TermsOfService";
import HelpCenter from "../../HelpCenter";
import Vendor from "../../Vendor";
import ViewVendorRequests from "../../ViewVendorRequests";
import CategoryForm from "../../CategoryForm";
import ViewCategories from "../../ViewCategories";
import UpdateProduct from "../../UpdateProduct";
import ShoppingCart from '../../ShoppingCart';
import Checkout from '../../Checkout';
import OrderSummary from '../../OrderSummary';
import ViewProductByCategory from "../../ViewProductByCategory";
import GeneralHeader from "../../HeaderGeneral";
import OurStory from "../../OurStory";
import Careers from "../../Careers";
import Press from "../../Press";
import ProductListAll from "../../ProductListAll";
import AdminVendorPolicies from "../../AdminVendorPolicies";
import VendorPolicy from "../../VendorPolicy";
import OurServices from "../../OurServices"; 
import Footer from "../../Footer";
import ScrollToTop from "../../ScrollToTop"; 

const AppRouter = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header height="70px" />
        <OurServices />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/view-products/:category" element={<ViewProductByCategory />} />
          <Route path="/password_reset" element={<PasswordResetRequest />} /> 
          <Route path="/reset/:uidb64/:token" element={<PasswordResetConfirm />} />
          <Route path="/about-us/our-story" element={<OurStory />} />
          <Route path="/about-us/careers" element={<Careers />} />
          <Route path="/about-us/press" element={<Press />} />
          <Route path="/admin/vendor-policies" element={<AdminVendorPolicies />} />
          <Route path="/vendor-policies-guidelines" element={<VendorPolicy />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<ProductListAll />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-summary/:orderId" element={<OrderSummary />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-form" element={<ContactForm />} />
          <Route path="/vendor-contact-form" element={<VendorContactForm />} />
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/admin/vendor-requests" element={<ViewVendorRequests />} />
          <Route path="/admin/add-category" element={<CategoryForm />} />
          <Route path="/view-categories" element={<ViewCategories />} />
          <Route path="/update-product/:productId" element={<UpdateProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/helpcenter" element={<HelpCenter />} />
          <Route path="/addresses" element={<ProtectedRoute><UserAddresses /></ProtectedRoute>} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profile/update" element={<ProtectedRoute><UpdateUserDetail /></ProtectedRoute>} />
          <Route path="/vendor/products" element={<ProductList />} />
          <Route path="/vendor/add-product" element={<AddProduct />} />
          <Route path="/vendor/inventory" element={<InventoryManagement />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserProvider>
  );
};

export default AppRouter;