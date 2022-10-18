import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './auth.css';
import axios from 'axios';
import UserApi from '../../util/api/UserApi';
import HOST from '../../util/HOST';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './../../features/toogle/authStatus';
import { PREFIX } from '../../util/fetchData';
import ModalSignIn from './ModalSignIn';
import { userActions } from './../../features/user/userSlice';

function ModalSignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(false);
  const store = useSelector((state) => state);
  const formik = useFormik({
    initialValues: {
      fullname: '',
      password: '',
      email: '',
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
        .min(5, 'Must be 5 characters or less')
        .required('Required'),
      password: Yup.string()
        .min(5, 'Must be 5 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),

    onSubmit: async (values) => {
      const data = {
        email: values.email,
        password: values.password,
        fullname: values.fullname,
      };

      const url = PREFIX + '/signup';
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      const Respose = await axios.post(url, data, config);
      console.log(Respose.data);

      const user = await Respose.data;
      localStorage.setItem('user', JSON.stringify(user));
      if (Respose.data.email) {
        return setErrors(!errors);
      }

      if (Respose.data.status) {
        console.log(Respose.data.token);
        dispatch(actions.openSignUp());
        dispatch(
          userActions.logIn({
            isLoggin: true,
            token: Respose.data.token,
            users: Respose.data.user
          })
        );
        navigate('/');
        return Respose.data;

      }

      return Respose.data;

    },
  });
  return (
    <>
      <div onClick={() => dispatch(actions.openSignUp())}>
        <span>Sign Up</span>
      </div>
      <div>
        <Modal
          isOpen={store.authStatus.openSignUp}
          toggle={() => dispatch(actions.openSignUp())}
        >
          <ModalHeader>Sign Up</ModalHeader>
          <ModalBody>
            <form
              onSubmit={formik.handleSubmit}
              className='form-log'
            >
              {errors  && 
              <span className='span-form'>
                Email have user. Please choise again !!!
              </span>
              }
              <div className='form-fiel form-email'>
                <input
                  id='email'
                  type='email'
                  placeholder='Email Address'
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                  <span className='span-form'>{formik.errors.email}</span>
                ) : null}
              </div>
              <div className='form-fiel form-fullname'>
                <input
                  id='fullname'
                  type='text'
                  placeholder='Full Name'
                  {...formik.getFieldProps('fullname')}
                />
                {formik.touched.fullname && formik.errors.fullname ? (
                  <span className='span-form'>{formik.errors.fullname}</span>
                ) : null}
              </div>
              <div className='form-fiel form-passwork'>
                <input
                  id='password'
                  type='password'
                  placeholder='password'
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                  <span className='span-form'>{formik.errors.password}</span>
                ) : null}
              </div>
              <div className='form-fiel form-sign-up'>
                <div
                  className='modal-footer d-flex justify-content-center'
                  id='signUp-btn-form'
                >
                  <div className='signUp-submit'>
                    <button
                      type='submit'
                      className='submit-form'
                    >
                      Sign up
                    </button>
                  </div>
                  <div className='signUp-span'>
                    <span>If you have an account, please </span>
                  </div>
                  <div
                    className='signUp-navigate-signin submit-form'
                    onClick={() => dispatch(actions.closeSignUp())}
                  >
                    <ModalSignIn />
                  </div>
                </div>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
}

export default ModalSignUp;
