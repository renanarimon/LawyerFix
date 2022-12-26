import React from 'react'
import { styled, Box, Typography } from '@mui/material'
import Mission from './Mission'



const Missions = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    paddingBottom: 24,
    border: '1px solid black', 
    maxWidth: 550,
    borderRadius: 4,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center'
})
const MissionsComponent = (props) => {
  const {caseType, currStage} = props

  return (
    <Missions>
        <Typography variant='h4' mb='8px' >{caseType.topic}</Typography>
        {caseType.missions.map((mission, index) => { 
            const success = index === currStage - 1 ?? false;
            return <Mission key={mission} success={success} description={mission} stageNum={index+1}/>
        })}
    </Missions>
    
  )
}

export default MissionsComponent