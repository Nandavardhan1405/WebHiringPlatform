import React, { useState } from 'react';
import ButtonComp from './ButtonComp';
import logo192 from '../assets/logo192.png';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isActive, setIsActive] = useState('');

  const handleonClick = (name) => {
    setIsActive(name);
  };

  return (
    <header className="bg-black py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" onClick={() => handleonClick('home')}>
          <img src={logo192} alt="Logo" className="h-8 w-8" />
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link to="/" onClick={() => handleonClick('jobs')}>
            <ButtonComp
              text="Jobs"
              img={logo192}
              isActive={isActive === 'jobs'}
              className={isActive === 'jobs' ? 'text-red-300' : 'text-white'}
            />
          </Link>
          <Link to="/candidates" onClick={() => handleonClick('candidates')}>
            <ButtonComp
              text="Candidates"
              img={logo192}
              isActive={isActive === 'candidates'}
              className={isActive === 'candidates' ? 'text-red-300' : 'text-white'}
            />
          </Link>
          <Link to="/assessments" onClick={() => handleonClick('assessments')}>
            <ButtonComp
              text="Assessments"
              img={logo192}
              isActive={isActive === 'assessments'}
              className={isActive === 'assessments' ? 'text-red-300' : 'text-white'}
            />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Sidebar;
