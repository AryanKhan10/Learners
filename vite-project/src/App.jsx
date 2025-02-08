import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import LoginPage from './pages/Loginpage'
import SignupPage from './pages/SignupPage'
import ForgotPassword from './pages/ForgotPassword'
function App() {


  return (

    <div className="w-screen min-h-screen bg-gray-900 flex flex-col ">
      <NavBar/>  
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path='/forget-password' element={<ForgotPassword/>}/>
      </Routes>
    </div>


   
  )
}

export default App
