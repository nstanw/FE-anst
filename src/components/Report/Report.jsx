import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { getTask } from '../../features/data/TaskSlice';
import ApexChart from './ApexChart';
import AIcom from './AIcom';
import { GoDashboard, GoFlame, GoClock } from 'react-icons/go';
import ShowImageStudy from './ShowImageStudy';
import UserInfo from './UserInfor';
import Sumary from './Sumary';
import { getUserAPI } from '../../features/user/userSlice';

function Report() {
  const dispatch = useDispatch();
  const taskState = useSelector((state) => state.task);
  const userState = useSelector((state) => state.user);
  console.log('userState', userState);
  useEffect(() => {
    dispatch(getUserAPI());
    dispatch(getTask());
  }, []);
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
  return (
    <div className='report'>
      <div>
        <div className='coverStudy'>
          <div className='coverStudyImage'>
            <ShowImageStudy />
          </div>
        </div>
        <div className='UserInfo'>
          {userState.isLoading && (
            <img src={'http://localhost:3333/' + userState.users.avatar} />
          )}
          {userState.isSusses && <UserInfo userState={userState} />}
          <div className='catalog'>
            <Sumary />
          </div>
        </div>
        <div className='container'>
          <div className='row timeline'>
            <div className='timeline--info col-sm-12 col-md-3 col-lg-3'>
              <div className='sumary__'>
                <div className='activitySum'>Tóm tắt thông tin</div>
              </div>
              <div className='report__Show row'>
                <div className='report__overview--show report__overview--show--duration  col-md-6 col-sm-12 col-lg-4'>
                  <GoDashboard /> <span>Thời lượng</span>
                </div>
                <div className='report__overview--show report__overview--show--effective  col-md-6 col-sm-12 col-lg-4'>
                  <GoFlame /> <span>Hiệu quả</span>
                </div>
                <div className='report__overview--show report__overview--show--time  col-md-6 col-sm-12 col-lg-4'>
                  <GoClock /> <span>Thời gian</span>
                </div>
              </div>
            </div>
            <div className='timeline--wall col-sm-12 col-md-9 col-lg-9'>
              <div className='report__ container'>
                <Day />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
