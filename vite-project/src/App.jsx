import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
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
import AddCourse from "./components/Dashboard/AddCourse/AddCourse";
import { useSelector } from "react-redux";
import MyCourses from "./components/Dashboard/MyCourses";
import EditCourse from "./components/Dashboard/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CoursePage from "./pages/CoursePage";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/ViewCourse/VideoDetails";
import Instuctor from "./components/Dashboard/InstructorDashboard/Instuctor";
function App() {

  const {user} = useSelector(state=>state.profile)
  
  return (
    <div className="w-screen min-h-screen bg-gray-900 flex flex-col ">
      <NavBar />
      <div className="mt-16">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password/:id" element={<UpdatePassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/course/:courseId" element={<CoursePage />} />


          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
            }
          >
            <Route path="profile" element={<MyProfile />} />
            <Route path="settings" element={<Settings />} />

            {
              user?.accountType === "Student" && 
                  <>
                    <Route path="enrolled-courses" element={<Enrolled />} />
                    <Route path="cart" element={<Cart />} />
                  </>

            }
            {
              user?.accountType === "Instructor" && 
                  <>
                    <Route path="add-course" element={<AddCourse />} />
                    <Route path="instructor" element={<Instuctor />} />
                    <Route path="my-courses" element={<MyCourses/>} />
                    <Route path="edit-course/:courseId" element={<EditCourse/>} />
                  </>

            }
          </Route>

          <Route element={
            <ProtectedRoute>
              <ViewCourse />
            </ProtectedRoute>
            }
          >
            {
              user?.accountType === "Student" &&
                  <>
                    <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>} />
                  </>
            }
            </Route>

          <Route path="*" element={<Error/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
