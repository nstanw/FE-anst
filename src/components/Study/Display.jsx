import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../features/toogle/toogleSlice';
import { useNavigate } from 'react-router-dom';

export default function Study() {
  const navigate = useNavigate();
  const study = useSelector((state) => state.study);
  const toogle = useSelector((state) => state.toogle);
  console.log('study', study);
  const dispatch = useDispatch();
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
            dispatch(actions.modeOff());
            console.log(toogle.status);
            toogle.status ? navigate('/') : null;
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
        <img src="https://img.vietcetera.com/uploads/images/02-nov-2021/real-time-study-with-me-with-music-3-00-19-14-1613640165.jpg" alt="" />
        {/* <img src='std.jpg' /> */}
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
            height='100%'
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
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <div className='marginTop'></div>
      <div className='children'>
        <div className='toogleButton'>
          <StudyAndMode />
        </div>
      </div>
    </motion.div>
  );
}
