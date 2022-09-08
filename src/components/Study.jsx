import React, { useEffect, useRef } from "react";
// import Toogle from './Toggle/Index';

export default function Study() {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  })
  const [showModal, setShowModal] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [showFeeback, setShowFeeback] = React.useState(false);
  const [showTimer, setShowTimer] = React.useState(false);
  const handleClick = () => {
    setToggled(!toggled);
  };
  const [inputField, setInputField] = React.useState({
    task: "enter task",
    bio: "",
    tomato: 25,
  });
  const inputsHandler = (e) => {
    setInputField({ [inputRef.current.name]: inputRef.current });
    console.log(inputRef.current.name, inputRef.current.value);
  };
  const handleSubmit = (e) => {
    alert(inputField.tomato);
    e.preventDefault();
  };
  const StudyAndMode = () => {
    return (
      <>
        {/* study and mode */}
        <div className=" text-center">
          <h1 className="font-weight-bold display-1">Study</h1>
          <div>
            <label
              htmlFor="large-toggle"
              className="inline-flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                value=""
                id="large-toggle"
                // checked
                className="sr-only peer"
              />
            </label>
            <Toogle />
            <span>#Time to Focus</span>
          </div>
        </div>
      </>
    );
  };
  const FormTask = () => {
    return (
      <div className="form-design d-flex justify-content-center">
        <form className="p-3" action="" onSubmit={handleSubmit}>
          <div>
            {console.log(inputRef)}
            <input
              type="text"
              placeholder="your task..."
              name="task"
              onChange={inputsHandler}
              ref={inputRef}
              
            />{" "}
            <br />
            <input
              value={inputField.bio}
              onChange={(e) => inputsHandler(e)}
              defaultChecked
              type="radio"
              name="bio"
              id="home"
            />
            <label htmlFor="home">Home</label>
            <input
              value={inputField.bio}
              onChange={(e) => inputsHandler(e)}
              type="radio"
              name="bio"
              id="Office"
            />
            <label htmlFor="Office">Office</label>
            <input
              value={inputField.bio}
              onChange={(e) => inputsHandler(e)}
              type="radio"
              name="bio"
              id="Other"
            />
            <label htmlFor="Other">Other</label>
            <br />
          </div>
          <input
          ref={inputRef}
         
            className="text-dark"
            type="number"
            name="tomato"
            id="tomato"
            
          />
          <div>
            <button 
             className="btn btn-outline-primary"
             type="submit">Start</button>
          </div>
        </form>
      </div>
    );
  };
  const Task = () => {
    return (
      <div className="d-flex justify-content-center">
        <div id="taskText" className="p-3 mb-2 bg-light text-dark ">
          reactjs
        </div>
      </div>
    );
  };
  const Timer = () => {
    return (
      <div className="row">
        <div>
          <h2 className="text-center">Timer</h2>
        </div>
        <div id="show-Timer" className="text-center ">
          <h1 className="font-weight-bold display-1">25:00</h1>
        </div>
      </div>
    );
  };
  const Feedback = () => {
    return (
      <>
        <div className="d-flex justify-content-center feedback">
          <div className="item-center">
            <label htmlFor="hieuQua">Mức độ hiệu quả(1-10)</label>
          </div>
          <div className=" py-2">
            <select name="score" id="score">
              <option value="1">1(Không hiệu quả)</option>
              <option value="2">2(Không ăn thua)</option>
              <option value="3">3(qua chuyện)</option>
              <option value="4">4(Tàm tạm)</option>
              <option value="5">5(Trung Bình)</option>
              <option value="6">6(Vừa)</option>
              <option value="7" selected>
                7(Khá)
              </option>
              <option value="8">8(Tốt)</option>
              <option value="9">9(Hảo Hảo)</option>
              <option value="10">10(Tuyệt vời)</option>
            </select>
          </div>
          <div>
            <textarea
              className="offset-2 "
              name="notes"
              id="note"
              cols="40"
              rows="3"
              placeholder="Notes your Feedback"
            ></textarea>
          </div>
        </div>
      </>
    );
  };
  const Perfoment = () => {
    return (
      <form>
        <div className="text-center d-flex justify-content-center pt-4">
          <div id="HieuSuat">
            <div className="pb-3">
              <select class="custom-select bg-dark text-light">
                <option selected>Select perfoment</option>
                <option value="1">Bab</option>
                <option value="2">Medium</option>
                <option value="3">Great</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    );
  };
  const Toogle = () => {
    return (
      <div className="modeCSS">
        <div
          onClick={handleClick}
          className={`toogle${toggled ? " night" : ""}`}
        >
          <div
            onClick={() => {
              hideShowFeeback();
              hideTimer();
            }}
            className="notch"
          ></div>
        </div>
      </div>
    );
  };
  const hideShowFeeback = () => {
    setShowFeeback(!showFeeback);
  };
  const hideTimer = () => {
    setShowTimer(!showTimer);
  };

  return (
    <>
      <StudyAndMode />
      {showTimer ? (
        <>
          <h3 className="text-center">{inputField.task}</h3>
          <Timer />
          {/* <Perfoment /> */}
        </>
      ) : (
        <FormTask />
      )}
    </>
  );
}
