import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Candidates from './components/Candidates';
import Assessments from './components/Assessments';

function App() {
  const [SidebarToggle,SetSidebarToggle]=useState(true)
  return (
    <BrowserRouter>
    <div className='flex justify-normal h-full'>
       
      {/* Sidebar */}
      <div className='w-[15%]'>
      {SidebarToggle && <Sidebar />}
      </div>
      {/* <Button className='relative x-0 y-0'>close</Button> */}
      {/* main content */}
      <div className='w-[85%]'>
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/candidates' element={<Candidates />} />
        <Route path='/assessments' element={<Assessments />} />
      </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
