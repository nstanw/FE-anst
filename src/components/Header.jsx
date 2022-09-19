import React from 'react';
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
      <nav className='relative flex flex-wrap items-center justify-between px-2 py-2'>
        <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
          <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
            <Link
              className='text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white'
              to='/'
            >
            <span
            onClick={
              ()=> dispatch(actions.reset())
            }>bee Study</span>
            </Link>
            <button
              className='text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <BsFillMenuButtonWideFill />
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center' +
              (navbarOpen ? ' flex' : ' hidden')
            }
            id='example-navbar-danger'
          >
            <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
              <li className='nav-item'>
                <Link
                  className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                  to='/report'
                >
                  <BsFillBarChartFill /> <span className='ml-2'>Report</span>
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className='px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75'
                  to='result'
                >
                  <BsFillCalculatorFill /> <span className='ml-2'> result</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
