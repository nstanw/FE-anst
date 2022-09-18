import { BrowserRouter, Routes, Route, useLocation, Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Study from './Study';
import Report from './Report';
import WorkingStatus from './Result';
import Result from './Result';

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
            path='/report'
            element={<Report />}
          />
          <Route
            path='/result'
            element={<Result/>}
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
