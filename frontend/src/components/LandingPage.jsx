import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [showText, setShowText] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 500);
    setTimeout(() => setShowButtons(true), 1500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white-50 to-indigo-100 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-black flex flex-col relative">

      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-indigo-100 opacity-60 dark:from-gray-800 dark:via-gray-900 dark:to-black animate-gradient-background"></div>

      <div className="flex-1 flex items-center justify-center px-6 py-16 sm:py-32 relative z-10">
        <div className="text-center text-gray-900 dark:text-white">
          <div className="overflow-hidden">
            <h1 
              className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 transform transition-all duration-1000 ease-out ${
                showText ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            >
              Welcome to the Future of
              <span className="block text-blue-600 dark:text-blue-400 mt-4">
                Hiring Excellence
              </span>
            </h1>
          </div>

          <div 
            className={`space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-1000 ease-out ${
              showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Link 
              to="/jobs"
              className="inline-flex items-center px-8 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 ease-in-out mx-2 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              View Jobs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              to="/assessments"
              className="inline-flex items-center px-8 py-3 rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-800 dark:hover:text-white transition-all duration-300 ease-in-out mx-2"
            >
              Assessments
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <footer className="py-4 text-center text-gray-600 bg-white/50 dark:bg-black/50 dark:text-gray-400">
        <p>© 2024 ENTNT. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
