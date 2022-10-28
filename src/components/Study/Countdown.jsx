import { useEffect, useState } from 'react';

function Countdown() {
  const [countdown, setCountdown] = useState();
  const [playAudio, setPlayAudio] = useState(false);
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

    let timerCountDown;
    if (isNaN(seconds)) {
      timerCountDown = `00 : 00`;
    } else {
      timerCountDown = `${minute} : ${seconds}`;
    }

    document.title = timerCountDown;
  }, [countdown]);

  const minute = Math.floor(countdown / 60);
  const seconds =
    countdown % 60 < 10 ? `0${countdown % 60}` : `${countdown % 60}`;

  let timerCountDown;
  if (isNaN(seconds)) {
    timerCountDown = `00 : 00`;
  } else {
    timerCountDown = `${minute} : ${seconds}`;
  }
  return (
    <div className='Countdown'>
      <div className='relax'>
        <h5>Relax...</h5>
        <button
          className='btn-require'
          onClick={() => {
            setPlayAudio(true);
            setCountdown(5 * 60);
          }}
        >
          {' '}
          5 phút
        </button>
        <button
          className='btn-require'
          onClick={() => {
            setPlayAudio(true);
            setCountdown(15 * 60);
          }}
        >
          15 phút
        </button>
        <button
          className='btn-require'
          onClick={() => {
            setPlayAudio(true);
            setCountdown(30 * 60);
          }}
        >
          30 phút
        </button>
      </div>
      {playAudio && (
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
      <h1>{timerCountDown}</h1>
    </div>
  );
}

export default Countdown;
