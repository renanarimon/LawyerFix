import React, { useState } from 'react'
import SnackbarContent from '@mui/material/SnackbarContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { getDatabase, ref, child, get } from "firebase/database";
import Message from './Message';
import { Box } from '@mui/system';
import Title from './Title';



const Messages = ({messages}) => {

  

  return (
    
    
    <div className='messages-container'>
      <Title title={"CHAT WITH LAWYER"} />
    {Object.entries(messages).map((k) => (
      <Message name={k[0]} text={k[1]}>{k}</Message>
    ))}

  </div>

 
    

  )
}

export default Messages
