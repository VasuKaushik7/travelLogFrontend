import * as React from 'react';
import Button from '@mui/material/Button';
import './dashboard.css'
import Experience from '../experience/experience'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Dashoard() {
  const navigate = useNavigate();
  const [logs,setLogs]=React.useState([]);
  function navigateToAddExperience() {
    navigate('/addExperience');
  }

  const fetchLogs = async () => {
    try {
      const response = await fetch("https://travel-log-backend.onrender.com/logs");
      const log1= await response.json();
      if(logs.length==0){
        console.log("inside If")
        console.log("response---->",log1);
        setLogs(log1);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (logs.length==0) {
      fetchLogs();
    }
  }, [logs]);


  return (
    <div className='container'>
      <Button onClick={navigateToAddExperience} variant="contained">Share Your Experience</Button>
      <p>Already Shared Experiences</p>
      {
        logs.map((log,index)=>{
          return <Experience key={index} data={log} />
        })
      }
 
    </div>
  );
}