import React, { useState } from 'react'
import Title from './Title'
import CollapsibleTable from './CollapsibleTable'
import CreateNewCaseType from './CreateNewCasseType'
import AddUser from './AddUser'
import { onValue, ref, set, getDatabase, child, get } from "firebase/database";
import CaseTypeTable from './CaseTypeTable'
import CreateNewCase from './CreateNewCase'
import EditCase from './EditCase'
import ClientRequests from './ClientRequests'
import Messages from './Messages'
import SwitchButton from './SwitchButton'

const Preview = (props) => {
    const [showAllCases, setShowAllCases] = useState(false)
    const [showAllCasesPerLawyer, setShowAllCasesPerLawyer] = useState(false)
    const [showActiveCases, setShowActiveCases] = useState(true)
    const [showActiveCasesPerLawyer, setShowActiveCasesPerLawyer] = useState(false)

    const onClickAllPerLawyer = () => {
        setShowAllCasesPerLawyer(true)
        setShowActiveCasesPerLawyer(false)
        setShowAllCases(false)
        setShowActiveCases(false)
    }
    const onClickActivePerLawyer = () => {
        setShowAllCasesPerLawyer(false)
        setShowActiveCasesPerLawyer(true)
        setShowAllCases(false)
        setShowActiveCases(false)
    }
    const onClickAll = () => {
        setShowAllCasesPerLawyer(false)
        setShowActiveCasesPerLawyer(false)
        setShowAllCases(true)
        setShowActiveCases(false)
    }
    const onClickAllActive = () => {
        setShowAllCasesPerLawyer(false)
        setShowActiveCasesPerLawyer(false)
        setShowAllCases(false)
        setShowActiveCases(true)
    }
    console.log(`preview lawyer uid: ${props.lawyerUID}`)
    console.log(`preview userType: ${props.userType}`)
    if (props.preview === 0) {
        return (
            <div className='container'>
                <Title title={"תיקים"} />
                <button onClick={onClickActivePerLawyer} >תיקים פעילים</button>
                <button onClick={onClickAllPerLawyer} >כל התיקים שלי</button>
                
                {props.userType === 'Admins' && <button onClick={onClickAll} >כל התיקים</button>}
                {props.userType === 'Admins' && <button onClick={onClickAllActive} >כל התיקים הפעילים</button>}


                {showAllCasesPerLawyer &&
                    <CollapsibleTable cases={props.casesPerLawyer} casesType={props.allCaseTypes} />}
                {showAllCases &&
                    <CollapsibleTable cases={props.allCases} casesType={props.allCaseTypes} />}
                {showActiveCases &&
                <CollapsibleTable cases={props.activeCases} casesType={props.allCaseTypes} />}
                {showActiveCasesPerLawyer &&
                <CollapsibleTable cases={props.activeCasesPerLawyer} casesType={props.allCaseTypes} />}

            </div>
        )
    }
    // else if(props.preview===1){
    // //   console.log(props.allCases)
    //     return (
    //         <div className='container'>
    //             <Title title={"כל התיקים"} />
    //             <CollapsibleTable cases={props.casesPerLawyer} casesType={props.allCaseTypes} />
    //         </div>
    //       )
    // }
    else if (props.preview === 2) {

        // console.log(props.allCaseTypes)
        const casesTypeprop = props.allCaseTypes
        const b = Object.entries(casesTypeprop)
        const c = b.map((item) => item[1])
        const d = b.map((item) => item[0])
        return (
            <div className='container'>
                <Title title={"כל סוגי התיקים"} />
                <CaseTypeTable casesType={c} casesTypeNames={d} />

            </div>
        )
    }
    else if (props.preview === 3) {
        console.log(`3 lawyer uid: ${props.lawyerUID}`)
        return (
            <div className='container'>
                <Title title={"יצירת תיק חדש"} />
                <CreateNewCase currCaseTypeDetails={props.allCaseTypes} currHandlingLawyers={props.allLawyers} lawyeruid={props.lawyerUID} />
            </div>
        )
    }
    else if (props.preview === 4) {
        return (
            <div className='container-casetype'>
                <Title title={"יצירת סוג תיק חדש"} />
                <CreateNewCaseType />
            </div>
        )
    }
    else if (props.preview === 6) {
        return (
            <div className='container'>
                <Title title={"הוספת עורך דין"} />
                <AddUser userType={'Lawyer'} lawyeruid={props.lawyeruid} />
            </div>
        )

    }

    else if (props.preview === 7) {

        console.log(props.allClientReq)
        const b = Object.entries(props.allClientReq)
        console.log(b)
        const c = b.map((item) => item[1])
        console.log(c)

        return (
            <div className='container'>
                <Title title={"בקשות לקוח"} />
                <ClientRequests Requests={c} />
                {/* <Messages messages={props.messages}/> */}
            </div>
        )

    }

    else {
        return (
            <div className='container'>
                <Title title={"עריכת תיק קיים"} />
                <EditCase allCases={props.allCases} currHandlingLawyers={props.allLawyers} currCaseTypeDetails={props.allCaseTypes} />
            </div>
        )
    }


}

export default Preview