import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApexChartActions } from '../../features/data/ApexChartSlice';
import { actions } from '../../features/toogle/toogleSlice';
import ApexChart from '../Report/ApexChart';
import GoogleChar from '../Report/GoogleChar';
import { taskAction } from '../../features/data/TaskSlice';
import { postTask, getTask } from '../../features/data/TaskSlice';
import AIcom from '../Report/AIcom';
function Timer() {
  const props = useSelector((state) => state.study);
  const toogle = useSelector((state) => state.toogle);
  const dataChart = useSelector((state) => state.task.apexChart);
  const taskState = useSelector((state) => state.task);
  const [selected, setSelected] = useState('8');
  const [title, setTitle] = useState('bee Study');
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState(props.task.countDown * 60);
  // const [countdown, setCountdown] = useState(0);

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
    const timerCountDown = `${minute} : ${seconds}`;
    document.title = timerCountDown;
  }, [countdown]);

  const minute = Math.floor(countdown / 60);
  const seconds =
    countdown % 60 < 10 ? `0${countdown % 60}` : `${countdown % 60}`;
  const timerCountDown = `${minute} : ${seconds}`;
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      effective: parseInt(e.target[0].value),
      skills: e.target[1].value,
      notes: e.target[2].value,
      task: props.task,
      labelsTime: new Date().toLocaleTimeString(),
    };
    console.log('submit feedback:', data);
    // const payload = ['1234xx', data.task.countDown, 'gold'];
    const payloadApexChart = {
      name: 'Day Charts',
      time: data.task.countDown,
      effective: data.effective,
      labels: data.labelsTime,
      skills: data.skills,
      notes: data.notes,
    };

    const payloadTask = {
      task: {
        name: props.task.name,
        countDown: props.task.countDown,
      },
      effective: data.effective,
      skills: data.skills,
      notes: data.notes,
      labelsTime: new Date().toLocaleTimeString(),
    };

    // dispatch(ApexChartActions.addColumChart(payloadApexChart));
    dispatch(postTask(payloadTask)).then(() => dispatch(getTask()));
    // dispatch(getTask());
    dispatch(actions.hidenFeedback());
    // dispatch(actions.mode());
  };
  const Feedback = () => {
    return (
      <div className='form Form'>
        <div className='taskPadding'>
          <div className='paddingUpDown'>
            <form onSubmit={handleSubmit}>
              <div className='item-center'>
                <label htmlFor='hieuQua'>Mức độ hài lòng(1-10)</label>
              </div>
              <div className='py-2'>
                <select
                  name='score'
                  id='score'
                >
                  <option value='1'>1 (Không hài lòng)</option>
                  <option value='2'>2 (Không ăn thua)</option>
                  <option value='3'>3 (qua chuyện)</option>
                  <option value='4'>4 (Tàm tạm)</option>
                  <option value='5'>5 (Trung Bình)</option>
                  <option value='6'>6 (Vừa)</option>
                  <option value='7'>7 (Khá)</option>
                  <option
                    selected
                    value='8'
                  >
                    8 (Tốt)
                  </option>
                  <option value='9'>9 (Hảo Hảo)</option>
                  <option value='10'>10 (Tuyệt vời)</option>
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
              {timerCountDown}
            </h1>
          ) : (
            <>
              <div>
                {toogle.feedback ? (
                  <Feedback />
                ) : (
                  <>
                    {taskState.post.isLoading ? (
                      <h1> loading</h1>
                    ) : (
                      <>
                        <div className='relax'>
                          <h5>Relax...</h5>
                        <button className='btnSimple'>  5 phút</button>
                        <button  className='btnSimple'>15 phút</button>
                        <button  className='btnSimple'>30 phút</button>
                        </div>
                        <ApexChart chartData={taskState} />
                        <AIcom chartData={taskState} />
                      </>
                    )}
                  </>
                )}
                {taskState.post.isErr && <h1>ERR</h1>}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Timer;
