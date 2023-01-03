import React, { useEffect, useState } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatIcon from '@mui/icons-material/Chat';
import Tooltip from '@mui/material/Tooltip';
import { getDatabase, ref, child, get, set, update, remove } from "firebase/database";
import EditCase from './EditCase';
import EdittedCase from './EdittedCase';
import Messages from './Messages';
import WriteMessage from './WriteMessage';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const QuickChanges = (props) => {
  const [OpenEditCase, setOpenEditCase] = React.useState(false);
  const [OpenMessages, setOpenMessages] = React.useState(false);
  const [messages, SetMessages] = useState([])
  const [currCaseDetails, setCurrCaseDetails] = React.useState();

  // function promoteCaseStage() {
  //     const db = getDatabase();
  //     let plaster = 'Cases/' + props.CaseNum;
  //     console.log("casenum: " + props.CaseNum)
  //     console.log("CurrStage: " + props.CurrStage)
  //     update(ref(db, plaster), {
  //         CurrStage : props.CurrStage + 1,
  //     })
  // }
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
    // FilterCurrCase()
    
    
  }
  const handleSetCloseEditCase = () => {
    setOpenEditCase(false)
  }

  const handleOpenMessages = () => {
    GetMessages()
    setOpenMessages(true)
  }
  const handleCloseMessages = () => {
    setOpenMessages(false)
  }


  const changeStatusCase = () => {
    const db = getDatabase();
    const dbref = ref(getDatabase());
    let plaster = 'Cases/' + props.CaseNum;
  
    get(child(dbref, plaster)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log("snapshot.val().Status: ", snapshot.val().Status)
        let curr_status = snapshot.val().Status;
        let s = 0;
        if (curr_status === 0) {
          s = 1
        }else{
          s=0
        }
        console.log("new s: " + curr_status)
        update(ref(db, plaster), {
          Status: s,
        })
      } else {
        console.log("ERROR")
      }
    }).catch((error) => {
      console.log("catch ERROR")
      console.error(error);
    });
  }
  

  const FilterCurrCase = () => {
    const db = getDatabase();
    const dbref = ref(getDatabase());
    let plaster = 'Cases/' + props.CaseNum;
  
    get(child(dbref, plaster)).then((snapshot) => {
      if (snapshot.exists()) {
        let s = snapshot.val()
        console.log("snapshot.val(): ", (Object.values(s)))
        setCurrCaseDetails(Object.values(s))
        setOpenEditCase(true)
      } else {
        console.log("ERROR")
      }
    }).catch((error) => {
      console.log("catch ERROR")
      console.error(error);
    });
  };

  const handleEdit = () => {
    handleSetOpenEditCase()
  }

  return (
    <div>

      <Tooltip title="ערוך תיק">
        <Fab color="brown" aria-label="edit" onClick={handleEdit}>
          <EditIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="שנה סטטוס">
        <Fab color="brown" aria-label="remove" onClick={changeStatusCase}>
          <ToggleOnIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="הודעות">
        <Fab color="brown" aria-label="massages" onClick={handleOpenMessages}>
          <ChatIcon />
        </Fab>
      </Tooltip>
      <>
        {
          OpenEditCase &&
          <Dialog open={OpenEditCase} onClose={handleSetCloseEditCase}>
            {/* <DialogTitle>עריכת תיק</DialogTitle> */}
            <DialogContent>
              {/* <EdittedCase currCaseDetails={currCaseDetails} currHandlingLawyers={props.currHandlingLawyers} setShowCase={setShowCase} setCurrCaseDetails={setCurrCaseDetails} currCaseTypeDetails={props.currCaseTypeDetails} /> */}
            </DialogContent>
          </Dialog>
        }

        {
          OpenMessages &&
          <Dialog open={OpenMessages} onClose={handleCloseMessages}>
            <DialogContent>
              <Messages messages={messages} />
              <WriteMessage caseNum={props.CaseNum} userType={1} GetMessages={GetMessages} />
            </DialogContent>
          </Dialog>
        }
      </>

    </div>
  )
}

export default QuickChanges