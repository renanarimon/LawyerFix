import React, { useEffect, useState } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatIcon from '@mui/icons-material/Chat';
import Tooltip from '@mui/material/Tooltip';
import { getDatabase, ref, child, get, set, update, remove } from "firebase/database";
// import EditCase from './EditCase';
import EdittedCase from './EdittedCase';
import Messages from './Messages';
import WriteMessage from './WriteMessage';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const QuickChanges = ( props ) => {
    const [OpenEditCase, setOpenEditCase] = React.useState(false);
    const [OpenMessages, setOpenMessages] = React.useState(false);
    const [messages, SetMessages] = useState([])
    function promoteCaseStage() {
        const db = getDatabase();
        let plaster = 'Cases/' + props.CaseNum;
        console.log("casenum: " + props.CaseNum)
        console.log("CurrStage: " + props.CurrStage)
        update(ref(db, plaster), {
            CurrStage : props.CurrStage + 1,
        })
    }
    const GetMessages = React.useCallback(() => {
      if (true) {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `Requests/${props.CaseNum}`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val())
            SetMessages(snapshot.val())
          } else {
            SetMessages([])
            console.log("cant find ref")
  
          }
        }).catch((error) => {
          console.error(error);
        });
      }
    }, [true])

    const handleSetOpenEditCase = () => {
        setOpenEditCase(true)
    }
    const handleSetCloseEditCase = () => {
        setOpenEditCase(false)
    }

    const handleOpenMessages = () =>{
      GetMessages()
      setOpenMessages(true)
    }
    const handleCloseMessages = () =>{
      setOpenMessages(false)
    }

    const removeCase=() =>{
        const db = getDatabase();
        let plaster = 'Cases/' + props.CaseNum;
        remove(ref(db, plaster))
    }

    const handleEdit = () =>{
        handleSetOpenEditCase()
        editCase()
    }



    const editCase = () =>{
        console.log("edit")
        const db = getDatabase();
        let plaster = 'Cases/' + props.CaseNum;
    }

    

    return (
        <div>
      <Tooltip title="קדם שלב">
        <Fab color="primary" aria-label="add" onClick={promoteCaseStage}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="ערוך תיק">
        <Fab color="primary" aria-label="edit" onClick={handleEdit}>
          <EditIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="מחק תיק">
        <Fab color="primary" aria-label="remove" onClick={removeCase}>
          <DeleteIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="הודעות">
        <Fab color="primary" aria-label="massages" onClick={handleOpenMessages}>
          <ChatIcon />
        </Fab>
      </Tooltip>
      <>
      {
        OpenEditCase &&
        <Dialog open={OpenEditCase} onClose={handleSetCloseEditCase}>
            <DialogTitle>בקשה לעורך דין</DialogTitle>
            <DialogContent>
                <EdittedCase/>
            </DialogContent>
        </Dialog>
      }

      {
        OpenMessages &&
        <Dialog open={OpenMessages} onClose={handleCloseMessages}>
            <DialogContent>
              <Messages messages={messages}/>
              <WriteMessage caseNum={props.CaseNum} userType={1} GetMessages={GetMessages}/>
            </DialogContent>
        </Dialog>
      }
      </>
      
        </div>
    )
}

export default QuickChanges