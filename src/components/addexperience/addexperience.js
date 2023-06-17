import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import "./addexperience.css"
import Button from '@mui/material/Button';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AddExperience() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate=useNavigate();
  function handleTitle(event){
    setTitle(event.target.value);
    console.log(event.target.value);
  }

  function handleDescription(event){
    setDescription(event.target.value);
    console.log(event.target.value);
  }

  function handleSubmit(){
    console.log("title------>",title,"description------------->",description);
    const addLog = async () => {
      try {
          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ title:title, description:description })
          };
          fetch('/logs', requestOptions)
              .then(response => response.json())
              .then(data => {
                console.log("data---->",data);
      });
      } catch (error) {
          console.log(error);
      }
  };
  addLog();
    navigate('/')
  }
  return (
    <>
    <Box sx={{ flexGrow: 1 , padding:"10%" }}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <Item>Title</Item>
        </Grid>
        <Grid xs={8}>
          <Item>
          
            <textarea value={title} onChange={handleTitle} className='text'></textarea>
          </Item>
        </Grid>

        <Grid xs={4}>
          <Item>Experience</Item>
        </Grid>
        <Grid xs={8}>
          <Item style={{height: "347%"}}>
          
            <textarea value={description} onChange={handleDescription} className='text'></textarea>
          </Item>
        </Grid>
      </Grid>
      
    </Box>
    <div className='shareButton'>
    <Button onClick={handleSubmit} variant="contained">Add Your Experience</Button>
    </div>
    </>
    
  );
}