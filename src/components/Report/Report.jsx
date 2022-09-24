import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { getTask } from '../../features/data/TaskSlice';
import ApexChart from './ApexChart';
import AIcom from './AIcom';

function Report() {
  const dispatch = useDispatch();
  const taskState = useSelector((state) => state.task);
  useEffect(() => {
    dispatch(getTask());
  }, []);
  return (
    <>
    {console.log("taskState:",taskState)}
    {  taskState.get.isLoading ? <h1>loading</h1> : <ApexChart chartData={taskState.chartData} />}
    <AIcom chartData={taskState.chartData} />
    </>
  );
}

export default Report;
