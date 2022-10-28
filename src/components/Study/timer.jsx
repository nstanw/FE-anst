import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ApexChartActions } from '../../features/data/ApexChartSlice';
import { actions } from '../../features/toogle/toogleSlice';
import ApexChart from '../Report/ApexChart';
import GoogleChar from '../Report/GoogleChar';
import { taskAction } from '../../features/data/TaskSlice';
import { postTask, getTask } from '../../features/data/TaskSlice';
import AIcom from '../Report/AIcom';
import Countdown from './Countdown';

function Timer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const props = useSelector((state) => state.study);
  const store = useSelector((state) => state);
  const toogle = useSelector((state) => state.toogle);
  const STORE = useSelector((state) => state);
  const taskState = useSelector((state) => state.task);
  const [title, setTitle] = useState('bee Study');

  const [countdown, setCountdown] = useState(props.task.countDown * 60);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCountdown((preState) => {
        if (preState > 0) {
          return preState - 1;
        }
      });
    }, 1);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    const minute = Math.floor(countdown / 60);
    const seconds =
      countdown % 60 < 10 ? `0${countdown % 60}` : `${countdown % 60}`;
    
      let timerCountDown ;
    if (isNaN(seconds)) {
      timerCountDown = `00 : 00`
    } else {
      timerCountDown = `${minute} : ${seconds}`
    }
    //set Title Web
    document.title = timerCountDown;
  }, [countdown]);

  const minute = Math.floor(countdown / 60);
  const seconds =
    countdown % 60 < 10 ? `0${countdown % 60}` : `${countdown % 60}`;
  const timerCountDown = isNaN(seconds) ? null : `${minute} : ${seconds}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!STORE.user.isLoggin) {
      return navigate('/Profile');
    }
    const data = {
      email: store.user.users.email,
      ghiChu: store.task.note,
      effective: parseInt(e.target[0].value),
      skills: e.target[1].value,
      notes: e.target[2].value,
      task: props.task,
      labelsTime: new Date().toLocaleTimeString(),
    };
    console.log('submit feedback:', data);

    const payloadTask = {
      ghiChu: data.ghiChu,
      email: data.email,
      task: {
        name: props.task.name,
        countDown: props.task.countDown,
      },
      effective: data.effective,
      skills: data.skills,
      notes: data.notes,
      labelsTime: new Date().toLocaleTimeString(),
    };

    dispatch(postTask(payloadTask)).then(() => dispatch(getTask()));
    dispatch(actions.hidenFeedback());
  };
  const Feedback = () => {
    return (
      <div className='form Form'>
        <div className='taskPadding'>
          <div className='paddingUpDown'>
            <form onSubmit={handleSubmit}>
              <div className='item-center'>
                <label
                  htmlFor='hieuQua'
                  id='lb-effective'
                >
                  Mức độ hài lòng(1-10)
                </label>
              </div>
              <div className='py-2'>
                <select
                  name='score'
                  id='score'
                >
                  <option
                    className='op-value'
                    value='1'
                  >
                    1 (Không hài lòng)
                  </option>
                  <option
                    className='op-value'
                    value='2'
                  >
                    2 (Không ăn thua)
                  </option>
                  <option
                    className='op-value'
                    value='3'
                  >
                    3 (qua chuyện)
                  </option>
                  <option
                    className='op-value'
                    value='4'
                  >
                    4 (Tàm tạm)
                  </option>
                  <option
                    className='op-value'
                    value='5'
                  >
                    5 (Trung Bình)
                  </option>
                  <option
                    className='op-value'
                    value='6'
                  >
                    6 (Vừa)
                  </option>
                  <option
                    className='op-value'
                    value='7'
                  >
                    7 (Khá)
                  </option>
                  <option
                    selected
                    value='8'
                    className='op-value'
                  >
                    8 (Tốt)
                  </option>
                  <option
                    className='op-value'
                    value='9'
                  >
                    9 (Hảo Hảo)
                  </option>
                  <option
                    className='op-value'
                    value='10'
                  >
                    10 (Tuyệt vời)
                  </option>
                </select>
              </div>
              <div className='Form__texarena'>
                <input
                  required
                  className='inputAddTask'
                  name='skills'
                  placeholder='Learn Skill..?'
                ></input>
              </div>
              <div className='Form__texarena'>
                <textarea
                  className='inputAddTask'
                  name='notes'
                  id='note'
                  placeholder='Notes your Thing ^^'
                  // onChange={handleChange}audio/mp3
                ></textarea>
              </div>
              <div className=' Form__button saveTask'>
                <button
                  type='submit'
                  className='btnSave'
                >
                  Send Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className='row'>
        <div
          id='show-Timer'
          className='text-center'
        >
          {countdown > 0 ? (
            <h1
              className='countdown'
              onChange={(e) => setTitle(timerCountDown)}
            >
              <audio
                // ref='audio_tag'
                autoPlay={true}
                controls={false}
              >
                <source
                  type='audio/mp3'
                  src='audio/clock_tic_toc.mp3'
                />
              </audio>
              {timerCountDown}
            </h1>
          ) : (
            <>
              <div>
                {seconds === '10' && (
                  <audio
                    // ref='audio_tag'
                    autoPlay={true}
                    controls={false}
                  >
                    <source
                      type='audio/mp3'
                      src='audio/tic_toc.mp3'
                    />
                  </audio>
                )}
                {isNaN(seconds) && (
                  <audio
                    // ref='audio_tag'
                    autoPlay={true}
                    controls={false}
                  >
                    <source
                      type='audio/mp3'
                      src='audio/tuturu.mp3'
                    />
                  </audio>
                )}
                {toogle.feedback ? (
                  <Feedback />
                ) : (
                  <>
                    {taskState.post.isLoading ? (
                      <h1> loading</h1>
                    ) : (
                      <>
                        <div className='relax'>
                          <Countdown />
                        </div>
                        <ApexChart chartData={taskState} />
                        <AIcom chartData={taskState} />
                      </>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Timer;
