import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [showText, setShowText] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Trigger text animation after component mount
    setTimeout(() => setShowText(true), 500);
    // Trigger buttons animation after text
    setTimeout(() => setShowButtons(true), 1500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      {/* Navigation */}
      {/* <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">
                ENTNT
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <a href="/jobs" className="text-gray-600 hover:text-blue-600 transition-colors">Jobs</a>
              <a href="/assessments" className="text-gray-600 hover:text-blue-600 transition-colors">Assessments</a>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          {/* Animated text */}
          <div className="overflow-hidden">
            <h1 
              className={`text-4xl md:text-6xl font-bold text-gray-900 mb-6 transform transition-all duration-1000 ease-out ${
                showText ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
            >
              Welcome to the Future of
              <span className="block text-blue-600 mt-2">Hiring Excellence</span>
            </h1>
          </div>

          {/* Animated buttons */}
          <div 
            className={`space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-1000 ease-out ${
              showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Link 
              href="/jobs"
              className="inline-flex items-center px-8 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors mx-2"
            >
              View Jobs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/assessments"
              className="inline-flex items-center px-8 py-3 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors mx-2"
            >
              Assessments
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-600 bg-white/50">
        <p>© 2024 ENTNT. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;