import React from 'react'
import MissionsComponent from './MissionsComponent';
import { Box, styled } from '@mui/material'

const caseTypes = [
  {
      id: 1,
      topic: 'צוואה',
      missions: ['בקשת קבלה','אישור עורך דין','ניסוח צוואה','אישור הלקוח','רישום הצוואה באתר משרד המשפטים']
  },
  {
    id: 2,
    topic: 'דוח משטרה',
    missions: ['בקשת קבלה','אישור עורך דין','ניסוח צוואה']
},
{
  id: 3,
  topic: 'תביעה ייצוגית מול חברה',
  missions: ['בקשת קבלה','אישור עורך דין','ניסוח צוואה','אישור הלקוח','רישום הצוואה באתר משרד המשפטים','אישור הלקוח','רישום הצוואה באתר משרד המשפטים']
}
]

const MissionsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
})

export const ClientScreen = ({caseTypeId, currStage}) => {
  const caseType = caseTypes.filter((item) => item.id == caseTypeId)[0];

  return (
    <MissionsContainer>
      <MissionsComponent caseType={caseType} currStage={currStage}/>
    </MissionsContainer>
  )
}

export default ClientScreen