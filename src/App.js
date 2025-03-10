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
import SplitExpenses from "./ManualSplit";
import SplitBill from "./BillSplit";
import ForgotPassword from "./ForgotPassword";


const App = () => {
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/", "/forgotpassword"];
const hideFooterRoutes = ["/login", "/", "/forgotpassword"];


  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!hideNavbarRoutes.includes(location.pathname.toLowerCase()) && <Navbar />}
      
      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Expenses" element={<ExpenseTracker />} />
          <Route path="/" element={<Signup />} />
          <Route path="/TermsofService" element={<TermsofService />} />
          <Route path="/chatbot" element={<Reports />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/ManualSplit" element={<SplitExpenses />} />
          <Route path="/BillSplit" element={<SplitBill />} />
        </Routes>
      </Box>

      {!hideFooterRoutes.includes(location.pathname.toLowerCase()) && <Footer />}
    </Box>
  );
};

export default App;
