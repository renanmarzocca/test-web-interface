// Core
import React from "react";

// Libraries
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import LoginPage from "../pages/login";
import CustomersPage from "../pages/customers";
import CustomersSelectedPage from "../pages/selected_customers";
import CompaniesPage from "../pages/companies";

const isLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        {/* PROTECTED ROUTES*/}
        <Route
          path="/customers"
          element={isLoggedIn() ? <CustomersPage /> : <Navigate to="/" />}
        />
        <Route
        path="/customers/selected"
        element={isLoggedIn() ? <CustomersSelectedPage /> : <Navigate to="/" />}
        />
        <Route
        path="/companies"
        element={isLoggedIn() ? <CompaniesPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
