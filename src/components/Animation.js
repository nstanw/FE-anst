import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Router,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Study from './Study/Study';
import Status from './Status/Status';
import ApexChart from './Report/ApexChart';
import ModalSignUp from './Auth/ModalSignUp';
import ModalSignIn from './Auth/ModalSignIn';
import Authentication from './Auth/Loggin';
import Profile from './Report/Profile';



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
          path='/signin'
          element={<ModalSignIn />}
        />

        <Route
          path='/signup'
          element={<ModalSignUp />}
        />

        <Route
          path='/status'
          element={<Status />}
        />
        <Route
          path='/Profile'
          element={<Profile />}
        />
        <Route
          path='/result'
          element={<ApexChart />}
        />
        <Route
          path='/authentication'
          element={<Authentication />}
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
