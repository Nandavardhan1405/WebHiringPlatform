import React, { useState } from 'react';
import ButtonComp from './ButtonComp';
import logo192 from '../assets/logo192.png';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isActive, setIsActive] = useState('');

  // Update the active state when a button is clicked
  const handleonClick = (name) => {
    setIsActive(name);
  };

  return (
    <div>
      <div className="bg-black pt-16 flex flex-col gap-0 h-[800px]">
        <div className={` ${isActive === 'jobs' ? 'bg-red-300' : ''} `}>
          <Link to="/" onClick={() => handleonClick('jobs')}>
            <ButtonComp text={'jobs'} img={logo192} isActive={isActive} />
          </Link>
          <div className="h-[2px] bg-red-300"></div>
        </div>
        <div className={`${isActive === 'candidates' ? 'bg-red-300' : ''} `}>
          <Link to="/candidates" onClick={() => handleonClick('candidates')}>
            <ButtonComp text={'candidates'} img={logo192} isActive={isActive} />
          </Link>
          <div className="h-[2px] bg-red-300"></div>
        </div>
        <div className={`${isActive === 'assessments' ? 'bg-red-300' : ''} `}>
          <Link to="/assessments" onClick={() => handleonClick('assessments')}>
            <ButtonComp text={'assessments'} img={logo192} isActive={isActive} />
          </Link>
          <div className="h-[2px] bg-red-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
