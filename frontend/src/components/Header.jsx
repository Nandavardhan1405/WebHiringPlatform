import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, X, Briefcase, ClipboardCheck, Moon, Sun } from 'lucide-react';
import { ThemeContext } from '../context/themeProvider';

const NavigationHeader = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, path: '/jobs' },
    { id: 'assessments', label: 'Assessments', icon: ClipboardCheck, path: '/assessments' }
  ];

  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <header className="bg-blue-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 md:pl-16 md:pr-8 shadow-sm md:shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
        
          {location.pathname === '/' ? (
            <div className="flex-shrink-0 flex items-center">
              <div className="relative group">
                <h1 className="relative text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 hover:from-blue-500 hover:to-purple-700 transition-all duration-300 dark:from-purple-400 dark:to-blue-600 dark:hover:from-purple-500 dark:hover:to-blue-700">
                  ENT
                  <span className="inline-block">NT</span>
                </h1>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 dark:bg-purple-500 rounded-full" />
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-purple-400 dark:bg-blue-500 rounded-full" />
              </div>
            </div>
          ) : (
            <Link 
              to="/" 
              className="flex items-center space-x-2"
              onClick={() => setActiveItem('home')}
            >
              <div className="h-8 w-8 bg-blue-600 dark:bg-blue-700 rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900 dark:text-gray-200">HOME</span>
            </Link>
          )}

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

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
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-blue-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'}
                `}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </Link>
            ))}
            <button onClick={toggleTheme} className="p-2 rounded-lg text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-blue-200 focus:outline-none">
              {theme === "dark" ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {isMenuOpen && (
  <div className="md:hidden">
    <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
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
              ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300' 
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'}
          `}
        >
          <Icon className="h-4 w-4 mr-3" />
          {label}
        </Link>
      ))}
      
      <button
        onClick={toggleTheme}
        className="flex items-center w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ease-in-out
                   text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none"
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4 mr-3" />
        ) : (
          <Moon className="h-4 w-4 mr-3" />
        )}
        {theme === "dark" ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  </div>
)}

      </div>
    </header>
  );
};

export default NavigationHeader;