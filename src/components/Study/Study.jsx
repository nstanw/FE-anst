import React, { useEffect, useRef, useState } from 'react';
import Timer from './timer';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { showTaskForm, addTask } from '../../features/data/studyDetail';
import { actions } from '../../features/toogle/toogleSlice';
import { ggChart } from '../../features/data/GoogleCharSlice';
import { useNavigate } from 'react-router-dom';
import { getTask } from '../../features/data/TaskSlice';
import users, {
  getUserAPI,
  getDataWithToken,
} from '../../features/user/userSlice';
import ShowModal from './ShowModal';
import Countdown from './Countdown';
import UploadStudyImage from '../User/UploadStudyImage';
import UploadAvatar from '../User/UploadAvatar';
import { AiOutlineCamera } from 'react-icons/ai';
import { AiFillYoutube } from 'react-icons/ai';
import Note from './Note';
import { PREFIX } from '../../util/fetchData';
import { number } from 'yup/lib/locale';

export default function Study() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const study = useSelector((state) => state.study);
  const toogle = useSelector((state) => state.toogle);
  const userState = useSelector((state) => state.user);
  const STORE = useSelector((state) => state);

  useEffect(() => {
    toogle.status ? null : dispatch(actions.reset());
    dispatch(getTask());
    dispatch(getUserAPI());
  }, [STORE.user.isLoggin]);

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
  };
  const handleCounterUp = () => {
    setTask({
      ...task,
      tomato: Number(task.tomato) + 25,
    });
  };
  const handleCounterDown = () => {
    setTask({
      ...task,
      tomato: task.tomato <= 0 ? 0 : task.tomato - 25,
    });
  };

  const StudyAndMode = () => {
    return (
      <>
        {/* study and mode */}
        <div className='text-center'>
          <div className='display'>
            <button
              className={`display__toogle display--button textmeno ${toogle.active.toogle}`}
              onClick={() => {
                dispatch(actions.activeToogle());
              }}
            >
              Study
            </button>
            <button
              className={`display__image display--button textmeno ${toogle.active.image} `}
              onClick={() => {
                dispatch(actions.activeImage());
              }}
            >
              Image
            </button>
            <button
              className={`display__youtube display--button textmeno ${toogle.active.youtube}`}
              onClick={() => {
                dispatch(actions.activeYoutube());
              }}
            >
              Youtube
            </button>
          </div>

          {toogle.active.toogle === 'active' ? (
            <div className='display__content'>
              {/* <h1 className='font-weight-bold display-1'>Study</h1> */}
              <div>
                <Toogle />
                <div className='pt-6'>
                  <span className='blueWight'>#Time to Focus</span>
                </div>
              </div>
            </div>
          ) : null}

          {toogle.active.youtube === 'active' ? (
            <div className='display__content'>
              <div className='display__content--padding'>
                <Youtube
                  url={userState.video.id}
                  autoplay={toogle.youtube.autoplay}
                />
                <div className='display__content__form'></div>
              </div>
            </div>
          ) : null}

          {toogle.active.image === 'active' ? (
            <div className='display__content'>
              <div className='display__content--padding'>
                {userState.default && <ShowImage />}
                {userState.isSusses && <ShowImage />}
                {userState.isLoading && <h1>Loading...</h1>}
                {userState.isErr && <h1>err</h1>}
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
            dispatch(actions.mode());
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
        <div className='image'>
          {/* check isLoggin */}
          {STORE.user.isLoggin ? (
            // check host or link
            !STORE.user.users.image.includes('http', 0) ? (
              <img
                src={PREFIX + '/' + STORE.user.users.image}
                id='study-image'
              />
            ) : (
              <img
                src={STORE.user.users.image}
                id='study-image'
              />
            )
          ) : // use default image
          !STORE.user.image.includes('http', 0) ? (
            <img
              src={PREFIX + '/' + STORE.user.image}
              id='study-image'
            />
          ) : (
            <img
              src={STORE.user.image}
              id='study-image'
            />
          )}
          <div className='dropdown-study'>
            <button
              className='btnSimple dropdown-toggle'
              type='button'
              data-toggle='dropdown'
            >
              <AiOutlineCamera /> Thay đổi ảnh
            </button>

            <ul className='dropdown-menu'>
              <li>
                <ShowModal
                  youtube={false}
                  image={true}
                />
              </li>
              <li>
                <UploadStudyImage />
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  let Youtube;
  if (STORE.user.isLoggin) {
    Youtube = ({ YoutubeVideoID = STORE.user.users.video, autoplay }) => {
      autoplay ? (autoplay = '?autoplay=1') : (autoplay = '');
      let youtubeId = YoutubeVideoID;
      return (
        <div className='youtube row'>
          <div className='image'>
            <iframe
              width='100%'
              height='315'
              src={`https://www.youtube.com/embed/${youtubeId}${autoplay}`}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
            <div id='dropdown-video'>
              <button
                className='btnSimple dropdown-toggle'
                type='button'
                data-toggle='dropdown'
              >
                <AiFillYoutube /> Change Video
              </button>
              <ul className='dropdown-menu'>
                <li>
                  <ShowModal
                    youtube={true}
                    image={false}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    };
  } else {
    Youtube = ({ YoutubeVideoID = STORE.user.video, autoplay }) => {
      autoplay ? (autoplay = '?autoplay=1') : (autoplay = '');
      let youtubeId = YoutubeVideoID;
      return (
        <div className='youtube row'>
          <div className='image'>
            <iframe
              width='100%'
              height='315'
              src={`https://www.youtube.com/embed/${youtubeId}${autoplay}`}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
            <div id='dropdown-video'>
              <button
                className='btnSimple dropdown-toggle'
                type='button'
                data-toggle='dropdown'
              >
                <AiFillYoutube /> Change Video
              </button>
              <ul className='dropdown-menu'>
                <li>
                  <ShowModal
                    youtube={true}
                    image={false}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    };
  }

  return (
    <div>
      {STORE.toogle.showStudy && <div className='marginTop'></div>}

      {STORE.toogle.showStudy && (
        <div className='children'>
          <div className='toogleButton'>
            <StudyAndMode />
          </div>

          <div className='coffe'>
            <div className='take-note'>
              <img
                src='coffe.png'
                alt=''
                className='userInfor--avatar-size'
              />
              <Note />
            </div>
          </div>

          <div className='task-timer'>
            {toogle.status ? (
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
                >
                  {/* // tass form */}
                  <div className='task'>
                    <a href='#focusFormTaskDetails'>
                      <div
                        className='task-detail'
                        onClick={() => dispatch(showTaskForm())}
                      >
                        <div className='p-3 container-taskDetail'>
                          <div className='taskName textmeno'>
                            {task.task ? (
                              <span id='taskName'> {task.task}</span>
                            ) : (
                              <span id='taskName'>Task...</span>
                            )}
                          </div>
                          <div id='timeAndEdit'>
                            <div className='px-2 textmeno'>
                              {task.tomato} minutes
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    {study.taskForm ? (
                      <form
                        id='focusFormTaskDetails'
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
                                    className='mt-2 countPomodoro textmeno'
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
      )}
    </div>
  );
}
