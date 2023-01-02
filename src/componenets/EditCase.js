import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EdittedCase from './EdittedCase';


const EditCase = ({ allCases, currHandlingLawyers,currCaseTypeDetails}) => {
    const [caseId, setCaseId] = React.useState('');
    const [currCaseDetails, setCurrCaseDetails] = React.useState();
    const [showCase, setShowCase] = useState(true);

    const handleOpenCaseDetails = (event) => {
        setShowCase(false);
    };
    const handleCloseCaseDetails = (event) => {
        setCaseId('')
        setCurrCaseDetails()
        setShowCase(true);
    };
    const handleCaseId = (event) => {
        setCaseId(event.target.value);
    };
    const FilterCurrCase = () => {
        const curr_case = allCases.filter(item => item.CaseNum == caseId)
        console.log("curr_case: %o" , curr_case[0])
        if (curr_case.length > 0) {
            setCurrCaseDetails(curr_case[0])
            handleOpenCaseDetails();
        }else{
            setShowCase(true)
            alert("case dosent exist")
        }
    };
    return (
        <>
            {showCase ?
               <div className='addLawyer'>
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        id="casenum"
                        label="מספר תיק"
                        fullWidth
                        variant="standard"
                        onChange={handleCaseId}
                        sx={{textAlign:'center'}}
                    />
                    <div>
                        <button onClick={FilterCurrCase} className="btn-casetype" style={{marginTop:'20px',width:'100%'}}>חפש</button>
                    </div>

                    {/* <Button onClick={FilterCurrCase}>חפש</Button> */}
                </div>
                :
                <div>
                    <EdittedCase currCaseDetails={currCaseDetails} currHandlingLawyers={currHandlingLawyers} setShowCase={setShowCase} setCurrCaseDetails={setCurrCaseDetails} currCaseTypeDetails={currCaseTypeDetails} />
                    <Button onClick={handleCloseCaseDetails}>חזור לחיפוש תיק חדש</Button>
                    
                </div>}
        </>
    )
}

export default EditCase