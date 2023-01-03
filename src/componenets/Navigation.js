import React from 'react'
import { useState } from 'react';
import { onValue, ref, set, getDatabase, child, get } from "firebase/database";

const Navigation = (props) => {
    console.log("nav userType: " + props.userType)
    const [defaultScreen, setDefaultScreen] = useState(true);
    const [casesNum_per_lawyer, setCasesNum_per_lawyer] = useState([])


    const GetAllCasesFromDB = React.useCallback(() => {
        if (true) {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `Cases/`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const cases_entries = Object.entries(snapshot.val())
                    const all_cases = cases_entries.map((item) => item[1])
                    const cases_per_lawyer = all_cases.filter(item => item.LawyerUID === props.Lawyer_uid);
                    const all_active_cases = all_cases.filter(item => item.Status === 1);
                    const active_cases_per_lawyer = cases_per_lawyer.filter(item => item.Status === 1);
                    const caseNums = all_active_cases.map((item) => item.CaseNum)
                    props.setAllCases(all_cases)
                    props.setActiveCases(all_active_cases)
                    props.setCasesPerLawyer(cases_per_lawyer)
                    props.setActiveCasesPerLawyer(active_cases_per_lawyer)
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
                    // console.log(snapshot.val());
                    props.setAllCaseTypes(snapshot.val());
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [true])
    const GetAllLawyersFromDB = React.useCallback(() => {
        if (true) {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `Lawyers/`)).then((snapshot) => {
                if (snapshot.exists()) {
                    props.setAllLawyers(snapshot.val());
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [true])

    const GetMessages = React.useCallback(() => {
        if (true) {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `Requests/`)).then((snapshot) => {
                // Object.values(theObj).includes("bar")
                if (snapshot.exists() && Object.values(casesNum_per_lawyer).includes(snapshot.val().CaseNum)) {
                    console.log(snapshot.val())
                    props.setMessages(snapshot.val())

                } else {
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [true])

    const GetAllClientReqFromDB = React.useCallback(() => {
        if (true) {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `ClientReq/`)).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    props.setAllClientReq(snapshot.val());
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [true])

    if (defaultScreen) {
        console.log("defaultscreenn")
        GetAllCasesFromDB()
        GetAllClientReqFromDB()
        GetAllLawyersFromDB()
        GetAllCaseTypeFromDB()

        setDefaultScreen(false)
    }

    return (
        <div className='container-btn'>
            <button className="btn-group" onClick={(e) => {
                props.onClick(e, 0)
                GetAllCasesFromDB()
            }
            }
            >
                תיקים
            </button>
            {/* <button className="btn-group" onClick={(e) => {
                props.onClick(e, 1)
                GetAllCasesFromDB()
            }

            }>
                כל התיקים
            </button> */}
            <button className="btn-group" onClick={(e) => {
                props.onClick(e, 2)
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
                props.onClick(e, 3)
                GetAllCaseTypeFromDB()
                GetAllLawyersFromDB()
            }
            }>
                יצירת תיק חדש
            </button>
            <button className="btn-group" onClick={(e) => {
                props.onClick(e, 4)
            }
            }>
                יצירת סוג תיק חדש
            </button>
            <button className="btn-group" onClick={(e) => {
                props.onClick(e, 5)
                GetAllCasesFromDB()
                GetAllLawyersFromDB()
                GetAllCaseTypeFromDB()

            }
            }>
                עריכת תיק קיים
            </button>
            <hr
                    style={{
                        background: '#D0B49F',
                        color: '#D0B49F',
                        height: '3px',
                        width: '100%'
                    }}
                />


            {props.userType === 'Admins' 
                
                &&
                <button className="btn-group" onClick={(e) =>
                    props.onClick(e, 6)}>
                    הוספת עורך דין
                </button>
}
                {/* <button className="btn-group" onClick={(e) => {
                    props.onClick(e, 7)
                    GetAllClientReqFromDB()
                }
                }>
                    בקשות לקוח
                </button> */}

        </div>
    )
}

export default Navigation
