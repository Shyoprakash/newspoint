import Navbar from './Componets/Navbar';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import '@mantine/core/styles.css';
import Reg from './pages/Reg';
import { Toaster } from 'sonner';
import ProtectedRoutes from './Componets/ProtectedRoutes';
import PreferenceProtectRoute from './Componets/PreferenceProtectRoute';
import { lazy, Suspense } from 'react';
import LoadingSpinner from './Componets/LoadingSpinner';
import Footer from './Componets/Footer';
import About from './pages/AboutPage';
import NewsPage from './pages/NewsPage';
import Preferences from './pages/Preferences';

// 🆕 Lazy load ReadingHistory
const Homepage = lazy(() => import('./pages/Homepage'));
const Profile = lazy(() => import('./pages/Profile'));
const ReadingHistory = lazy(() => import('./pages/ReadingHistory')); // 🆕

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

            {/* 🆕 Route for Reading History */}
            <Route path="/reading-history" element={<ReadingHistory />} /> 

            <Route element={<PreferenceProtectRoute />}>
              <Route path="/preferences" element={<Preferences />} />
            </Route>
          </Route>

          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Reg />} />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
}

export default App;
