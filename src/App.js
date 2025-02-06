import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ExpenseTracker from "./Expenses";
import Reports from "./Reports";
import Signup from "./Signup";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import { Box } from "@mui/material";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsofService from "./TermsofService";
import Aboutus from "./Aboutus";

const App = () => {
  const location = useLocation();

  // List of routes where Navbar should not appear
  const hideNavbarRoutes = ["/login", "/", "/privacypolicy", "/termsofservice"];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Conditionally render Navbar */}
      {!hideNavbarRoutes.includes(location.pathname.toLowerCase()) && <Navbar />}
      
      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Expenses" element={<ExpenseTracker />} />
          <Route path="/" element={<Signup />} />
          <Route path="/TermsofService" element={<TermsofService />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
