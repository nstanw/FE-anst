import React from 'react';
import ShowModal from '../Study/ShowModal';
import UploadStudyImage from '../User/UploadStudyImage';
import { useSelector } from 'react-redux/es/exports';
import { AiOutlineCamera } from 'react-icons/ai';
export default function ShowImageStudy() {
  const userState = useSelector((state) => state.user);

  return (
    <div className='ShowImage'>
      <div className='image'>
        {userState.image.link.includes('images/') ? (
          <img
            className='imageSub'
            src={'http://localhost:3333/' + userState.image.link}
          />
        ) : (
          <img
            className='imageSub'
            src={userState.image.link}
          />
        )}
        <div class='dropdown'>
          <button
            class='btnSimple dropdown-toggle'
            type='button'
            data-toggle='dropdown'
          >
            <AiOutlineCamera /> Thay đổi ảnh
          </button>
          <ul class='dropdown-menu'>
            <li>
              <ShowModal
                youtube={false}
                image={false}
                avatar={true}
              />
            </li>
            <li>
              <UploadStudyImage props='postImg' />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
