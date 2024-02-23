// AppLayout.js
import React from 'react';

// Define your AppLayout component as a function component
const AppLayoutSecondary = ({ children }) => {
  return (
    <main className="wmnds-container wmnds-container--main">
      <div className="wmnds-grid">
          {/* Render children components */}
          {children}
      </div>
    </main>
  );
};

export default AppLayoutSecondary;
