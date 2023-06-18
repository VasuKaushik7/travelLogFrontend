import * as React from 'react';
import Button from '@mui/material/Button';
import './dashboard.css'
import Experience from '../experience/experience'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Dashoard() {
  const navigate = useNavigate();
  const [logs,setLogs]=React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [flag,setFlag]=React.useState(0);
  const { state } = useLocation();

  function navigateToAddExperience() {
    navigate('/addExperience');
  }
  console.log("state------>",state);
  if(state && state.added && !open && flag==0){
    setOpen(true);
    setTimeout(() => {
      setFlag(1);
      setOpen(false)
    }, 2000);
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
      <Snackbar open={open} autoHideDuration={2000} >
        <Alert severity="success" sx={{ width: '100%' }}>
          Experience added successfully!
        </Alert>
      </Snackbar>
      {
        logs.map((log,index)=>{
          return <Experience key={index} data={log} />
        })
      }
      
    </div>
  );
}