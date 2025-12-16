import Navbar from './Componets/Navbar';
import { Routes, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";
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
import NewsDetail from "./pages/NewsDetail";
import Word from './pages/Word';

const Homepage = lazy(() => import('./pages/Homepage'));
const Profile = lazy(() => import('./pages/Profile'));
const ReadingHistory = lazy(() => import('./pages/ReadingHistory'));
const Bookmarks = lazy(() => import('./pages/Bookmarks'));

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster />

      {/* This will grow to fill remaining height and push footer to bottom */}
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Homepage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/reading-history" element={<ReadingHistory />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/world" element={<Word />} />

              <Route element={<PreferenceProtectRoute />}>
                <Route path="/preferences" element={<Preferences />} />
              </Route>
            </Route>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Reg />} />
             <Route path="/news/:id" element={<NewsDetail />} />
             <Route path="/news/:type/:value" element={<NewsDetail />} />

          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
