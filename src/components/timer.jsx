import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Timer(props) {
  const [countdown, setCountdown] = useState(props.task.tomato * 60);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCountdown((preState) => {
        if (preState > 0) {
          return preState - 1;
        }
      });
    }, 1000);
    return (timerId) => {
      clearInterval(timerId);
    };
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = e.target.map(feild => feild.value);
    const data = {
      hieuQua: e.target[0].value,
      note: e.target[1].value,
      task: props.task,
    };
    console.log(data);
  };
  const Feedback = () => {
    return (
      <div className='form'>
        <div className='taskPadding'>
          <div className='paddingUpDown'>
            <form onSubmit={handleSubmit}>
              <div className='item-center'>
                <label htmlFor='hieuQua'>Mức độ hiệu quả(1-10)</label>
              </div>
              <div className='py-2'>
                <select
                  name='score'
                  id='score'
                >
                  <option value='1'>1(Không hiệu quả)</option>
                  <option value='2'>2(Không ăn thua)</option>
                  <option value='3'>3(qua chuyện)</option>
                  <option value='4'>4(Tàm tạm)</option>
                  <option value='5'>5(Trung Bình)</option>
                  <option value='6'>6(Vừa)</option>
                  <option
                    value='7'
                    selected
                  >
                    7(Khá)
                  </option>
                  <option value='8'>8(Tốt)</option>
                  <option value='9'>9(Hảo Hảo)</option>
                  <option value='10'>10(Tuyệt vời)</option>
                </select>
              </div>
              <div>
                <textarea
                  className='inputAddTask'
                  name='notes'
                  id='note'
                  placeholder='Notes your Feedback'
                ></textarea>
              </div>
              <div className='saveTask'>
                  <button
                    type='submit'
                    className='btnSave'
                  >    
                <Link to={'/result'}>
                    Send Feedback
                </Link>
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
            <h1 className='countdown'>
              {Math.floor(countdown / 60)}:
              {countdown % 60 < 10 ? `0${countdown % 60}` : countdown % 60}
            </h1>
          ) : (
            <Feedback />
            
          )}
        </div>
      </div>
    </>
  );
}

export default Timer;
