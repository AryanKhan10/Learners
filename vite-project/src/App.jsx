import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import LoginPage from './pages/Loginpage'
import SignupPage from './pages/SignupPage'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'
function App() {


  return (

    <div className="w-screen min-h-screen bg-gray-900 flex flex-col ">
      <NavBar/>  
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path='/forget-password' element={<ForgotPassword/>}/>
        <Route path='/verify-email' element={<VerifyEmail/>}/>
        <Route path='/reset-password/:id' element={<UpdatePassword/>}/>
      </Routes>
    </div>


   
  )
}

export default App
