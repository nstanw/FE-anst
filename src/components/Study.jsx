import React from 'react';
// import Toogle from './Toggle/Index';

export default function Study() {
  const [showModal, setShowModal] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [showTooleMode, setShowTooleMode] = React.useState(true);
  const [showTimer, setShowTimer] = React.useState(false);
  const handleClick = () => {
    setToggled(!toggled);
  };
  const [inputField, setInputField] = React.useState({
    task: '',
    bio: '',
    tomato: '',
  });
  const inputsHandler = (e) => {
    setInputField({ [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    alert(inputField.task);
    e.preventDefault();
  };
  const StudyAndMode = () => {
    return (
      <>
        {/* study and mode */}
        <div className=' text-center'>
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
            <span>#Time to Focus</span>
          </div>
        </div>
      </>
    );
  };
  const Modal = () => {
    return (
      <div>
        <div
          className='modal fade '
          id='exampleModal'
          tabIndex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog '>
            <div className='modal-content'>
              <div className='modal-header bg-secondary text-white'>
                <h5
                  className='modal-title'
                  id='exampleModalLabel'
                >
                  new task
                </h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              {/* body */}
              <div className='modal-body bg-info text-dark'>
                <form
                  className=' p-3'
                  action=''
                  onSubmit={handleSubmit}
                >
                  <div>
                    <input
                      type='text'
                      placeholder='your task...'
                      name='task'
                      onChange={(e) => inputsHandler(e)}
                    />{' '}
                    <br />
                    <input
                      onChange={inputsHandler}
                      defaultChecked
                      type='radio'
                      name='bio'
                      id='home'
                    />
                    <label htmlFor='home'>Home</label>
                    <input
                      onChange={inputsHandler}
                      type='radio'
                      name='bio'
                      id='Office'
                    />
                    <label htmlFor='Office'>Office</label>
                    <input
                      onChange={inputsHandler}
                      type='radio'
                      name='bio'
                      id='Other'
                    />
                    <label htmlFor='Other'>Other</label>
                    <br />
                  </div>
                  <input
                    onChange={inputsHandler}
                    className='text-dark'
                    type='number'
                    name='tomato'
                    id='tomato'
                    defaultValue={25}
                  />
                </form>
              </div>
              <div className='modal-footer bg-secondary text-white'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Close
                </button>
                <button
                  type='submit'
                  className='btn btn-primary'
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const Task = () => {
    return (
      <div className='d-flex justify-content-center'>
        <div
          id='taskText'
          className='p-3 mb-2 bg-light text-dark '
        >
          reactjs
        </div>
      </div>
    );
  };
  const Timer = () => {
    return (
      <>
        <div>
          <h2 className='text-center'>Timer</h2>
        </div>
        <div
          id='show-Timer'
          className='text-center '
        >
          <h1 className='font-weight-bold display-1'>25:00</h1>
        </div>
      </>
    );
  };
  const Perfoment = () => {
    return (
      <form>
        <div className='text-center d-flex justify-content-center pt-4'>
          <div id='HieuSuat'>
            <div className='pb-3'>
              <select class='custom-select bg-dark text-light'>
                <option selected>Select perfoment</option>
                <option value='1'>Bab</option>
                <option value='2'>Medium</option>
                <option value='3'>Great</option>
              </select>
            </div>
           
           
          </div>
        </div>
      </form>
    );
  };
  const Toogle = () => {
    return (
      <div className='modeCSS'>
        <div
          onClick={handleClick}
          className={`toogle${toggled ? ' night' : ''}`}
        >
          <div
            onClick={() => {
              hideToogleMode();
              hideTimer();
            }}
            className='notch'
          ></div>
        </div>
      </div>
    );
  };
  const hideToogleMode = () => {
    setShowTooleMode(!showTooleMode);
  };
  const hideTimer = () => {
    setShowTimer(!showTimer);
  };

  return (
    <>
          <StudyAndMode />
          <Task />
      {showTooleMode ? (
        <>
          <div className='d-flex justify-content-center p-4'>
            <button
              type='button'
              className='btn btn-secondary  '
              data-bs-toggle='modal'
              data-bs-target='#exampleModal'
              aria-expanded='false'
              onClick={() => setShowModal(true)}
            >
              Add Task
            </button>
          </div>
          {showModal ? (
            <div>
              <div
                className='modal fade '
                id='exampleModal'
                tabIndex='-1'
                aria-labelledby='exampleModalLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog '>
                  <div className='modal-content'>
                    <div className='modal-header bg-secondary text-white'>
                      <h5
                        className='modal-title'
                        id='exampleModalLabel'
                      >
                        new task
                      </h5>
                      <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                      ></button>
                    </div>
                    {/* body */}
                    <div className='modal-body bg-info text-dark'>
                      <form
                        className=' p-3'
                        action=''
                        onSubmit={(e) => handleSubmit(e)}
                      >
                        <div>
                          <input
                            type='text'
                            placeholder='your task...'
                            name='task'
                            onChange={(e) => inputsHandler(e)}
                          />{' '}
                          <br />
                          <input
                            onChange={inputsHandler}
                            defaultChecked
                            type='radio'
                            name='bio'
                            id='home'
                          />
                          <label htmlFor='home'>Home</label>
                          <input
                            onChange={inputsHandler}
                            type='radio'
                            name='bio'
                            id='Office'
                          />
                          <label htmlFor='Office'>Office</label>
                          <input
                            onChange={inputsHandler}
                            type='radio'
                            name='bio'
                            id='Other'
                          />
                          <label htmlFor='Other'>Other</label>
                          <br />
                        </div>
                        <input
                          onChange={inputsHandler}
                          className='text-dark'
                          type='number'
                          name='tomato'
                          id='tomato'
                          defaultValue={25}
                        />
                      </form>
                    </div>
                    <div className='modal-footer bg-secondary text-white'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                      >
                        Close
                      </button>
                      <button
                        type='submit'
                        className='btn btn-primary'
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </>
         
      ) : null}
      {showTimer ? (
        <>
          <Timer />
          {/* <Perfoment /> */}
        </>
      ) : null}
    </>
  );
}
