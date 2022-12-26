import React, { useState } from 'react'
import SnackbarContent from '@mui/material/SnackbarContent';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { getDatabase, ref, child, get } from "firebase/database";
import Message from './Message';
import { Box } from '@mui/system';



const Massages = ({messages}) => {

  return (
    <div style={{display:'grid' , textAlign:'center', justify_items: 'center'}}>
      {Object.values(messages).map(message => (
        <Message text={message}>{message}</Message>
      ))}
    </div>

  )
}

export default Massages
