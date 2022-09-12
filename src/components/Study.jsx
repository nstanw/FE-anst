import React, { useEffect, useRef, useState } from 'react';
import Timer from './timer';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { increment, incrementAmount } from '../features/counter/counterSlice';
import { fetchUsers } from '../features/data/studyDetail';

export default function Study() {
  const minutes = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [toggled, setToggled] = React.useState(false);
  const [showFeeback, setShowFeeback] = React.useState(false);
  const [showTimer, setShowTimer] = React.useState(false);
  const [task, setTask] = React.useState({
    task: '',
    tomato: 25,
  });
  const taskRef = useRef();
  const handleToggled = () => {
    setToggled(!toggled);
  };
  const inputsHandler = (e) => {
    const newState = {
      ...task,
      [e.target.name]: e.target.value,
    };
    setTask(newState);
  };

  const hideShowFeeback = () => {
    setShowFeeback(!showFeeback);
  };
  const hideTimer = () => {
    setShowTimer(!showTimer);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleCounterUp = () => {
    setTask({
      ...task,
      tomato: task.tomato + 5,
    });
  };
  const handleCounterDown = () => {
    setTask({
      ...task,
      tomato: task.tomato - 5,
    });
  };
  const StudyAndMode = () => {
    return (
      <>
        {/* study and mode */}
        <div className='text-center'>
          <h1 className='font-weight-bold display-1'>Study</h1>
          <div>
            <label
              htmlFor='large-toggle'
              className='inline-flex relative items-center cursor-pointer'
            >
              <input
                type='checkbox'
                value=''
                id='large-toggle'
                // checked
                className='sr-only peer'
              />
            </label>
            <Toogle />
            <div className='pt-6'>

            <span >#Time to Focus</span>
            </div>
          </div>
        </div>
      </>
    );
  };
  const Toogle = () => {
    return (
      <div className='modeCSS'>
        <div className={`toogle${toggled ? ' night' : ''}`}>
          <div
            onClick={() => {
              hideTimer();
              handleToggled();
            }}
            className='notch'
          ></div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className='study'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className='marginTop'></div>
      <div className='children'>
        <div className='toogleButton'>
          <StudyAndMode />
        </div>
        <div className='task-timer'>
          <div className='task-title'>
            <h1 className='text-center'>
              {' '}
              {task.task} - Thời gian: {task.tomato} phút
            </h1>
          </div>
          {showTimer ? (
            <>
              <Timer task={task} />
            </>
          ) : (
            <motion.div
              className='form-design'
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              exit={{ x: window.innerWidth }}
            >
              <form
                className='p-3'
                action=''
                onSubmit={handleSubmit}
              >
                <div>
                  <input
                    placeholder='What do you want to do?'
                    name='task'
                    value={task.task}
                    onChange={(e) => inputsHandler(e)}
                  />
                </div>

                <input
                  value={task.tomato}
                  onChange={(e) => inputsHandler(e)}
                  className='mt-2'
                  type='number'
                  name='tomato'
                  id='tomato'
                  placeholder='Nhập thời gian học'
                />
                <div>
                  <button onClick={handleCounterUp}>+ 5</button>
                  <button onClick={handleCounterDown}>- 5</button>
                </div>
                <div>
                  {/* <button
                  className='btn btn-outline-primary'
                  type='submit'
                >
                  Start
                </button> */}
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
