import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/app/theme';
import { AuthProvider } from '@/hooks/useAuth';
import { ToastProvider } from '@/hooks/useToast';
import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';
import Toaster from '@/components/Toaster';
import DatasetsOverviewPage from '@/pages/datasets/DatasetsOverviewPage';
import UploadPage from '@/pages/datasets/UploadPage';
import DashboardPage from '@/pages/analytics/DashboardPage';
import InsightsPage from '@/pages/analytics/InsightsPage';
import ForecastPage from '@/pages/forecast/ForecastPage';
import AdminPage from '@/pages/admin/AdminPage';
import DataTablePage from '@/pages/datasets/DataTablePage';
import ChatPage from '@/pages/analytics/ChatPage';
import AppstoreDashboardPage from '@/pages/analytics/AppstoreDashboardPage';
import LoginPage from '@/pages/login/LoginPage';
import RegisterPage from '@/pages/register/RegisterPage';
import './App.css';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Layout>
              <Toaster />
              <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={
                <ProtectedRoute><DatasetsOverviewPage /></ProtectedRoute>
              } />
              <Route path="/upload" element={
                <ProtectedRoute><UploadPage /></ProtectedRoute>
              } />
              <Route path="/dashboard/:id" element={
                <ProtectedRoute><DashboardPage /></ProtectedRoute>
              } />
              <Route path="/insights/:id" element={
                <ProtectedRoute><InsightsPage /></ProtectedRoute>
              } />
              <Route path="/forecast/:id" element={
                <ProtectedRoute><ForecastPage /></ProtectedRoute>
              } />
              <Route path="/data/:id" element={
                <ProtectedRoute><DataTablePage /></ProtectedRoute>
              } />
              <Route path="/chat/:id" element={
                <ProtectedRoute><ChatPage /></ProtectedRoute>
              } />
              <Route path="/analytics/:id" element={
                <ProtectedRoute><AppstoreDashboardPage /></ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute><AdminPage /></ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  </ThemeProvider>
  );
}
