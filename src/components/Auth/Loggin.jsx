import React from 'react';
import './auth.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { userActions } from './../../features/user/userSlice';
import {actions} from '../../features/toogle/toogleSlice'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import ModalSignIn from './ModalSignIn';
import ModalSignUp from './ModalSignUp';
import { useEffect } from 'react';

export default function Aurthentication() {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  useEffect(() => {}, []);
  const toogle = () => {
    setShow(!show);
  };
  return (
    <Dropdown
      isOpen={show}
      toggle={toogle}
    >
      <DropdownToggle id='toggle-btn-auth'>
        <div>
          <img
            id='avatar-user'
            src='user.jpg'
            alt=''
          />
        </div>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <div
            className=''
            onClick={() => {
              dispatch(actions.hideStudy());
              navigate('/Profile')
            }}
          >
            <span className='Profile-header'>Profile</span>
          </div>
        </DropdownItem>

        {!store.user.isLoggin && (
          <DropdownItem>
            <ModalSignIn />
          </DropdownItem>
        )}

        {!store.user.isLoggin && (
          <DropdownItem>
            <ModalSignUp />
          </DropdownItem>
        )}

        {store.user.isLoggin && (
          <DropdownItem>
            <span
              onClick={() => {
                dispatch(userActions.logOut());
                localStorage.removeItem('user');
                navigate('/');
              }}
            >
              Sign out
            </span>
          </DropdownItem>
        )}
        {/* {store.user.isLoggin && (
          <>
            <DropdownItem divider />
            <DropdownItem>Delete Account</DropdownItem>
          </>
        )} */}
      </DropdownMenu>
    </Dropdown>
  );
}
