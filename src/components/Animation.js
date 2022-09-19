import { BrowserRouter, Routes, Route, useLocation, Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Study from './Study/Study';
import Report from './Report/Report';
import WorkingStatus from './Result';
import Result from './Result';
import Status from './Status/Status';
import ApexChart from './Report/ApexChart';

function Animation() {
  const location = useLocation();
  return (
    <AnimatePresence>
        <Routes
          location={location}
          key={location.pathname}
        >
          <Route
            path='/'
            element={<Study />}
          />
          <Route
            path='/status'
            element={<Status />}
          />
          <Route
            path='/report'
            element={<Report />}
          />
          <Route
            path='/result'
            element={<ApexChart/>}
          />
          <Route
            path='*'
            element={<h1>404</h1>}
          />
        </Routes>

    </AnimatePresence>
  );
}

export default Animation;
