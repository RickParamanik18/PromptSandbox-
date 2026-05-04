import React from 'react';

const SandboxViewer = ({ url }) => {
  return (
    <div className="sandbox-viewer glass-panel">
      <div className="sandbox-header">
        <div className="browser-controls">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <div className="url-bar">
          {url ? new URL(url).origin : 'about:blank'}
        </div>
      </div>
      <div className="iframe-container">
        {url ? (
          <iframe 
            src={url} 
            title="Sandbox Preview"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            className="sandbox-iframe animate-fade-in"
          />
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <h3>No Application Running</h3>
            <p>Tell the AI what you want to build to see it here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SandboxViewer;
