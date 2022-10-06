import { getTask } from '../../features/data/TaskSlice';
import { getUserAPI } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ShowImageStudy from './ShowImageStudy';
import Avatar from './Avatar';

function UserInfo({ userState }) {
  console.log('userState: ', userState);
  return (
    <div className='userInfor'>
      <div className='userInfor--avatar '>
        <div className='userInfor--avatar-size '>
          <Avatar/>
        </div>
      </div>
      <div className='userInfor--Name '>
        <h1>{userState.users.username}</h1>
        <p>{userState.users.email}</p>
      </div>
    </div>
  );
}

export default UserInfo;
