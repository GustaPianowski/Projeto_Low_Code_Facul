import React, { useState } from 'react';
import { LoginScreen } from '@/components/auth/LoginScreen';
import { RegistrationScreen } from '@/components/auth/RegistrationScreen';
import { AttendantDashboard } from '@/components/attendant/AttendantDashboard';
import { ManagerDashboard } from '@/components/manager/ManagerDashboard';
import { PatientPortal } from '@/components/patient/PatientPortal';

const Index = () => {
  const [currentUser, setCurrentUser] = useState<{
    type: 'patient' | 'attendant' | 'manager' | null;
    data: any;
  }>({
    type: null,
    data: null
  });
  const [showRegistration, setShowRegistration] = useState(true);

  const handleLogin = (userType: 'patient' | 'attendant' | 'manager', userData: any) => {
    setCurrentUser({
      type: userType,
      data: userData
    });
  };

  const handleLogout = () => {
    setCurrentUser({
      type: null,
      data: null
    });
    setShowRegistration(false);
  };

  const handleRegistrationComplete = (userData: any) => {
    setCurrentUser({
      type: 'patient',
      data: userData
    });
    setShowRegistration(false);
  };

  const handleShowRegistration = () => {
    setShowRegistration(true);
  };

  const handleBackToLogin = () => {
    setShowRegistration(false);
  };

  // Cadastro é a primeira tela, login aparece quando solicitado
  if (!currentUser.type) {
    if (showRegistration) {
      return (
        <RegistrationScreen 
          onRegistrationComplete={handleRegistrationComplete}
          onBackToLogin={handleBackToLogin}
        />
      );
    }
    // Tela de login aparece quando usuário clica em "Voltar ao Login"
    return <LoginScreen onLogin={handleLogin} onShowRegistration={handleShowRegistration} />;
  }

  switch (currentUser.type) {
    case 'patient':
      return <PatientPortal user={currentUser.data} onLogout={handleLogout} />;
    case 'attendant':
      return <AttendantDashboard user={currentUser.data} onLogout={handleLogout} />;
    case 'manager':
      return <ManagerDashboard user={currentUser.data} onLogout={handleLogout} />;
    default:
      return <LoginScreen onLogin={handleLogin} />;
  }
};

export default Index;