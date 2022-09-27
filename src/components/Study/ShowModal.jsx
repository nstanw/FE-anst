import React, { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { actions } from '../../features/toogle/toogleSlice';
import { getUserAPI,postUserAPI } from '../../features/user/userSlice';
function ShowModal(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [link, setlink] = useState('');

  const toggle = () => {
    setShow(!show);
  };
  const handleChangeImage = () => {
    console.log('link:', link);             

    dispatch(postUserAPI(link));
    // dispatch(actions.changeImage(link));
    dispatch(getUserAPI());

  };

  return (
    <div>
      <Button
        className='btnSave'
        onClick={toggle}
      >
        Nhập link...
      </Button>
      <Modal
        isOpen={show}
        toggle={toggle}
        className=''
      >
        <ModalHeader toggle={toggle}>Hi!</ModalHeader>
        <ModalBody>
          <input
            className=''
            placeholder='vui lòng nhập link...'
            value={link}
            onChange={(e) => setlink(e.target.value)}
          ></input>
        </ModalBody>
        <ModalFooter>
          <Button
            className='btnSave'
            onClick={handleChangeImage}
          >
            Save
          </Button>{' '}
          <Button
            className='btnSave'
            onClick={toggle}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ShowModal;
