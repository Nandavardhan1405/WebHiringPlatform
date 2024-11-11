import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, X, Users, Briefcase, ClipboardCheck } from 'lucide-react';

const NavigationHeader = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, path: '/jobs' },
    { id: 'assessments', label: 'Assessments', icon: ClipboardCheck, path: '/assessments' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 md:px-16">
      <div className="container mx-auto px-4">
      <nav className="flex items-center justify-between h-16 space-between">
        {/* Logo Section */}
        {location.pathname === '/' ? (
          <div className="flex-shrink-0 flex items-center">
            <div className="relative group">
              <h1 className="relative text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 transition-all duration-300">
                ENT
                <span className="inline-block">NT</span>
              </h1>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full" />
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-purple-400 rounded-full" />
            </div>
          </div>
        ) : (
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
        )}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
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

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
            {navItems.slice(1).map(({ id, label, icon: Icon, path }) => (
              <Link
                key={id}
                to={path}
                onClick={() => {
                  setActiveItem(id);
                  setIsMenuOpen(false);
                }}
                className={`
                  flex items-center px-3 py-2.5 rounded-lg text-sm font-medium w-full
                  transition-colors duration-150 ease-in-out
                  ${activeItem === id 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <Icon className="h-4 w-4 mr-3" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
    </header>
  );
};

export default NavigationHeader;