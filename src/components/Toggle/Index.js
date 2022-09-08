import React from 'react';
import './style.css';

export default function Toogle() {
  const [toggled, setToggled] = React.useState(false);
  const handleClick = () => {
    setToggled(!toggled);
  };

  return (
    <div className='modeCSS'>
      <div
        onClick={handleClick}
        className={`toogle${toggled ? ' night' : ''}`}
      >
        <div className='notch'></div>
      </div>
    </div>
  );
}
