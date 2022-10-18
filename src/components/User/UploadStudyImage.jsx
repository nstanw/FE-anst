import React from 'react';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
  getUserAPI,
  postUploadImageStudy,
} from '../../features/user/userSlice';
import { AiOutlineCamera } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function UploadStudyImage() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const STORE = useSelector(state => state)
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const toggle = () => {
    if (!STORE.user.isLoggin) {
      return navigate('/Profile');
    }
    return setShow(!show);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //add file to formData
    const formData = new FormData();
    formData.append('avatar', file);

    dispatch(postUploadImageStudy(formData)).then(() => dispatch(getUserAPI()));
    toggle();
  };

  return (
    <div className='form-upload-file'>
      <div>
        <span
          className='btnWhite'
          onClick={toggle}
        >
          <AiOutlineCamera /> Tải ảnh lên
        </span>
        <Modal
          isOpen={show}
          toggle={toggle}
          className=''
        >
          <ModalHeader toggle={toggle}>Hi!</ModalHeader>
          <ModalBody>
            <form>
              <input
                type='file'
                name='avatar'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type='submit'
              className='btnSave'
              onClick={handleSubmit}
              // onClick={toggle}
            >
              Upload
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
    </div>
  );
}

export default UploadStudyImage;
