import React, { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { actions } from '../../features/toogle/toogleSlice';
import {
  postLinkImage,
  postLinkVideo,
  getUserAPI,
  postLinkAvatar
} from '../../features/user/userSlice';
import { AiOutlineLink } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ShowModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const STORE = useSelector(state => state)
  const [show, setShow] = useState(false);
  const [link, setlink] = useState('');

  const toggle = () => {
    if (!STORE.user.isLoggin) {
      return navigate('/Profile')
    }
    return setShow(!show);

  };
  const handleChangeImage = () => {
    console.log('link:', link);
    console.log('props:', props);
    if (props.image) {
      dispatch(postLinkImage({ image: link }))
        .then(() => dispatch(getUserAPI()))
        .catch((err) => console.error(err));

    }
    if (props.youtube) {
      dispatch(postLinkVideo({ video: link }))
        .then()
        .then(() => dispatch(getUserAPI()))
        .catch((err) => console.error(err));
  
    }
    if (props.avatar) {
      dispatch(postLinkAvatar({ avatar: link }))
      .then()
      .then(() => dispatch(getUserAPI()))
      .catch((err) => console.error(err));
    }
    toggle();
  };
  return (
    <div>
      <span
        className='btnWhite'
        onClick={toggle}
      >
        <AiOutlineLink /> Nhập Link
      </span>
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
            // onClick={toggle}
          >
            Save
          </Button>
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
