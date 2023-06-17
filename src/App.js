import logo from './logo.svg';
import './App.css';
import Dashoard from './components/dashboard/dashboard'
import {Routes, Route} from 'react-router-dom';
import AddExperience from './components/addexperience/addexperience';

function App() {
  return (
    <div className="App">
      

      <Routes>
          
          <Route path="/" element={<Dashoard />} />
          <Route path="/addExperience" element={<AddExperience />} />
        </Routes>
    </div>
  );
}

export default App;
