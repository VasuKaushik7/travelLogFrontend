import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import "./addexperience.css"
import Button from '@mui/material/Button';
import {useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
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
  const [onTitleEmpty,setTitleEmpty]=useState(false);
  const [onDescriptionEmpty,setDescEmpty]=useState(false);
  const [loader,setLoader]=useState(false);
  const navigate=useNavigate();
  function handleTitle(event){
    setTitle(event.target.value);
    setTitleEmpty(false);
    console.log(event.target.value);
  }

  function handleDescription(event){
    setDescription(event.target.value);
    setDescEmpty(false);
    console.log(event.target.value);
  }

  function handleSubmit(){
    
    if(title==='' && description===''){
      setDescEmpty(true);
      setTitleEmpty(true);
    }
    else if(title===''){
 
      setTitleEmpty(true);
    }
    else if(description===''){
      setDescEmpty(true);

    }
    else{
      setLoader(true);
      console.log("title------>",title,"description------------->",description);
      const addLog = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title:title, description:description })
            };
           await fetch('https://travel-log-backend.onrender.com/logs', requestOptions)
                .then(response => response.json())
                .then(data => {
                  setLoader(false);
                  console.log("data---->",data);
                  
                  navigate('/',{
                    state: {
                      added:true
                    }
                  })
        });
        } catch (error) {
            console.log(error);
        }
    };
    addLog();
    }
    
  
    
  }

  function handleBlurTitle(){
      if(title.trim()===''){
        console.log("title is empty");
        setTitleEmpty(true);
      }
  }
  function handleBlurDescription(){
    if(description.trim()===''){
      console.log("description is empty");
      setDescEmpty(true);
    }
  }
  return (
    <>
    <Box sx={{ flexGrow: 1 , padding:"10%" }}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <Item>Title*</Item>
        </Grid>
        <Grid xs={8}>
          <Item>
          
            <textarea value={title} onChange={handleTitle} onBlur={handleBlurTitle} className='text'></textarea>
           
          </Item>
          {onTitleEmpty&&<p className='error'>*Title is required</p>}
        </Grid>

        <Grid xs={4}>
          <Item>Experience*</Item>
        </Grid>
        <Grid xs={8}>
          <Item >
          
            <textarea style={{height: "145px"}}value={description} onChange={handleDescription} onBlur={handleBlurDescription} className='text'></textarea>
            
          </Item>
          {onDescriptionEmpty&&<p className='error'>*Description is required</p>}
        </Grid>
       
      </Grid>
      
    </Box>
    <div className='shareButton'>
    {!loader&&<Button onClick={handleSubmit} variant="contained">Add Your Experience</Button>}
    {loader&&<CircularProgress />}
    </div>
    </>
    
  );
}