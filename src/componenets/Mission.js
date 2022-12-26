import React from 'react'
import { Box, styled, Typography } from '@mui/material'

const Level = styled(Box)(({ success }) => ({
    display: 'flex',
    flexDirection: 'row',
    height: 40, 
    border: success ? '1px solid #20904f' : '1px solid black',
    color: success ?  '#20904f' : 'black',
    borderRadius: 8,
    marginBottom: 8,
    padding: 8,
    width: '80%'
}))


const Mission = (props) => {
  const {success = false, stageNum, description} = props

  return (
    <Level success={success}>
        <Typography sx={{ lineHeight: 1 }} variant='h6'>
            {stageNum}
        </Typography>
        <Typography sx={{ lineHeight: 1 }} mr={4} variant='h6'>
            {description}
        </Typography>
    </Level>
    
  )
}

export default Mission