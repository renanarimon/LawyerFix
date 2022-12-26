import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import styled from '@emotion/styled';


// FormControl

const FormControler = styled(FormControl)({
    ".MuiFormGroup-root":{
      display: 'flow-root',
      marginTop:'10px'
    }
    })

const ClientCaseView = ({ currCaseDetails, backToSearchBar }) => {

    return (
        <div style={{display:'grid' , textAlign:'center', direction:'rtl'} }>
            
            <div>
                <label>מספר תיק</label>
                <input  type='text'
                className='input'
                id="casenum"
                defaultValue={currCaseDetails.CaseNum}
                disabled
                />
            </div>

            <div>
            <label>שם הלקוח</label>
                <input  type='text'
                className='input'
                id="clientname"
                label="שם לקוח"
                defaultValue={currCaseDetails.ClientName}
                disabled                
                />
            </div>

            <div>
            <label>סוג התיק</label>
                <input  type='text'
                className='input'
                id="caseType"
                label="סוג התיק"
                defaultValue={currCaseDetails.CaseType}
                disabled                
                />
            </div>

            <div>
            <label>שלב נוכחי</label>
                <input  type='text'
                className='input'
                id="caseStage"
                label="שלב נוכחי"
                defaultValue={currCaseDetails.CurrStage}
                disabled                
                />
            </div>

            <div>
            <label>עורך דין מטפל</label>
                <input  type='text'
                className='input'
                id="handlingLawyer"
                label="עורך דין מטפל"
                defaultValue={currCaseDetails.Lawyer}
                disabled                
                />
            </div>

            <FormControler >
                {/* <FormLabel id="demo-controlled-radio-buttons-group">סטטוס תיק</FormLabel> */}
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={currCaseDetails.Status}
                    disabled>
                    <label style={{fontSize:'17px',fontWeight:'bold',color:'#523A28', marginLeft:'12px'}}>סטטוס תיק</label>
                    <FormControlLabel value="1" control={<Radio color='success' />} label="פתוח" />
                    <FormControlLabel value="0" control={<Radio color='error' />} label="סגור" />
                </RadioGroup>
            </FormControler>

            <div>
                <button onClick={backToSearchBar} className="btn-casetype" style={{marginTop:'20px',width:'33%'}}>חזור לחיפוש</button>
            </div>

        </div>
    )
}

export default ClientCaseView