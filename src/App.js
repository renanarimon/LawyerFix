import React from 'react'
import { useState } from 'react'
import ClientSearch from './componenets/ClientSearch';
import LawyerLogin from './componenets/LawyerLogin';
import NewLogin from './componenets/NewLogin';
import ClientReq from './componenets/ClientReq'
import Logo from './componenets/Logo';
import Button from '@mui/material/Button';

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

  //   return (
  //     <div className='Lawyer-background'>

  //       <Logo />

  //       <div>

  //         {!Connected && < NewLogin setloginType={setloginType} />}
  //         {/* <ClientReq /> */}
  //         {loginType === "main" && <ClientReq />}
  //         {/* {loginType === "main" && <div style={{overflowWrap: 'break-word'}}><p> ברוך הבא לפרופיל שלי! שמי הוא [שם] ואני עורך דין שהתקבל לאחרונה, נרגש להתחיל את דרכי במקצוע עריכת הדין.

  // קיבלתי את התואר שלי במשפטים מ[בית הספר למשפטים] ואני נלהב להשתמש בידע ובכישורים שלי כדי לעזור לאחרים לנווט בעולם המורכב של המשפט. אני מאמין בשימוש בחוק כדי להביא לשינוי חיובי וצדק עבור כל הפרטים והקהילות.

  // אני להוט ללמוד ולצמוח כעורך דין, ופתוחה להזדמנויות ואתגרים חדשים שיעזרו לי לפתח את הכישורים והמומחיות שלי. אני מחויב לשרת את לקוחותיי במקצועיות, ביושרה ובחמלה, ובטוח שאני יכול לספק ייצוג ותמיכה משפטיים מצוינים.

  // תודה שביקרת בפרופיל שלי. אני מצפה לעבוד איתך ולעזור לך להשיג את המטרות המשפטיות שלך.</p> </div>} */}
  //         {loginType === "user" && <ClientSearch />}



  //         {loginType === "admin" && <LawyerLogin setConnected={setConnected} />}

  //       </div>

  //     </div> 
  //   );






   return (
      <div className='Lawyer-background'>

        <Logo />       
         {Connected?
        <><button onClick={BackToMain} className="btn-casetype" style={{width:'10%',justifyContent:'right'}}>התנתק</button></>
        :
        <></>
}
 

        {(loginType === 'main')?
  
  <div style={{display:'grid' , textAlign:'center', marginTop:'100px'} }>
          <div>
        <button onClick={openAdminPortal} className="btn-casetype" style={{width:'50%',justifyContent:'center'}}>מנהל</button>
        </div>
        <div>
        <button onClick={openlawyerPortal} className="btn-casetype" style={{width:'50%',justifyContent:'center'}}>עורך דין</button>
        </div>
         <div>
        <button onClick={openUserPortal} className="btn-casetype" style={{width:'50%',justifyContent:'center'}}>לקוח</button>
        </div>
        </div>
        :
        <>

         {<LawyerLogin loginType={loginType} setConnected={setConnected} />}

        </>
        }
       
    </div> 


  );
}

export default App;
