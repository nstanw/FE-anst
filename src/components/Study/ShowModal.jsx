import React, { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { actions } from '../../features/toogle/toogleSlice';
import { postAvatar, postLinkVideo , getUserAPI} from '../../features/user/userSlice';
function ShowModal(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [link, setlink] = useState('');

  const toggle = () => {
    setShow(!show);
  };
  const handleChangeImage = () => {
    console.log('link:', link);
    console.log('props:', props);
    if (props.image) {
      dispatch(postAvatar({ image: link }))
        .then(() => dispatch(getUserAPI()))
        .catch(err => console.error(err));
    }
    if (props.youtube) {
      dispatch(postLinkVideo({ video: link }))
        .then(() => dispatch(getUserAPI()))
        .catch(err => console.error(err));
    }

    // dispatch(actions.changeImage(link));
  };
  return (
    <div>
      <span
        className='btnWhite'
        onClick={toggle}
      >
        Nhập link ảnh...
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
            onClick= {handleChangeImage}
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
