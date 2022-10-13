import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './auth.css';
import axios from 'axios';
import UserApi from '../../util/api/UserApi';
import HOST from '../../util/HOST';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
function ModalSignUp() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState();
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

      const url = HOST.API + '/signup';
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      const Respose = await axios.post(url, data, config);
      console.log(Respose.data);
      // if (Respose.data.password === false) {
      //   alert('Please enter agian password');
      //   // navigate('/')
      // }

      if (Respose.data.token) {
        console.log(Respose.data.token);
        return navigate('/');
      }
      return Respose.data;
    },
  });
  return (
    <>
      <div>
        <Modal isOpen={true}>
          <ModalHeader>Modal title</ModalHeader>
          <ModalBody>
            <form
              onSubmit={formik.handleSubmit}
              className='form-log'
            >
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
              <div className='form-fiel form-fullname'>
                <label htmlFor='fullname'>Full Name</label>
                <input
                  id='fullname'
                  type='text'
                  {...formik.getFieldProps('fullname')}
                />
                {formik.touched.fullname && formik.errors.fullname ? (
                  <div>{formik.errors.fullname}</div>
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
                    Sign up
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

export default ModalSignUp;
