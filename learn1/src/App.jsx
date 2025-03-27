//import React, { useEffect } from 'react'
import Navbar from './Componets/Navbar'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import '@mantine/core/styles.css';
import Reg from './pages/Reg';
import { useSelector, useDispatch } from 'react-redux';
import Preferences from './pages/Preferences';
import { Toaster } from 'sonner';
import ProtectedRoutes from './Componets/ProtectedRoutes';
import { lazy, Suspense } from 'react';
import LoadingSpinner from './Componets/LoadingSpinner';
import PreferenceProtectRoute from './Componets/PreferenceProtectRoute';
const Homepage = lazy(() => import('./pages/Homepage'))
const Profile = lazy(() => import('./pages/Profile'))
import Footer from './Componets/Footer';
import About from './pages/AboutPage';
import News from '../../Backend/model/News';
 import NewsPage from './pages/NewsPage';


function App() {

  return (
    <div>
      <Navbar />

      <Toaster />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/news" element={<NewsPage />} />
            <Route element={<PreferenceProtectRoute />} > 
            <Route path="/preferences" element={<Preferences />} /> 
            </Route>

          </Route>

          <Route path='/about' element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Reg />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

export default App

