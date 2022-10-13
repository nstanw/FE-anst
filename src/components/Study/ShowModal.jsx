import React, { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { actions } from '../../features/toogle/toogleSlice';
import {
  postAvatar,
  postLinkVideo,
  getUserAPI,
} from '../../features/user/userSlice';
import { AiOutlineLink } from 'react-icons/ai';
import axios from 'axios';
function ShowModal(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [link, setlink] = useState('');

  const toggle = () => {
    setShow(!show);
  };
  const handleShow = () => setShow(true);
  const handleChangeImage = () => {
    console.log('link:', link);
    console.log('props:', props);
    if (props.image) {
      dispatch(postAvatar({ image: link }))
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
      const data = { avatar: link };
      const url = 'http://localhost:3333/user/postAvatar';
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      axios
        .post(url, data, config)
        .then((res) => dispatch(getUserAPI()))
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
