import React from 'react'
import LogoDashboard from './LogoDashboard'
import UserView from './UserView'

const UpperView = (props) => {
  return (
    <div>
        <UserView myUserName={props.myUserName} setConnected={props.setConnected} setUserUID={props.setUserUID} setloginType={props.setloginType}/>
        <LogoDashboard/>
    </div>


  )
}

export default UpperView