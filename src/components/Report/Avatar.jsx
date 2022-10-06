import React from 'react';
import ShowModal from '../Study/ShowModal';
import UploadStudyImage from '../User/UploadStudyImage';
import { useSelector } from 'react-redux/es/exports';
import { AiOutlineCamera } from "react-icons/ai";
export default function Avatar() {

    const userState = useSelector((state) => state.user);

  return (
    <div className='Avatar-view'>
      <div className='imageAvatar'>
        {userState.users.avatar.includes('images/') ? (
          <img  className='avatar-profile' src={'http://localhost:3333/' + userState.users.avatar} />
        ) : (
          <img  className='avatar-profile' src={userState.users.avatar} />
        )}
        <div className='dropdownAvatar'>
          <button
            className='btnSimple dropdown-toggle'
            type='button'
            data-toggle='dropdown'
          >
           <AiOutlineCamera/>
          </button>
          <ul className='dropdown-menu'>
            <li>
              <ShowModal avatar={true} />
            </li>
            <li>
              <UploadStudyImage props='uploadAvatar' />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
