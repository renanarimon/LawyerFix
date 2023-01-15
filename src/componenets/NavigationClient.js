import React from 'react'
import { useState } from 'react';
import { onValue, ref , set,getDatabase,child,get} from "firebase/database";



const NavigationClient = ( props ) => {
    const [defaultScreen,setDefaultScreen]= useState(true);
    

    const GetAllUsersFromDB = React.useCallback(() => {
        if (true) {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `Users/`)).then((snapshot) => {
                if (snapshot.exists()) {
                    props.setAllUsers(snapshot.val());
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [true])

  const GetAllCasesFromDB= React.useCallback(() => {
    if (true) {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `Cases/`)).then((snapshot) => {
            if (snapshot.exists()) {
                const b = Object.entries(snapshot.val())
                const c = b.map((item) => item[1])
                const d = c.filter(item=> item.ClientUID === props.userUID);
                props.setAllCases(d)
                
                
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
                props.setCasesType(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
}, [true])


    if(defaultScreen){
        GetAllCasesFromDB()
        GetAllCaseTypeFromDB()
        GetAllUsersFromDB()
        setDefaultScreen(false)
    }

  return (
    <div className='container-btn'>
        <button className="btn-group" onClick={(e)=> {
          props.onClick(e,0)
          GetAllCasesFromDB()
        }
          
          }
          >
          התיקים שלי
        </button>
        <button className="btn-group" onClick={(e)=> {
          props.onClick(e,1)

        }
        
         }>
          יצירת קשר
        </button>

  </div>
  )
}

export default NavigationClient
