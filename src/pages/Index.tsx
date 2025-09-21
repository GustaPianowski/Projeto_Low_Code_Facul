import React, { useState } from 'react';
import { LoginScreen } from '@/components/auth/LoginScreen';
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
  };

  if (!currentUser.type) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  switch (currentUser.type) {
    case 'patient':
      return <PatientPortal user={currentUser.data} />;
    case 'attendant':
      return <AttendantDashboard user={currentUser.data} />;
    case 'manager':
      return <ManagerDashboard user={currentUser.data} />;
    default:
      return <LoginScreen onLogin={handleLogin} />;
  }
};

export default Index;