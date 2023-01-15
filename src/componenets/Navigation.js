import React from 'react'
import { useState, useEffect } from 'react';
import { onValue, ref, set, getDatabase, child, get } from "firebase/database";
import LogoDashboard from './LogoDashboard';
import UserView from './UserView';

const Navigation = (props) => {
    const [defaultScreen, setDefaultScreen] = useState(true);

    const GetAllCasesFromDB = React.useCallback(() => {
        if (true) {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `Cases/`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const caseEnteries = Object.entries(snapshot.val())
                    // c all cases
                    const mappedEnteries = caseEnteries.map((item) => item[1])
                    // d allactivecases
                    const filterredEntries = mappedEnteries.filter(item => item.Status === 1);
                    props.setAllCases(mappedEnteries)
                    props.setActiveCases(filterredEntries)
                    const myCases = mappedEnteries.filter(item => item.LawyerUID == props.userUID)
                    const myActiveCases = filterredEntries.filter(item => item.LawyerUID == props.userUID)
                    props.setMyCases(myCases)
                    props.setMyActiveCases(myActiveCases)

                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [true])

    const GetAllUsersFromDB = React.useCallback(() => {
        if (true) {
            const dbRef = ref(getDatabase());
            //get all users
            get(child(dbRef, `Users/`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const myUsernamevalue = Object.entries(snapshot.val())
                    const myUsername = myUsernamevalue.filter(item => item[0] === props.userUID)
                    //my personal user
                    props.setMyUserName(myUsername[0][1])
                    //rest of the users
                    props.setAllUsers(snapshot.val());
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
                    props.setAllCaseTypes(snapshot.val());
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [true])



    if (defaultScreen) {
        GetAllCasesFromDB()
        GetAllCaseTypeFromDB()
        GetAllUsersFromDB()
        setDefaultScreen(false)
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



        <div className='container-btn'>
           
            <div className='UserView'>
                 <UserView myUserName={props.myUserName} setConnected={props.setConnected} setUserUID={props.setUserUID} setloginType={props.setloginType}/>
            </div>
            <div>
                <LogoDashboard loginType={'Lawyer'}/>
                
            </div>


            <button className="btn-group" onClick={(e) => {
                props.onClick(e, 0)
                GetAllCasesFromDB()
            }

            }
            >
                תיקים
            </button>
            <button className="btn-group" onClick={(e) => {
                props.onClick(e, 1)
                GetAllCaseTypeFromDB()
            }
            }>
                כל סוגי התיקים
            </button>


            <hr
                style={{
                    background: '#D0B49F',
                    color: '#D0B49F',
                    height: '3px',
                    width: '100%'
                }}
            />

            <button className="btn-group" onClick={(e) => {
                props.onClick(e, 2)
                GetAllCaseTypeFromDB()
                GetAllUsersFromDB()
            }
            }>
                יצירת תיק חדש
            </button>
            <button className="btn-group" onClick={(e) => {
                props.onClick(e, 3)
            }
            }>
                יצירת סוג תיק חדש
            </button>

            {props.loginType === "Admin" &&
                <hr
                    style={{
                        background: '#D0B49F',
                        color: '#D0B49F',
                        height: '3px',
                        width: '100%'
                    }}
                />}
            {props.loginType === "Admin" &&
                <button className="btn-group" onClick={(e) =>
                    props.onClick(e, 5)}>
                    הוספת עורך דין
                </button>}
        </div>
    )
}

export default Navigation
