import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../features/toogle/toogleSlice';
import { BsFillBarChartFill } from 'react-icons/bs';
import { BsFillCalculatorFill } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import Aurthentication from './Auth/Loggin';

export default function Navbar({ fixed }) {
  const dispatch = useDispatch();
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <div className='headerStudy'>
      <nav className=''>
        <div>
          <Link to='/'>
            <span
              className='heading'
              onClick={() => dispatch(actions.reset())}
            >
              BEE STUDY
            </span>
          </Link>
        </div>
        <div className='container-item'>
          <div className='nav-item'>
            <Link
              className='px-3 py-2 flex items-center text-xs font-bold leading-snug text-white hover:opacity-75'
              to='/Profile'
            >
              <span className='ml-2 heading__sub'>Profile</span>
            </Link>
          </div>
          <div className='nav-item'>
            <div className='heading__sub heading-user'>
              <Aurthentication />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
