import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
function App() {


  return (

    <div className="w-screen min-h-screen bg-gray-900 flex flex-col ">
      <NavBar/>  
      <Routes>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </div>


   
  )
}

export default App
