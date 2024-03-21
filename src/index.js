// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import StartPage from './StartPage';
import ReportingComplete from './ReportingComplete';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayoutPrimary from './layouts/primary'; // Assuming you have an AppLayoutPrimary component defined
import AppLayoutSecondary from './layouts/secondary'; // Assuming you have an AppLayoutPrimary component defined
import { FormDataProvider } from './globalState/FormDataContext';
import ReportingForm from './ReportingForm';
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <FormDataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayoutSecondary><StartPage /></AppLayoutSecondary>} />
          <Route path="/reporting" element={<AppLayoutPrimary><ReportingForm /></AppLayoutPrimary>} />
          <Route path="/reporting-complete" element={<ReportingComplete />} />
        </Routes>
        </Router>
    </FormDataProvider>
  </React.StrictMode>
);

reportWebVitals();
