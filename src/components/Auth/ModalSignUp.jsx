import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function ModalSignUp() {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <div
        class='modal fade'
        id='modalRegisterForm'
        tabindex='-1'
        role='dialog'
        aria-labelledby='myModalLabel'
        aria-hidden='true'
      >
        <div
          class='modal-dialog'
          role='document'
        >
          <div class='modal-content'>
            <div class='modal-header text-center'>
              <h4 class='modal-title w-100 font-weight-bold'>Sign up</h4>
              <button
                type='button'
                class='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div class='modal-body mx-3'>
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor='firstName'>First Name</label>
                <input
                  id='firstName'
                  type='text'
                  {...formik.getFieldProps('firstName')}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div>{formik.errors.firstName}</div>
                ) : null}

                <label htmlFor='lastName'>Last Name</label>
                <input
                  id='lastName'
                  type='text'
                  {...formik.getFieldProps('lastName')}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div>{formik.errors.lastName}</div>
                ) : null}

                <label htmlFor='email'>Email Address</label>
                <input
                  id='email'
                  type='email'
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
                <div class='modal-footer d-flex justify-content-center'>
                  <button type='submit' class='btn btn-deep-orange'>Sign up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class='text-center'>
        <a
          href=''
          class='btn btn-default btn-rounded mb-4'
          data-toggle='modal'
          data-target='#modalRegisterForm'
        >
          Launch Modal Register Form
        </a>
      </div>
    </>
  );
}

export default ModalSignUp;
