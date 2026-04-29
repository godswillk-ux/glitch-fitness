import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { UserProvider } from '@/context/UserContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { OurStory } from '@/pages/OurStory';
import { Shop } from '@/pages/Shop';
import { Categories } from '@/pages/Categories';
import { Dashboard } from '@/pages/Dashboard';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <UserProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/our-story" element={<OurStory />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/wishlist" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminPanel />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Layout>
          </Router>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
