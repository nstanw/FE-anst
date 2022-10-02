import React, { useEffect, useRef, useState } from "react";
import Timer from "./timer";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { showTaskForm, addTask } from "../../features/data/studyDetail";
import { actions } from "../../features/toogle/toogleSlice";
import { ggChart } from "../../features/data/GoogleCharSlice";
import { useNavigate } from "react-router-dom";
import { getTask } from "../../features/data/TaskSlice";
import users, { getUserAPI } from "../../features/user/userSlice";
import ShowModal from "./ShowModal";
import Countdown from "./Countdown";

export default function Study() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const study = useSelector((state) => state.study);
  const toogle = useSelector((state) => state.toogle);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    toogle.status ? null : dispatch(actions.reset());
    dispatch(getTask());
    dispatch(getUserAPI());
  }, [toogle.status]);
  useEffect(() => {
      dispatch(getUserAPI());
  },[user.image]);
  useEffect(() => {
      dispatch(getUserAPI());
  },[user.video]);
  console.log("study", study);
  const [toggled, setToggled] = React.useState(false);
  const [showTimer, setShowTimer] = React.useState(false);
  const [task, setTask] = React.useState({
    task: "",
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
    console.log("---------", study);
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
  const link = {
    image: user.image.link,
    video: user.video.link,
  };

  const StudyAndMode = () => {
    return (
      <>
        {console.log(task)}
        {/* study and mode */}
        <div className="text-center">
          <div className="display">
            <button
              className={`display__toogle display--button textmeno ${toogle.active.toogle}`}
              onClick={() => {
                dispatch(actions.activeToogle());
              }}
            >
              Mode
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

          {toogle.active.toogle === "active" ? (
            <div className="display__content">
              {/* <h1 className='font-weight-bold display-1'>Study</h1> */}
              <div>
                <Toogle />
                <div className="pt-6">
                  <span className="blueWight">#Time to Focus</span>
                </div>
              </div>
            </div>
          ) : null}

          {toogle.active.youtube === "active" ? (
            <div className="display__content">
              <div className="display__content--padding">
                <Youtube
                  url={link.video}
                  autoplay={toogle.youtube.autoplay}
                />
                <div className="display__content__form"></div>
              </div>
            </div>
          ) : null}

          {toogle.active.image === "active" ? (
            <div className="display__content">
              <div className="display__content--padding">
             { user.get.isSusses && <ShowImage />}
             { user.get.isLoading && <h1>Loading...</h1>}
             { user.get.isErr && <h1>err</h1>}
              </div>
              <div className="display__content__form"></div>
            </div>
          ) : null}
        </div>
      </>
    );
  };

  const Toogle = () => {
    return (
      <div className="modeCSS">
        <div
          className={`toogle${toogle.status ? " night" : ""}`}
          onClick={() => {
            hideTimer();
            // handleToggled();
            dispatch(actions.mode());
            // console.log(toogle.status);
            // toogle.status ? null : navigate('/status');
          }}
        >
          <div className="notch"></div>
        </div>
        {/* {!toogle.status  && (
        <audio
          // ref='audio_tag'
          autoPlay={true}
          controls={false}
        >
          <source
            type='audio/mp3'
            src='audio/apple_watch.mp3'
          />
        </audio>
      )} */}
      </div>
    );
  };

  function ShowImage() {
    return (
      <div className="ShowImage">
        <div className="image">
          <img src={link.image} />
          <div class="dropdown">
            <button
              class="btnSimple dropdown-toggle"
              type="button"
              data-toggle="dropdown"
            >
              Thay đổi ảnh
            </button>
            <ul class="dropdown-menu">
              <li>
                <ShowModal image={true}/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  const Youtube = ({ url = link.video, autoplay }) => {
    autoplay ? (autoplay = "?autoplay=1") : (autoplay = "");
    const checkLinkFull =  url.includes("watch?v=");
    const checkLinkSort =  url.includes("youtu.be/");
    let youtubeId = ''
    if (checkLinkFull) {
        youtubeId = url.split("watch?v=")[1].split("&")[0];
        console.log(youtubeId);
    }
    if (checkLinkSort) {
       youtubeId = url.split("youtu.be/")[1].split("&")[0];
       console.log(youtubeId);
    }
    return (
      <div className="youtube row">
        <div className="image">
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${youtubeId}${autoplay}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
              <div class="dropdown">
            <button
              class="btnSimple dropdown-toggle"
              type="button"
              data-toggle="dropdown"
            >
             Change Video
            </button>
            <ul class="dropdown-menu">
              <li>
                <ShowModal youtube={true} image={false}/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="study"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <div className="marginTop"></div>
      <div className="children">
        <div className="toogleButton">
          <StudyAndMode />
        </div>

        <div className="task-timer">
          {!showTimer ? (
            <div className="coffe">
              <img src="coffe.png" alt="" />
            </div>
          ) : null}
          {toogle.status ? (
            <>
              <Timer task={task} />
              <div className="coffe">
                <img src="coffe.png" alt="" />
              </div>
            </>
          ) : (
            <div className="taskDetail">
              <motion.div
                className="form-design"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                exit={{ x: window.innerWidth }}
              >
                {/* // tass form */}
                <div className="task">
                  <a href="#focusFormTaskDetails">
                    <div
                      className="task-detail"
                      onClick={() => dispatch(showTaskForm())}
                    >
                      <div className="p-3 container-taskDetail">
                        <div className="taskName textmeno">
                          {task.task ? (
                            <span id="taskName"> {task.task}</span>
                          ) : (
                            <span id="taskName">Task...</span>
                          )}
                        </div>
                        <div id="timeAndEdit">
                          <div className="px-2 textmeno">
                            {task.tomato} minutes
                          </div>
                          <div className="taskEdit">
                            <img
                              id="changeSizeImg"
                              src="/vertical-ellipsis.png"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                  {study.taskForm ? (
                    <form
                      id="focusFormTaskDetails"
                      className="form"
                      onSubmit={handleSubmit}
                    >
                      <div className="taskPadding">
                        <div className="paddingUpDown">
                          <div className="addTaskDetail">
                            <div>
                              <input
                                className="inputAddTask"
                                placeholder="What do you want to do?"
                                name="task"
                                value={task.task}
                                onChange={(e) => inputsHandler(e)}
                              />
                            </div>
                            <div className="pomodoro">
                              <span>Pomodoro</span>
                              <div>
                                <input
                                  value={task.tomato}
                                  onChange={(e) => inputsHandler(e)}
                                  className="mt-2 countPomodoro textmeno"
                                  type="number"
                                  name="tomato"
                                  id="tomato"
                                  placeholder="Nhập thời gian học"
                                />
                                <button
                                  onClick={handleCounterUp}
                                  className="upPomodoro"
                                >
                                  <img src="/caret-up.png" />
                                </button>
                                <button
                                  onClick={handleCounterDown}
                                  className="downPomodoro"
                                >
                                  <img src="/caret-down.png" />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="py-2"></div>
                        </div>
                      </div>
                      <div className="saveTask">
                        <button
                          type="button"
                          className="btnSave"
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
