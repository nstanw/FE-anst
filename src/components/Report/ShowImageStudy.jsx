import React from 'react';
import ShowModal from '../Study/ShowModal';
import UploadStudyImage from '../User/UploadStudyImage';
import { useSelector } from 'react-redux/es/exports';
import { AiOutlineCamera } from 'react-icons/ai';
import { PREFIX } from '../../util/fetchData';
export default function ShowImageStudy() {
  const STORE = useSelector((state) => state);

  return (
    <div className='ShowImage'>
      <div className='image'>
       { console.log(STORE.user.users.image)}
        { !STORE.user.users.image.includes('http',0)  ? (
          <img
            className='imageSub'
            src={PREFIX + "/" + STORE.user.users.image}
          />
        ) : (
          <img
            className='imageSub'
            src={STORE.user.users.image}
          />
        )}
        <div id='dropdown-showImage'>
          <button
            className='btnSimple dropdown-toggle'
            type='button'
            data-toggle='dropdown'
          >
            <AiOutlineCamera /> Thay đổi ảnh
          </button>
          <ul className='dropdown-menu'>
            <li>
              <ShowModal
                youtube={false}
                image={true}
                avatar={false}
              />
            </li>
            <li>
              <UploadStudyImage />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
