import React from 'react'
import Navbar from './Componets/Navbar'
import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import '@mantine/core/styles.css';
function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App