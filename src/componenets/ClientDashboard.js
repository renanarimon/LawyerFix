import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import ClientCaseView from './ClientCaseView';
import { getDatabase, ref, child, get } from "firebase/database";
import ClientReq from './ClientReq';
import ClientRequests from './ClientRequests';
import Messages from './Messages';
import WriteMessage from './WriteMessage';


const ClientSearch = ({userUID}) => {
  const [showSearch, setShowSearch] = useState(true);
  const [clientCaseId, setClientCaseId] = React.useState('');
  const [currCaseDetails, setCurrCaseDetails] = React.useState('');
  const [messages, SetMessages] = useState([])


  const GetCaseData = React.useCallback((clientCaseId) => {
    if (true) {
      console.log(clientCaseId)
      const dbRef = ref(getDatabase());
      get(child(dbRef, `Cases/${clientCaseId}`)).then((snapshot) => {
        if (snapshot.exists() && snapshot.val().UID === userUID) {
          setCurrCaseDetails(snapshot.val())
        } else {
          alert("case number dosen't belong to this user")
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [true])

  const GetMessages = React.useCallback((clientCaseId) => {
    if (true) {
      // console.log(clientCaseId)
      const dbRef = ref(getDatabase());
      get(child(dbRef, `Requests/${clientCaseId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val())
          SetMessages(snapshot.val())

        } else {
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [true])

  const handleClientCaseId = (event) => {
    setClientCaseId(event.target.value);
  };

  const OnSearchClick = () => {
    GetCaseData(clientCaseId)
    GetMessages(clientCaseId)
    // console.log(messages)
  };

  useEffect(() => {
    if (currCaseDetails !== '') {
      setShowSearch(false)
    }
  }, [currCaseDetails]);

  const backToSearchBar = () => {
    setShowSearch(true)
  };

  return (
    <>
      {showSearch ?
        <div className='container' style={{ justifyContent: 'center', display: 'grid' }}>
          <TextField id="filled-basic" label='מספר תיק' onChange={handleClientCaseId} variant="filled" />
          <div>
            <button onClick={OnSearchClick} className="btn-casetype" style={{ width: '100%', marginTop: '20px' }}>חפש</button>
          </div>
          {/* <Button onClick={OnSearchClick}  variant="contained">חפש</Button> */}
        </div>
        :
        <>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{float: 'left', width: '30%'}}>
            <Messages messages={messages}/>
            <WriteMessage caseNum={clientCaseId} userType={0}/>
            {/* <ClientReq/> */}
            
          </div>
          <div style={{float: 'right', width: '60%'}}>
            <ClientCaseView currCaseDetails={currCaseDetails} backToSearchBar={backToSearchBar}/> 
          </div>
        </div>
        </>
      }
    </>

  )
}
export default ClientSearch