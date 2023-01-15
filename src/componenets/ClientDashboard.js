import * as React from 'react';
import { useState , useEffect } from 'react'
import '../index.css';
import PreviewCompClient from './PreviewCompClient';
import { onValue, ref, set, getDatabase, child, get } from "firebase/database";
import UserView from './UserView';
import LogoDashboard from './LogoDashboard';

const ClientDashboard = (props) => {

  //   all the cases of the specific user
  const [allCases, setAllCases] = React.useState([])
  const [allClientReq, setClientReq] = React.useState([])
  const [allCasesType, setAllCasesType] = React.useState([])
  const [handlingLawyer, setHandlingLawyer] = React.useState("")
  const [allUsers, setAllUsers] = React.useState([]);
  const [flag, setFlag] = React.useState(true)
  const [myUserName, setMyUserName] = React.useState([])
  const [renderAllCases, setRenderAllCases] = React.useState(false);



  const GetAllUsersFromDB = React.useCallback(() => {
    if (true) {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `Users/`)).then((snapshot) => {
        if (snapshot.exists()) {
          //my current username
          const myUsernamevalue = Object.entries(snapshot.val())
          const myUsername = myUsernamevalue.filter(item => item[0] === props.userUID)
          setMyUserName(myUsername[0][1])
          setAllUsers(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [true])

  const GetAllCasesFromDB = React.useCallback(() => {
    if (true) {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `Cases/`)).then((snapshot) => {
        if (snapshot.exists()) {
          const b = Object.entries(snapshot.val())
          const c = b.map((item) => item[1])
          const d = c.filter(item => item.ClientUID === props.userUID);
          setAllCases(d)


        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [true])


  const GetAllCaseTypeFromDB = React.useCallback(() => {
    if (true) {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `CaseType/`)).then((snapshot) => {
        if (snapshot.exists()) {
          setAllCasesType(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [true])

  if (flag) {
    GetAllCasesFromDB()
    GetAllCaseTypeFromDB()
    GetAllUsersFromDB()
    setFlag(false)
  }
  useEffect(() => {
    if (props.renderAllCases) {
        GetAllCasesFromDB()
        GetAllCaseTypeFromDB()
        GetAllUsersFromDB()
        props.setRenderAllCases(false)
    }
}, [props.renderAllCases]);

  return (

    <div>
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{textAlign:'center',padding:'45px'}}>
        <UserView myUserName={myUserName} setConnected={props.setConnected} setUserUID={props.setUserUID} setloginType={props.setloginType} />
        </div>
        <div>
          <LogoDashboard loginType={'user'}/>  
        </div>
      </div>

        <PreviewCompClient setRenderAllCases={setRenderAllCases} allCases={allCases} clientReq={allClientReq} allCaseTypes={allCasesType} handlingLawyer={handlingLawyer} allUsers={allUsers} loginType={props.loginType} />
    </div>

  )
}

export default ClientDashboard
