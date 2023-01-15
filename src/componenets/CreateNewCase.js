import React, { useEffect, useState } from 'react';
import { child, get, getDatabase, ref, set } from "firebase/database";
import { Select, MenuItem } from '@mui/material';
import styled from '@emotion/styled';
import AddUser from './AddUser';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const FormControler = styled(FormControl)({

    ".MuiFormGroup-root": {
        display: 'flow-root',
        marginTop: '10px'
    }
})

const CreateNewCase = ({ currCaseTypeDetails, currUsers, userUID }) => {
    const [newCaseNum, setNewCaseNum] = useState('');
    const [newClientName, setNewClinetName] = useState('');
    const [newClinetUID, setNewClinetUID] = useState();
    const [newCaseType, setNewCaseType] = React.useState('');
    const [newHandlingLawyer, setNewHandlingLawyer] = React.useState('');
    const [newHandlingLawyerUID, setNewHandlingLawyerUID] = React.useState('');
    const [createdNewUser, setCreatedNewUser] = React.useState(1);
    const [existingUser, setExistingUser] = React.useState("1");
    const [listenerFlag, setListenerFlag] = React.useState(false);

    const handleNewCaseNum = (event) => {
        setNewCaseNum(event.target.value);
    };
    const handleNewClinetName = (event) => {
        setNewClinetName(event.target.value);
    };
    const handleNewCaseType = (event) => {
        setNewCaseType(event.target.value);
    };
    const handleExistingUser = (event) => {
        setExistingUser(event.target.value);
    };
    const clearAllFields = () => {
        setNewCaseNum('');
        setNewClinetName('');
        setNewCaseType('');
        setNewHandlingLawyer('');
    };

    const caseTypeList = Object.keys(currCaseTypeDetails)
    const allusersList = Object.values(currUsers)
    const usersList = allusersList.filter(item => item.Role === "User")
    const getUserUID = () => {
        if (newClinetUID) { alert("Already got user") }
        else {
            let fullUserObj = Object.entries(currUsers)
            fullUserObj = fullUserObj.filter(item => item[1].Name === newClientName)
            setNewClinetUID(fullUserObj[0][0])
        }
    };
    const getLawyerUID = () => {
        let fullUserObj = Object.entries(currUsers)
        fullUserObj = fullUserObj.filter(item => item[0] === userUID)
        setNewHandlingLawyerUID(fullUserObj[0][0])
        setNewHandlingLawyer(fullUserObj[0][1].Name)
    };

    const onCreateNewCase = () => {
        getUserUID()
        getLawyerUID()
        setListenerFlag(true)
    };
    useEffect(() => {
        if (listenerFlag) {
            writeNewCase()
            setListenerFlag(false)
        }
    }, [listenerFlag]);

    function writeNewCase() {
        const db = getDatabase();
        let plaster = 'Cases/' + newCaseNum;
        set(ref(db, plaster), {
            CaseNum: newCaseNum,
            CaseType: newCaseType,
            ClientName: newClientName,
            ClientUID: newClinetUID,
            CurrStage: 1,
            Lawyer: newHandlingLawyer,
            LawyerUID: newHandlingLawyerUID,
            Status: 1,
            Chat: { 0: { Role: 'General', Message: 'צאט חדש' } }
        })
        clearAllFields();
        alert("נוצר תיק חדש")
    }

    return (
        <div style={{ display: 'grid', textAlign: 'center' }}>
            <div>
                <input type='text'
                    placeholder='הכנס/י מספר תיק'
                    style={{ marginTop: '20px', marginRight: '10px', width: '33%', height: '45px', borderRadius: '4px', border: '1px solid #d0b49f', boxSizing: 'border-box', direction: 'rtl' }}
                    onChange={handleNewCaseNum}
                    id="caseNum"
                    value={newCaseNum}
                />
            </div>
            {createdNewUser ? <div>
                <FormControler >
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={existingUser}
                        onChange={handleExistingUser}
                    >
                        <label style={{ fontSize: '17px', fontWeight: 'bold', color: '#523A28', marginLeft: '12px' }}>סוג לקוח</label>
                        <FormControlLabel value="1" control={<Radio />} label="לקוח קיים" />
                        <FormControlLabel value="0" control={<Radio />} label="לקוח חדש" />
                    </RadioGroup>
                </FormControler>

                {parseInt(existingUser) ?
                    <>
                        <div style={{ marginTop: '10px' }}>

                            <label style={{ fontSize: '17px', fontWeight: 'bold', color: '#523A28', marginLeft: '12px' }}>לקוח</label>
                            <Select
                                sx={{ width: '20%', height: '45px', borderRadius: '4px', border: '1px solid rgb(208, 180, 159)' }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={newClientName}
                                label="לקוח"
                                onChange={handleNewClinetName}

                            >
                                {usersList.map((usr, index) => (<MenuItem key={index} value={usr.Name}>{usr.Name}</MenuItem>))}
                            </Select>
                        </div>
                    </>
                    :
                    <><AddUser userType={'Client'} handleNewClinetName={setNewClinetName} setNewClinetUID={setNewClinetUID} setCreatedNewUser={setCreatedNewUser} /></>
                }
            </div>
                :
                <></>}

            <div>
                <input type='text'
                    disabled
                    placeholder='הכנס/י שם לקוח'
                    style={{ marginTop: '20px', marginRight: '10px', width: '33%', height: '45px', borderRadius: '4px', border: '1px solid #d0b49f', boxSizing: 'border-box', direction: 'rtl' }}
                    value={newClientName}
                    id="clientName"

                />
            </div>

            <div style={{ marginTop: '20px' }}>

                <label style={{ fontSize: '17px', fontWeight: 'bold', color: '#523A28', marginLeft: '10px' }}>סוג תיק</label>
                <Select

                    sx={{ width: '20%', height: '45px', borderRadius: '4px', border: '1px solid rgb(208, 180, 159)' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={newCaseType}
                    label="סוג תיק"
                    onChange={handleNewCaseType}
                >
                    {caseTypeList.map((casetype, index) => (<MenuItem key={index} value={casetype}>{casetype}</MenuItem>))}
                </Select>
            </div>

            <div>
                <button onClick={onCreateNewCase} className="btn-casetype" style={{ marginTop: '20px', width: '33%' }}>הוסף תיק</button>
            </div>
        </div>
    )
}

export default CreateNewCase