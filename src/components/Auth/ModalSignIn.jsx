import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './auth.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PREFIX } from '../../util/fetchData';

function ModalSignIn() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState();
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
    onSubmit: async (values) => {
      const url = PREFIX + '/login';
      const data = {
        email: values.email,
        password: values.password,
      };
      console.log(data);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const Respose = await axios.post(url, data, config);
      console.log(Respose.data);

      // get token from fetch request
      const token = await Respose.data.token;

      // set token in cookie
      document.cookie = `token=${token}`;
      console.log(document.cookie);
      if (Respose.data.password === false) {
        // alert('Please enter agian password');
        // navigate('/')
      }
      if (Respose.data.isLoggedIn === true) {
        alert(' Navigate  ');
        navigate('/');
      }
      return Respose.data;
    },
  });
  return (
    <>
      <div>
        <Modal isOpen={true}>
          <ModalHeader> Sign In </ModalHeader>
          <ModalBody>
            <form
              onSubmit={formik.handleSubmit}
              className='form-log'
            >
              {errors && <span className=''>{errors}</span>}
              <div className='form-fiel form-email'>
                <label htmlFor='email'>Email Address</label>
                <input
                  id='email'
                  type='email'
                  placeholder='Email Address'
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </div>
              <div className='form-fiel form-passwork'>
                <label htmlFor='password'>Password</label>
                <input
                  id='password'
                  type='password'
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </div>
              <div className='form-fiel form-sign-up'>
                <div className='modal-footer d-flex justify-content-center'>
                  <button
                    type='submit'
                    className='btn btn-deep-orange'
                  >
                    Sign In
                  </button>
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
