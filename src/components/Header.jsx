import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../features/toogle/toogleSlice';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import { BsFillBarChartFill } from 'react-icons/bs';
import { BsFillCalculatorFill } from 'react-icons/bs';
import { BsPencilSquare } from 'react-icons/bs';

export default function Navbar({ fixed }) {
  const dispatch = useDispatch();
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <div className='headerStudy'>
      <nav class='navbar navbar-expand-lg'>
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
        <button
          class='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span class='navbar-toggler-icon'></span>
        </button>

        <div
          class='collapse navbar-collapse'
          id='navbarSupportedContent'
        >
          <ul class='navbar-nav mr-auto'>
            <li class='nav-item'>
              <Link
                className='px-3 py-2 flex items-center text-xs font-bold leading-snug text-white hover:opacity-75'
                to='/report'
              >
                <BsFillBarChartFill />{' '}
                <span className='ml-2 heading__sub'>Report</span>
              </Link>
            </li>
            <li class='nav-item'>
              <Link
                className='px-3 py-2 flex items-center text-xs font-bold leading-snug text-white hover:opacity-75'
                to='result'
              >
                <BsFillCalculatorFill />{' '}
                <span className='ml-2 heading__sub'>Result</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
