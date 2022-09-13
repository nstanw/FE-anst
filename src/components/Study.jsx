import React, { useEffect, useRef, useState } from 'react';
import Timer from './timer';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { increment, incrementAmount } from '../features/counter/counterSlice';
import { fetchUsers } from '../features/data/studyDetail';
import { TaskAbortError } from '@reduxjs/toolkit';

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
      tomato: task.tomato + 25,
    });
  };
  const handleCounterDown = () => {
    setTask({
      ...task,
      tomato: task.tomato === 0 ? 0 : task.tomato - 25,
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
              <span>#Time to Focus</span>
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
  function ShowImage() {
    return(
      <div className="ShowImage">
        <img src="maxresdefault.jpg"/>
      </div>
    )
  }
  const Youtube = () => {
    const link =
      'https://www.youtube.com/watch?v=ZEbCz7B2-Eg&ab_channel=MariaSilva';
    const youtubeId = link.split('watch?v=')[1].split('&')[0];
    console.log(youtubeId);
    return(
      <div className='youtube row'>
      <div className=''>
        <iframe
          width='100%'
          height='315'
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          ></iframe>
      </div>
    </div>
  )
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
        {!toggled ? (
          <div className='toogleButton'>
            <StudyAndMode />
          </div>
        ) : (
          <Youtube />
        )}
        <div className='task-timer'>
          <div className='coffe'>
            <img
              src='coffe.png'
              alt=''
            />
          </div>
          {showTimer ? (
            <>
              <Timer task={task} />
            </>
          ) : (
            <div className='taskDetail'>
              <motion.div
                className='form-design'
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                exit={{ x: window.innerWidth }}
              ></motion.div>
              {/* // tass form */}
              <div className='task'>
                <div className='task-detail'>
                  <div className='p-3 container-taskDetail'>
                    <div className='taskName'>
                      {task.task ? (
                        <span id='taskName'> {task.task}</span>
                      ) : (
                        <span id='taskName'>Task...</span>
                      )}
                    </div>
                    <div id='timeAndEdit'>
                      <div className='px-2'>{task.tomato} minutes</div>
                      <div className='taskEdit'>
                        <img
                          id='changeSizeImg'
                          src='/vertical-ellipsis.png'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='taskForm'>
                  <div className='taskPadding'>
                    <div className='paddingUpDown'>
                      <div className='addTaskDetail'>
                        <div>
                          <input
                            className='inputAddTask'
                            placeholder='What do you want to do?'
                            name='task'
                            value={task.task}
                            onChange={(e) => inputsHandler(e)}
                          />
                        </div>
                        <div className='pomodoro'>
                          <span>Pomodoro</span>
                          <div>
                            <input
                              value={task.tomato}
                              onChange={(e) => inputsHandler(e)}
                              className='mt-2 countPomodoro'
                              type='number'
                              name='tomato'
                              id='tomato'
                              placeholder='Nhập thời gian học'
                            />
                            <button
                              onClick={handleCounterUp}
                              className='upPomodoro'
                            >
                              <img src='/caret-up.png' />
                            </button>
                            <button
                              onClick={handleCounterDown}
                              className='downPomodoro'
                            >
                              <img src='/caret-down.png' />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='py-2'></div>
                    </div>
                  </div>
                  <div className='saveTask'>
                    <button id='btnCancel'>Cancel</button>
                    <button id='btnSave'>Save</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
