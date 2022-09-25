import React, { useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { actions } from '../../features/toogle/toogleSlice';
function ShowModal() {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [linkImg, setLinkImg] = useState('');

  const toggle = () => {
    setShow(!show);
  };
  const handleChangeImage = () => {
    console.log('linkImg:',linkImg);
    dispatch(actions.changeImage(linkImg));
  };

  return (
    <div>
      <Button
        className='btnSave'
        onClick={toggle}
      >
        Nhập link ảnh
      </Button>
      <Modal
        isOpen={show}
        toggle={toggle}
        className=''
      >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <input
            className=''
            placeholder='vui lòng nhập link ảnh...'
           value={linkImg}
           onChange={e => setLinkImg(e.target.value)}
          ></input>
        </ModalBody>
        <ModalFooter>
          <Button
            className='btnSave'
            onClick={handleChangeImage}
          >
            Thay ảnh
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
