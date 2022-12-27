import React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material';
import LawyerDashboard from './LawyerDashboard';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import ClientSearch from './ClientDashboard';
import { getDatabase, ref, child, get } from "firebase/database";


const Login = ({loginType, setConnected}) => {

  const [showAdmin, setShowAdmin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userUID, setUserUid] = useState('');

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const GetLogin = React.useCallback((user_name, Password) => {
    if (true) {
      console.log(user_name)
      console.log(Password)
      signInWithEmailAndPassword(auth, user_name, Password)
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
    GetLogin(username, password)
  };
  
  return (
    <>
      {showAdmin ?
        <div className='container' style={{justifyContent:'center', display:'grid'}}>
          <TextField  sx={{input: {textAlign: "center"}}} id="filled-basic" label='מייל' onChange={handleUsername} variant="filled" />
          <TextField id="outlined-password-input" label='סיסמא' onChange={handlePassword} variant="filled" type="password"  style={{marginTop:'20px'}}/>
          <div>
             <button onClick={OnLoginClick} className="btn-casetype" style={{marginTop:'20px',width:'100%'}}>התחבר</button>
          </div>

        </div>
        : <>
          {loginType==="Admins" && <LawyerDashboard userUID={userUID} /> }
          {loginType==="Lawyers" && <LawyerDashboard userUID={userUID} /> }
          {loginType==="Users" && <ClientSearch userUID={userUID} />}
        </>
      }
    </>
  )
}

export default Login