import React, { useEffect, useRef, useState } from 'react';
import Timer from './timer';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { showTaskForm, addTask } from '../../features/data/studyDetail';
import { actions } from '../../features/toogle/toogleSlice';
import { ggChart } from '../../features/data/GoogleCharSlice';
import { useNavigate } from 'react-router-dom';

export default function Study() {
  const dispatch = useDispatch();
  useEffect(() => {
    const initstate = {
      status: false,
      feedback: true,
      form: false,
      task: {
        name: 'Task...',
        time: 25,
      },
      active: {
        toogle: 'active',
        youtube: '',
        image: '',
      },
      youtube: {
        link: 'https://www.youtube.com/watch?v=fn1YBnSgva0&ab_channel=jawonee',
        autoplay: false,
      },
    };
    dispatch(actions.reset(initstate));
  }, []);
  const navigate = useNavigate();

  const study = useSelector((state) => state.study);
  const toogle = useSelector((state) => state.toogle);

  console.log('study', study);
  const [toggled, setToggled] = React.useState(false);
  const [showTimer, setShowTimer] = React.useState(false);
  const [task, setTask] = React.useState({
    task: '',
    tomato: 25,
  });

  const inputsHandler = (e) => {
    const newState = {
      ...task,
      [e.target.name]: e.target.value,
    };
    setTask(newState);
  };

  // const inputsHandler = (e) => {
  //   const newState = {
  //     ...task,
  //     [e.target.name]: e.target.value,
  //   };
  //   setTask(newState);
  // };

  const hideTimer = () => {
    setShowTimer(!showTimer);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: task.task,
      countDown: task.tomato,
    };
    dispatch(addTask(payload));
    console.log('---------', study);
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
        {console.log(task)}
        {/* study and mode */}
        <div className='text-center'>
          <div className='display'>
            <button
              className={`display__toogle display--button ${toogle.active.toogle}`}
              onClick={() => {
                dispatch(actions.activeToogle());
              }}
            >
              Toogle
            </button>
            <button
              className={`display__youtube display--button ${toogle.active.youtube}`}
              onClick={() => dispatch(actions.activeYoutube())}
            >
              Youtube
            </button>
            <button
              className={`display__image display--button ${toogle.active.image} `}
              onClick={() => dispatch(actions.activeImage())}
            >
              Image
            </button>
          </div>

          {toogle.active.toogle === 'active' ? (
            <div className='display__content'>
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
          ) : null}

          {toogle.active.youtube === 'active' ? (
            <div className='display__content'>
              <div className='display__content--padding'>
                <Youtube
                  link={toogle.youtube.link}
                  autoplay={toogle.youtube.autoplay}
                />
                <div className='display__content__form'></div>
              </div>
            </div>
          ) : null}

          {toogle.active.image === 'active' ? (
            <div className='display__content'>
              <div className='display__content--padding'>
                <ShowImage />
              </div>
              <div className='display__content__form'></div>
            </div>
          ) : null}
        </div>
      </>
    );
  };

  const Toogle = () => {
    return (
      <div className='modeCSS'>
        <div
          className={`toogle${toogle.status ? ' night' : ''}`}
          onClick={() => {
            hideTimer();
            // handleToggled();
            dispatch(actions.mode());
            console.log(toogle.status);
            toogle.status ? null : navigate('/status');
          }}
        >
          <div className='notch'></div>
        </div>
      </div>
    );
  };
  function ShowImage() {
    return (
      <div className='ShowImage'>
        <img src='std.jpg' />
      </div>
    );
  }
  const Youtube = ({
    link = 'https://www.youtube.com/watch?v=ZEbCz7B2-Eg&ab_channel=MariaSilva',
    autoplay,
  }) => {
    autoplay ? (autoplay = '?autoplay=1') : (autoplay = '');
    const youtubeId = link.split('watch?v=')[1].split('&')[0];
    console.log(youtubeId);
    return (
      <div className='youtube row'>
        <div className=''>
          <iframe
            width='100%'
            height='315'
            src={`https://www.youtube.com/embed/${youtubeId}${autoplay}`}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
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
          {!showTimer ? (
            <div className='coffe'>
              <img
                src='coffe.png'
                alt=''
              />
            </div>
          ) : null}
          {showTimer ? (
            <>
              <Timer task={task} />
              <div className='coffe'>
                <img
                  src='coffe.png'
                  alt=''
                />
              </div>
            </>
          ) : (
            <div className='taskDetail'>
              <motion.div
                className='form-design'
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                exit={{ x: window.innerWidth }}
              >
                {/* // tass form */}
                <div className='task'>
                  <div
                    className='task-detail'
                    onClick={() => dispatch(showTaskForm())}
                  >
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
                  {study.taskForm ? (
                    <form
                      className='form'
                      onSubmit={handleSubmit}
                    >
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
                        <button
                          type='button'
                          className='btnSave'
                          onClick={(e) => {
                            handleSubmit(e);
                            dispatch(showTaskForm());
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  ) : null}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}