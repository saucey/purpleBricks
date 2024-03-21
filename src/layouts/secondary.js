// AppLayout.js
import React from 'react';
import { Link } from 'react-router-dom';

// Define your AppLayout component as a function component
const AppLayoutSecondary = ({ children }) => {
  return (
    <main className="wmnds-container wmnds-container--main">
      <nav aria-label="Breadcrumb" class="wmnds-breadcrumb">
        <ol class="wmnds-breadcrumb__list">
          <li class="wmnds-breadcrumb__list-item">
            <a class="wmnds-breadcrumb__link" href="https://www.tfwm.org.uk/">Home</a>
          </li>
          <li class="wmnds-breadcrumb__list-item">
            <a class="wmnds-breadcrumb__link" href="https://www.tfwm.org.uk/get-help/">Get help</a>
          </li>
          <li class="wmnds-breadcrumb__list-item">
            <a href="#" class="wmnds-breadcrumb__link wmnds-breadcrumb__link--current" aria-current="page">Report a problem with a bus stop or park and ride</a>
          </li>
        </ol>
      </nav>
      <div className="wmnds-grid wmnds-p-t-lg">
          {/* Render children components */}
          {children}
      </div>
    </main>
  );
};

export default AppLayoutSecondary;
