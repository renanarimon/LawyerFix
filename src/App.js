import React from 'react'
import Login from './componenets/Login';
import Logo from './componenets/Logo';
import SwitchButton from './componenets/SwitchButton';

function App() {
  const [loginType, setloginType] = React.useState('main');
  const [Connected, setConnected] = React.useState(false);

  const  openUserPortal = () => {
    setloginType("Users");
  };
  const  openAdminPortal = () => {
    setloginType("Admins");
  };
  const  openlawyerPortal = () => {
    setloginType("Lawyers");
  };
  const BackToMain = () => {
    setloginType("main");
    setConnected(false);
  }

   return (
      <div className='Lawyer-background'>

        <Logo />       
         {Connected?
        <><button onClick={BackToMain} className="btn-casetype" style={{width:'10%',justifyContent:'right'}}>התנתק</button></>
        :
        <></>
}
 

        {(loginType === 'main')?
  
  <div style={{display:'grid' , textAlign:'center'} }>
    
          <div>
        <button onClick={openAdminPortal} className="btn-casetype" style={{width:'30%',justifyContent:'center'}}>מנהל</button>
        </div>
        <div>
        <button onClick={openlawyerPortal} className="btn-casetype" style={{width:'30%',justifyContent:'center'}}>עורך דין</button>
        </div>
         <div>
        <button onClick={openUserPortal} className="btn-casetype" style={{width:'30%',justifyContent:'center'}}>לקוח</button>
        </div>
        </div>
        :
        <>

         {<Login loginType={loginType} setConnected={setConnected} setloginType={setloginType} />}

        </>
        }
       
    </div> 


  );
}

export default App;
