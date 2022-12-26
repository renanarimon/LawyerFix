import React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material';
import LawyerDashboard from './LawyerDashboard';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import ClientSearch from './ClientSearch';
import { getDatabase, ref, child, get } from "firebase/database";


const LawyerLogin = ({loginType, setConnected}) => {

  const [showAdmin, setShowAdmin] = useState(true);
  const [lawyerUsername, setLawyerUsername] = useState('');
  const [lawyerPassword, setLawyerPassword] = useState('');
  const [userUID, setUserUid] = useState('');

  const handleLawyerUsername = (event) => {
    setLawyerUsername(event.target.value);
  };
  const handleLawyerPassword = (event) => {
    setLawyerPassword(event.target.value);
  };
  const GetLawyerLogin = React.useCallback((lawyerUsername, lawyerPassword) => {
    if (true) {
      console.log(lawyerUsername)
      console.log(lawyerPassword)
      signInWithEmailAndPassword(auth, lawyerUsername, lawyerPassword)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const dbRef= ref(getDatabase());
          get(child(dbRef, `${loginType}/${user.uid}`)).then((snapshot)=> {
            if(snapshot.exists()){
              setShowAdmin(false)
              setConnected(true)
              setUserUid(user.uid)
              console.log('user.uid:',user.uid)
            }
          })
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('problem')
        });
    }
  }, [true])


  const OnLoginClick = () => {
    GetLawyerLogin(lawyerUsername, lawyerPassword)
  };
  
  return (
    <>
      {showAdmin ?
        <div className='container' style={{justifyContent:'center', display:'grid'}}>
          <TextField  sx={{input: {textAlign: "center"}}} id="filled-basic" label='מייל' onChange={handleLawyerUsername} variant="filled" />
          <TextField id="outlined-password-input" label='סיסמא' onChange={handleLawyerPassword} variant="filled" type="password"  style={{marginTop:'20px'}}/>
          <div>
             <button onClick={OnLoginClick} className="btn-casetype" style={{marginTop:'20px',width:'100%'}}>התחבר</button>
          </div>

        </div>
        : <>
          {loginType==="Admins" && <LawyerDashboard userUID={userUID} /> }
          {loginType==="Users" && <ClientSearch userUID={userUID} />}
        </>
      }
    </>
  )
}

export default LawyerLogin