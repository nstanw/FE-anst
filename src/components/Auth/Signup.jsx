import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import './auth.css';
import ModalSignUp from './ModalSignUp';

const SignupForm = () => {
  return (
    <div className=''>
        <ModalSignUp />
    </div>
  );
};
export default SignupForm;
