import React from 'react'
import { useState } from 'react'
import LoginComp from './componenets/LoginComp';
import Logo from './componenets/Logo';
import LawyerDashboard from './componenets/LawyerDashboard';
import ClientDashboard from './componenets/ClientDashboard';

function App() {
  const [loginType, setloginType] = React.useState('');
  const [userUID, setUserUID] = React.useState('');
  const [Connected, setConnected] = React.useState(false);

  return (
    <div className='Lawyer-background'>
      { !Connected && <Logo/>}
      <div>
      { !Connected && <LoginComp setConnected={setConnected} setloginType={setloginType} setUserUID={setUserUID}/>}
        {loginType ==="Lawyer" && <LawyerDashboard userUID={userUID} loginType={loginType} setConnected={setConnected} setUserUID={setUserUID} setloginType={setloginType}/>}
        {loginType === "User" && <ClientDashboard userUID={userUID} loginType={loginType} setConnected={setConnected} setUserUID={setUserUID} setloginType={setloginType}/> }
        {loginType === "Admin" && <LawyerDashboard userUID={userUID} loginType={loginType} setConnected={setConnected} setUserUID={setUserUID} setloginType={setloginType}/>}
      </div>
    </div> 
  );
}

export default App;