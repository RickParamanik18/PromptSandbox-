import React, { useState } from 'react';
import ChatPanel from '../components/ChatPanel';
import SandboxViewer from '../components/SandboxViewer';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [sandboxUrl, setSandboxUrl] = useState('');

  return (
    <div className="dashboard-container">
      <header className="dashboard-header glass-panel">
        <div className="logo-area">
          <div className="logo-icon">✨</div>
          <span className="logo-text">AI Sandbox</span>
        </div>
        <div className="user-area">
          <span className="user-greeting">Welcome, {user?.username}</span>
          <button className="btn-logout" onClick={logout}>Sign Out</button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="split-pane">
          <div className="pane left-pane">
            <ChatPanel onNewSandboxUrl={setSandboxUrl} />
          </div>
          <div className="pane right-pane">
            <SandboxViewer url={sandboxUrl} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
