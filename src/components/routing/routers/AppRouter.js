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
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
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
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default AppRouter;