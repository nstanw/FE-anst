import './study.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  FormGroup,
} from 'reactstrap';
import { taskAction } from '../../features/data/TaskSlice';
import { unwrapResult } from '@reduxjs/toolkit';

function Note() {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  const formik = useFormik({
    initialValues: {
      note: '',
    },
    onSubmit: (value) => {
      console.log(value.note);
      const addNote = dispatch(taskAction.addNote(value.note));
      // unwrapResult(addNote);
      setShow(!show);
    },
  });

  return (
    <div className='note'>
      <span
        onClick={() => setShow(!show)}
        className='note-span'
      >
        Take notes
      </span>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
      >
        <ModalHeader> Note </ModalHeader>
        <ModalBody>
          <form onSubmit={formik.handleSubmit}>
            <textarea
              placeholder='Ghi lại những ý tưởng, suy nghĩ cần làm, mọi thứ'
              className='textarea-note'
              type='textarea'
              name='note'
              id='exampleText'
              {...formik.getFieldProps('note')}
            />
            <div id='saveNote'>
              <button
                type='submit'
                className='btnSave'
              >
                Save
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Note;
