import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getDatabase, ref, set } from "firebase/database";
import { Select, MenuItem,Box } from '@mui/material';
import styled from '@emotion/styled';



// const Container = styled(Box)({
//     background: "blue"
// })

const CreateNewCase = ({currCaseTypeDetails,currHandlingLawyers}) => {
    const [newCaseNum, setNewCaseNum] = useState('');
    const [newClientName, setNewClinetName] = useState('');
    const [newCaseType, setNewCaseType] = React.useState('');
    const [newHandlingLawyer, setNewHandlingLawyer] = React.useState('');

    const handleNewCaseNum = (event) => {
        setNewCaseNum(event.target.value);
    };
    const handleNewClinetName = (event) => {
        setNewClinetName(event.target.value);
    };
    const handleNewCaseType = (event) => {
        setNewCaseType(event.target.value);
    };
    const handleNewHandlingLawyer = (event) => {
        setNewHandlingLawyer(event.target.value);
    };
    const clearAllFields = () => {
        setNewCaseNum('');
        setNewClinetName('');
        setNewCaseType('');
        setNewHandlingLawyer('');
    };

    const caseTypeList = Object.keys(currCaseTypeDetails)
    const lawyersList = Object.values(currHandlingLawyers)

    function writeNewCase() {
        const db = getDatabase();
        let plaster = 'Cases/'+newCaseNum;
        set(ref(db, plaster), {
            CaseNum: newCaseNum,
            CaseType: newCaseType,
            ClientName: newClientName,
            CurrStage: 1,
            Lawyer: newHandlingLawyer,
            Status: 1,
        })
        clearAllFields();
        alert("נוצר תיק חדש")
    }

    return (
        <div style={{display:'grid' , textAlign:'center'} }>
            <div>
                <input  type='text'
                placeholder='הכנס/י מספר תיק' 
                style={{marginTop:'20px',marginRight:'10px',width:'33%',height:'45px',borderRadius:'4px' , border:'1px solid #d0b49f', boxSizing:'border-box', direction:'rtl' }}
                onChange={handleNewCaseNum}
                id="caseNum"
                value={newCaseNum}
                />
            </div>
            <div>
                <input  type='text'
                placeholder='הכנס/י שם לקוח' 
                style={{marginTop:'20px',marginRight:'10px',width:'33%',height:'45px',borderRadius:'4px' , border:'1px solid #d0b49f', boxSizing:'border-box', direction:'rtl' }}
                value={newClientName}
                onChange={handleNewClinetName}
                id="clientName"
                
                />
            </div>

            <div style={{marginTop:'20px'}}>

                <label style={{fontSize:'17px',fontWeight:'bold',color:'#523A28', marginLeft:'10px'}}>סוג תיק</label>
                <Select
                    
                    sx={{width:'20%',height:'45px',borderRadius:'4px',border:'1px solid rgb(208, 180, 159)'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={newCaseType}
                    label="סוג תיק"
                    onChange={handleNewCaseType}
                >
                    {caseTypeList.map((casetype,index) => (<MenuItem key={index} value={casetype}>{casetype}</MenuItem>))}
                </Select>
            </div>





            <div style={{marginTop:'10px'}}>

                <label style={{fontSize:'17px',fontWeight:'bold',color:'#523A28', marginLeft:'12px'}}>עורך דין</label>
                <Select
                    sx={{width:'20%',height:'45px',borderRadius:'4px',border:'1px solid rgb(208, 180, 159)'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={newHandlingLawyer}
                    label="עורך דין"
                    onChange={handleNewHandlingLawyer}
                    
                >
                    {lawyersList.map((lawyer,index) => (<MenuItem key={index} value={lawyer}>{lawyer}</MenuItem>))}
                </Select>
            </div>
            
            <div>
                <button onClick={writeNewCase} className="btn-casetype" style={{marginTop:'20px',width:'33%'}}>הוסף תיק</button>
            </div>
            
        </div>
    )
}

export default CreateNewCase