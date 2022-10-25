import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { getTask } from '../../features/data/TaskSlice';
import ApexChart from './ApexChart';
import AIcom from './AIcom';
import ShowImageStudy from './ShowImageStudy';
import { getUserAPI } from '../../features/user/userSlice';
import ModalSignIn from '../Auth/ModalSignIn';
import { PREFIX } from '../../util/fetchData';
import ModalSignUp from '../Auth/ModalSignUp';
import { AiOutlineCamera } from 'react-icons/ai';
import ShowModal from '../Study/ShowModal';
import UploadStudyImage from '../User/UploadStudyImage';
import UploadAvatar from '../User/UploadAvatar';
import Loading from '../Loading';

function Profile() {
  const dispatch = useDispatch();
  const taskState = useSelector((state) => state.task);
  const userState = useSelector((state) => state.user);
  const STORE = useSelector((state) => state);
  useEffect(() => {
    dispatch(getUserAPI());
    dispatch(getTask());
  }, []);

  // Show chart for day
  const Day = () => {
    return (
      <div className='Day'>
        <div className='report__chart'>
          <ApexChart chartData={taskState} />
        </div>
        <div className='report__baoCao'>
          <AIcom chartData={taskState} />
        </div>
      </div>
    );
  };
  //show login require
  const UserInfor = () => {
    return (
      <div id='userInfo'>
        <div className='avatar-guest'>
          <img
            id='profile-avatar-user'
            src='favicon.ico'
            alt=''
          />
        </div>
        <div className='user-name text-center'>
          <h4>Hi! hard-working bee</h4>
          <h5>If you have an account, please login</h5>
        </div>
      </div>
    );
  };

  // Show avatar user and info
  const AvatarUser = () => {
    return (
      <div className='AvatarUser'>
        <div className='changeAsolute-ChageAvatar'>
          <div className='avatarUser__Avatar'>
            {!STORE.user.users.avatar.includes('http', 0) ? (
              <img
                id='profile-avatar'
                src={PREFIX + '/' + STORE.user.users.avatar}
              />
            ) : (
              <img
                id='profile-avatar'
                src={STORE.user.users.avatar}
              />
            )}
          </div>
          <div id='dropdown-changeAvatar'>
            <button
              className='btnSimple dropdown-toggle'
              type='button'
              data-toggle='dropdown'
            >
              <AiOutlineCamera />
            </button>
            <ul className='dropdown-menu'>
              <li>
                <ShowModal
                  youtube={false}
                  image={false}
                  avatar={true}
                />
              </li>
              <li>
                <UploadAvatar/>
              </li>
            </ul>
          </div>
        </div>

        <div className='avatarUser__Info'>
          <h6>{STORE.user.users.email}</h6>
          <h6>{STORE.user.users.fullname}</h6>
        </div>
      </div>
    );
  };

  return (
    <div className='report'>
      {/* checkisLoggin */}
      {STORE.user.isLoggin && STORE.user.getUserAPI.isLoading && <Loading/>}
      {STORE.user.isLoggin && STORE.user.getUserAPI.isErr && <h1>err</h1>}
      {STORE.user.isLoggin && STORE.user.getUserAPI.isSusses ? (
        // check Loading
        <div className='Profile'>
          <div className='coverStudy'>
            <div className='coverStudyImage'>
              {STORE.user.getUserAPI.isLoading ? null : <ShowImageStudy />}
            </div>
          </div>
          <div className='profile-avatar'>
            <AvatarUser />
          </div>
          <div className='container'>
            <div className='row timeline'>
              <div className='timeline--wall col-12'>
                <div className='report__ container'>
                  <Day />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // IF not Loggin
        <div className='Profile'>
          <div className='coverStudy'>
            <div className='coverStudyImage'>
              {!STORE.user.image.includes('http', 0) ? (
                <img
                  className='imageSub'
                  src={PREFIX + '/' + STORE.user.image}
                />
              ) : (
                <img
                  className='imageSub'
                  src={STORE.user.image}
                />
              )}
            </div>
          </div>

          {/* show guest */}
          <div className='user-guest'>
            <UserInfor />
          </div>
          <div id='loginrequire'>
            <div className=' btn-require require_login'>
              <ModalSignIn />
            </div>
            <div className=' btn-require require_SignIn'>
              <ModalSignUp />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
