import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/Loginpage";
import SignupPage from "./pages/SignupPage";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/MyProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Error from './pages/Error'
import Settings from "./components/Settings";
import Enrolled from "./components/Dashboard/Enrolled";
import Cart from "./components/Dashboard/Cart/Cart";
function App() {
  return (
    <div className="w-screen min-h-screen bg-gray-900 flex flex-col ">
      <NavBar />
      <div className="mt-20">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password/:id" element={<UpdatePassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
            }
          >
            <Route path="profile" element={<MyProfile />} />
            <Route path="enrolled-courses" element={<Enrolled />} />
            <Route path="cart" element={<Cart />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Error/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
