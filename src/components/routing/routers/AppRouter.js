// AppRouter.js

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
import ServiceRouter from "./ServiceRouter";
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

const AppRouter = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header height="70px" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services/*" element={<ServiceRouter />} />
          <Route path="/password_reset" element={<PasswordResetRequest />} /> 
          <Route path="/reset/:uidb64/:token" element={<PasswordResetConfirm />} />
            <Route path="*" element={<NotFound />} />

          {/* Use ProtectedRoute to wrap around components that require authentication */}
          <Route
            path="/home"
            element={
                <Home />
            }
          />

          <Route
            path="/contact"
            element={
                <Contact />
            }
          />

          <Route
            path="/contact-form"
            element={
                <ContactForm />
            }
          />

          <Route
            path="/vendor-contact-form"
            element={
                <VendorContactForm />
            }
          />

          <Route
            path="/vendor"
            element={
                <Vendor />
            }
          />

          <Route
            path="/admin/vendor-requests"
            element={
                <ViewVendorRequests />
            }
          />

          <Route
            path="/admin/add-category"
            element={
                <CategoryForm />
            }
          />

          <Route
            path="/view-categories"
            element={
                <ViewCategories />
            }
          />

          <Route
            path="/about"
            element={
                <About />
            }
          />

          <Route
            path="/faqs"
            element={
                <FAQs />
            }
          />

          <Route
            path="/terms"
            element={
                <TermsOfService />
            }
          />

          <Route
            path="/helpcenter"
            element={
                <HelpCenter />
            }
          />
          
          <Route
            path="/addresses"
            element={
              <ProtectedRoute>
                <UserAddresses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <UserProfile />
            } 
          />
          <Route
            path="/profile/update"
            element={
              <ProtectedRoute>
                <UpdateUserDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor/products"
            element={
                <ProductList />
            }
          />
          <Route
            path="/vendor/add-product"
            element={
                <AddProduct />
            }
          />
            <Route
                path="/vendor/inventory"
                element={
                    <InventoryManagement />
                }
            />
            <Route
                path="/admin/dashboard"
                element={
                    <AdminDashboard />
                }
            />
            <Route
                path="/products/:id"
                element={
                    <ProductDetail />
                }
            />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default AppRouter;