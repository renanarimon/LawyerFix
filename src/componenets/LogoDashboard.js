import React from 'react'
import logo1 from '../pic/LogoDash.png' 

const LogoDashboard = (props) => {
  return (
    <div>
    <img src={logo1} className={props.loginType!=='user' ? "logo-dash" : "logo-user"} />
</div>
  )
}

export default LogoDashboard