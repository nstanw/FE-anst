import './study.css';
import React, { useState } from 'react';
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

function Note() {
  const [show, setShow] = useState(false);

  return (
    <div className='note'>
      <span onClick={() => setShow(!show)}>Take notes</span>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
      >
        <ModalHeader> Note </ModalHeader>
        <ModalBody>
          <FormGroup>
            <textarea
            placeholder='Ghi lại những ý tưởng, suy nghĩ cần làm, mọi thứ'
            className='textarea-note'
              type='textarea'
              name='text'
              id='exampleText'
            />
          </FormGroup>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Note;
