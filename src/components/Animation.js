import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Router,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Study from './Study/Study';
import Report from './Report/Report';
import WorkingStatus from './Result';
import Result from './Result';
import Status from './Status/Status';
import ApexChart from './Report/ApexChart';
import UploadAvatar from './User/UploadAvatar';
import FormAuth from './FormLoginLogOut/FormAuth';
import SignInForm from './FormLoginLogOut/SingInForm';
import SignUpForm from './FormLoginLogOut/SignUpForm';
import ModalSignUp from './Auth/ModalSignUp';
import ModalSignIn from './Auth/ModalSignIn';
import Authentication from './Auth/Loggin';

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
        {/* <Route
          path='/test'
          element={<ModalSignIn />}
        /> */}

        <Route
          path='/signin'
          element={<ModalSignIn />}
        />
        {/* <Route
          path='/sign-in'
          element={<ModalSignIn />}
        /> */}
        <Route
          path='/signup'
          element={<ModalSignUp />}
        />
        {/* <Route
          path='/sign-up'
          element={<ModalSignUp />}
        /> */}

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
