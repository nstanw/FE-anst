import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export default function Aurthentication() {
  const store = useSelector((state) => state);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const toogle = () => {
    setShow(!show);
  };
  return (
    <Dropdown
      isOpen={show}
      toggle={toogle}
    >
      <DropdownToggle caret>Account</DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => navigate('/signin')}>Sign in</DropdownItem>
        <DropdownItem onClick={() => navigate('/signup')}>Sign up</DropdownItem>

        {store.authStatus.login && (
          <DropdownItem onClick={() => navigate('/sign-out')}>
            Sign out
          </DropdownItem>
        )}

        {store.authStatus.login && (
          <>
            <DropdownItem divider />
            <DropdownItem>Delete Account</DropdownItem>
          </>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
