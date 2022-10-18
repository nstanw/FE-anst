import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './auth.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PREFIX } from '../../util/fetchData';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './../../features/toogle/authStatus';
import { userActions } from './../../features/user/userSlice';
import ModalSignUp from './ModalSignUp';

function ModalSignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [errors, setErrors] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(5, 'Must be 5 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values,) => {
      const url = PREFIX + '/login';
      const data = {
        email: values.email,
        password: values.password,
      };

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const Respose = await axios.post(url, data, config);

      console.log(Respose.data);
      const user = await Respose.data;
      console.log(user);
       localStorage.setItem('user', JSON.stringify(user));

      //check wrongPassword
      if (Respose.data.message) {
       return setWrongPass(!wrongPass);
      }
      if (Respose.data.error) {
       return setErrors(!errors);
      }

 
      if (Respose.data.status) {
        dispatch(actions.openLogIn());
        console.log(Respose.data.user);
        dispatch(
          userActions.logIn({
            isLoggin: true,
            token: Respose.data.token,
            users: Respose.data.user
          })
        );
        navigate('/');
      }
      return Respose.data;
    },
  });
  return (
    <>
      <div onClick={() => dispatch(actions.openLogIn())}>
        <span>Login</span>
      </div>

      <div>
        <Modal
          isOpen={store.authStatus.openLogIn}
          toggle={() => dispatch(actions.openLogIn())}
        >
          <ModalHeader> Sign In </ModalHeader>
          <ModalBody>
            <form
              onSubmit={formik.handleSubmit}
              className='form-log'
            >
              <div className='form-fiel form-email'>
         
                {errors && (
                  <span className='span-form'>
                   Email not registered. Please Choise again or Sign Up
                  </span>
                )}

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
              <div className='form-fiel form-passwork'>
              {wrongPass && (
                  <span className='span-form'>
                    Authentication failed. Wrong password
                  </span>
                )}
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
                <div className='modal-footer d-flex justify-content-center'>
                  <div className='btn-submit-form'>
                    <button
                      type='submit'
                      className='submit-form'
                    >
                      Sign In
                    </button>
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

export default ModalSignIn;
