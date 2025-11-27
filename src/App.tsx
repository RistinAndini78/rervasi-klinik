import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { QueueStatusPage } from './components/QueueStatusPage';
import { ReservationFormPage } from './components/ReservationFormPage';
import { AboutPage } from './components/AboutPage';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { DoctorManagement } from './components/admin/DoctorManagement';
import { ServiceManagement } from './components/admin/ServiceManagement';
import { ReservationManagement } from './components/admin/ReservationManagement';

type Page =
  | 'landing'
  | 'queue'
  | 'reservation'
  | 'about'
  | 'admin-login'
  | 'admin-dashboard'
  | 'admin-doctors'
  | 'admin-services'
  | 'admin-reservations';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setCurrentPage('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'queue':
        return <QueueStatusPage onNavigate={setCurrentPage} />;
      case 'reservation':
        return <ReservationFormPage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;
      case 'admin-login':
        return <AdminLogin onLogin={handleAdminLogin} onNavigate={setCurrentPage} />;
      case 'admin-dashboard':
        return isAdminLoggedIn ? (
          <AdminDashboard onNavigate={setCurrentPage} onLogout={handleAdminLogout} />
        ) : (
          <AdminLogin onLogin={handleAdminLogin} onNavigate={setCurrentPage} />
        );
      case 'admin-doctors':
        return isAdminLoggedIn ? (
          <DoctorManagement onNavigate={setCurrentPage} onLogout={handleAdminLogout} />
        ) : (
          <AdminLogin onLogin={handleAdminLogin} onNavigate={setCurrentPage} />
        );
      case 'admin-services':
        return isAdminLoggedIn ? (
          <ServiceManagement onNavigate={setCurrentPage} onLogout={handleAdminLogout} />
        ) : (
          <AdminLogin onLogin={handleAdminLogin} onNavigate={setCurrentPage} />
        );
      case 'admin-reservations':
        return isAdminLoggedIn ? (
          <ReservationManagement onNavigate={setCurrentPage} onLogout={handleAdminLogout} />
        ) : (
          <AdminLogin onLogin={handleAdminLogin} onNavigate={setCurrentPage} />
        );
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {renderPage()}
    </div>
  );
}
