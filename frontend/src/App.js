import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import Jobs from './components/Jobs';
import Candidates from './components/Candidates';
import Assessments from './components/Assessments';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <div className="w-full" >
          <Header/> 
        </div>

        <div className="w-full flex-1 overflow-y-auto h-auto" >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/candidates/:jobId" element={<Candidates />} />
            <Route path="/assessments" element={<Assessments />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
