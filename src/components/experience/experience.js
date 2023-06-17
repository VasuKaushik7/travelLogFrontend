import * as React from 'react';
import './experience.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useEffect } from 'react';

export default function Experience(props) {

    console.log("props------->", props);
    const[likes,setLikes]=React.useState(props.data.likes);
    const[dislikes,setDisLikes]=React.useState(props.data.dislikes);
   
    function liked() {
        console.log("liked")
        fetchLogs(true);
    }
    function disliked() {
        console.log("disliked")
        fetchLogs(false)
    }
    React.useEffect(() => {
    
            console.log("inside update count");
            
            const fetchLikes = async () => {
                try {
                  const response = await fetch("https://travel-log-backend.onrender.com/likes/"+props.data._id);
                  const log1= await response.json();
                    console.log("response---->",log1);
                    setLikes(log1.likes);
                    setDisLikes(log1.dislikes)
                  }
                  
                catch (error) {
                  console.log(error);
                }
              };
              fetchLikes();
        
      },[likes]);
    const fetchLogs = async (liked) => {
        let actionName;
        if(liked){
            actionName="liked"
        }
        else{
            actionName="disliked"
        }
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: props.data._id, action: actionName })
            };
            fetch('https://travel-log-backend.onrender.com/likes', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setLikes(null);

                    console.log(data,"likes--->",likes)});
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className='experience'>
                <p>Title: {props.data.title}</p>
                <p>Description: {props.data.description}</p>
                <div className='reactions'>
                    <p style={{ "margin": "4px" }}>{likes}</p>
                    <ThumbUpIcon onClick={liked}></ThumbUpIcon>
                    <ThumbDownAltIcon onClick={disliked}></ThumbDownAltIcon>
                    <p style={{ "margin": "3px" }}>{dislikes}</p>
                </div>
            </div>
        </>
    )
}