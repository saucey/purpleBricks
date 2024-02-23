// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import StartPage from './StartPage';
import WhatsReporting from './WhatsReporting';
import IncorrectInfo from './IncorrectInfo';
import WrongPrintedInfo from './WrongPrintedInfo';
import UserDetails from './UserDetails';
import ContactDetails from './ContactDetails';
import AnswerCheck from './AnswerCheck';
import WhatsWrongElectronics from './WhatsWrongElectronics';
import OtherInfo from './OtherInfo';
import BusShelterColour from './BusShelterColour';
import WhatsWrongBusShelter from './WhatsWrongBusShelter';
import WhatMaintenanceIssue from './WhatMaintenanceIssue';
import WhatMaintenanceIssue2 from './WhatMaintenanceIssue2';
import WhatDamage from './WhatDamage';
import WhatDamage2 from './WhatDamage2';
import WhatDamage3 from './WhatDamage3';
import WhatsWrongPanels from './WhatsWrongPanels';
import WhatsWrongPole from './WhatsWrongPole';
import ElectricProblem from './ElectricProblem';
import ElectricProblem2 from './ElectricProblem2';
import WhatParkAndRide from './WhatParkAndRide';
import WhatWrongParkAndRide from './WhatWrongParkAndRide';
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
          {/* Wrap WhatsReporting with AppLayoutPrimary */}
          {/* <Route path="/whats-reporting" element={<AppLayoutPrimary><WhatsReporting /></AppLayoutPrimary>} />
          <Route path="/incorrect-info" element={<AppLayoutPrimary><IncorrectInfo /></AppLayoutPrimary>} />
          <Route path="/wrong-printed-info" element={<AppLayoutPrimary><WrongPrintedInfo /></AppLayoutPrimary>} />
          <Route path="/user-details" element={<AppLayoutPrimary><UserDetails /></AppLayoutPrimary>} />
          <Route path="/contact-details" element={<AppLayoutPrimary><ContactDetails /></AppLayoutPrimary>} />
          <Route path="/answer-check" element={<AppLayoutPrimary><AnswerCheck /></AppLayoutPrimary>} />
          <Route path="/whats-wrong-electronics" element={<AppLayoutPrimary><WhatsWrongElectronics /></AppLayoutPrimary>} />
          <Route path="/other-info" element={<AppLayoutPrimary><OtherInfo /></AppLayoutPrimary>} />
          <Route path="/bus-shelter-colour" element={<AppLayoutPrimary><BusShelterColour /></AppLayoutPrimary>} />
          <Route path="/whats-wrong-bus-shelter" element={<AppLayoutPrimary><WhatsWrongBusShelter /></AppLayoutPrimary>} />
          <Route path="/what-maintenance-issue" element={<AppLayoutPrimary><WhatMaintenanceIssue /></AppLayoutPrimary>} />
          <Route path="/what-maintenance-issue2" element={<AppLayoutPrimary><WhatMaintenanceIssue2 /></AppLayoutPrimary>} />
          <Route path="/what-damage" element={<AppLayoutPrimary><WhatDamage /></AppLayoutPrimary>} />
          <Route path="/what-damage2" element={<AppLayoutPrimary><WhatDamage2 /></AppLayoutPrimary>} />
          <Route path="/what-damage3" element={<AppLayoutPrimary><WhatDamage3 /></AppLayoutPrimary>} />
          <Route path="/electrical-problem" element={<AppLayoutPrimary><ElectricProblem /></AppLayoutPrimary>} />
          <Route path="/electrical-problem2" element={<AppLayoutPrimary><ElectricProblem2 /></AppLayoutPrimary>} />
          <Route path="/whats-wrong-panels" element={<AppLayoutPrimary><WhatsWrongPanels /></AppLayoutPrimary>} />
          <Route path="/whats-wrong-pole" element={<AppLayoutPrimary><WhatsWrongPole /></AppLayoutPrimary>} />
          <Route path="/what-park-ride" element={<AppLayoutPrimary><WhatParkAndRide /></AppLayoutPrimary>} />
          <Route path="/whats-wrong-park-ride" element={<AppLayoutPrimary><WhatWrongParkAndRide /></AppLayoutPrimary>} /> */}
        </Routes>
        </Router>
    </FormDataProvider>
  </React.StrictMode>
);

reportWebVitals();
