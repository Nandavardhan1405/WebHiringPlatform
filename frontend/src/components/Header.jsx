import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, Briefcase, ClipboardCheck } from 'lucide-react';

const NavigationHeader = () => {
  const [activeItem, setActiveItem] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, path: '/jobs' },
    { id: 'assessments', label: 'Assessments', icon: ClipboardCheck, path: '/assessments' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={() => setActiveItem('home')}
          >
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">HOME</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navItems.slice(1).map(({ id, label, icon: Icon, path }) => (
              <Link
                key={id}
                to={path}
                onClick={() => setActiveItem(id)}
                className={`
                  flex items-center px-3 py-2 rounded-lg text-sm font-medium
                  transition-colors duration-150 ease-in-out
                  ${activeItem === id 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavigationHeader;