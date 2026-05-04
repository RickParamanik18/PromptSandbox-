import React from 'react';
import { useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function App() {
  const { user } = useAuth();

  return (
    <>
      {user ? <Dashboard /> : <LoginPage />}
    </>
  );
}

export default App;
