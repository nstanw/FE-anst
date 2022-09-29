import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { getTask } from '../../features/data/TaskSlice';
import ApexChart from './ApexChart';
import AIcom from './AIcom';
import { GoDashboard, GoFlame, GoClock } from 'react-icons/go';

function Report() {
  const dispatch = useDispatch();
  const taskState = useSelector((state) => state.task);
  useEffect(() => {
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
      <div className='sumary__'>
        <div className='activitySum'>Tóm tắt thông tin</div>
        <div className='activitySum_line'></div>
      </div>
      <div className='report__ container'>
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
        <Day />
      </div>
    </div>
  );
}

export default Report;
