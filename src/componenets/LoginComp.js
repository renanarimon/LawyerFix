import React from 'react'
import { useState } from 'react'
import { TextField } from '@mui/material';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { getDatabase, ref, child, get } from "firebase/database";



const LoginComp = ({setConnected, setloginType, setUserUID}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const handleUserName = (event) => {
    setUserName(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const GetLogin = React.useCallback((user_name, Password) => {
    if (true) {
      signInWithEmailAndPassword(auth, user_name, Password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const dbRef = ref(getDatabase());
          get(child(dbRef, `Users/${user.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
              setloginType(snapshot.val().Role)
              setUserUID(user.uid)
              setConnected(true)
            }else{
              alert("user doesn't exist")
            }
          })

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('ERROR: sign in')
        });
    }
  }, [true])

  const OnLoginClick = () => {
    GetLogin(userName, password)
  };
  
  return (
        <div style={{justifyContent:'center', display:'grid' ,direction:'rtl'}}>
          <TextField  sx={{input: {textAlign: "center"}}} id="filled-basic" label='מייל' onChange={handleUserName} variant="filled" />
          <TextField id="outlined-password-input" label='סיסמא' onChange={handlePassword} variant="filled" type="password"  style={{marginTop:'20px'}}/>
          <div>
             <button onClick={OnLoginClick} className="btn-casetype" style={{marginTop:'20px',width:'100%'}}>התחבר</button>
          </div>
        </div>
  )
}

export default LoginComp