import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Report from './Report';
import Timer from './timer';
import { motion } from 'framer-motion';

export default function Study() {
  const location = useLocation();
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
  console.log(task.tomato);
  const StudyAndMode = () => {
    return (
      <>
        {/* study and mode */}
        <div className=' text-center'>
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
            <span>#Time to Focus</span>
          </div>
        </div>
      </>
    );
  };
  const Perfoment = () => {
    return (
      <form>
        <div className='text-center d-flex justify-content-center pt-4'>
          <div id='HieuSuat'>
            <div className='pb-3'>
              <select class='custom-select bg-dark text-light'>
                <option selected>Select perfoment</option>
                <option value='1'>Bab</option>
                <option value='2'>Medium</option>
                <option value='3'>Great</option>
              </select>
            </div>
          </div>
        </div>
      </form>
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
      <StudyAndMode />
      <>
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
            className='form-design d-flex justify-content-center'
            initial={{ width: 0 }}
            animate={ {width: "100%"}}
            exit={{ x: window.innerWidth  }}
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
      </>
    </motion.div>
  );
}
