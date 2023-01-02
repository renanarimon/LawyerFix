
import * as React from 'react';
import '../index.css';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Navigation from './Navigation';
import Preview from './Preview';
import { useState } from 'react';




const LawyerDashboard = ({userUID, userType}) => {

  // const previewComponent
  
  const [previewIndex,setPreviewIndex] = React.useState(0);
  const [allCases, setAllCases] = React.useState([]);
  const [allCaseTypes, setAllCaseTypes] = React.useState([]);
  const [allClientReq, setAllClientReq] = React.useState([]);
  const [allLawyers, setAllLawyers] = React.useState([]);
  const [activeCases, setActiveCases] = React.useState([]);
  const [casesPerLawyer, setCasesPerLawyer] = React.useState([]);
  const [activeCasesPerLawyer, setActiveCasesPerLawyer] = React.useState([]);
  const [messages, setMessages] = useState([])



  //OnClick in Navigation conponent -> change the previewIndex 
  const changeIndex = (e,index) => {
    e.preventDefault();
    setPreviewIndex(index);
  }
  console.log("userType: " + userType)
  return (
    <div>
        <Grid container spacing={1} >
            <Grid item xs={9}>
              <Item>
                <Preview  userType={userType} preview={previewIndex} lawyerUID={userUID} messages={messages} casesPerLawyer={casesPerLawyer} activeCasesPerLawyer={activeCasesPerLawyer} allCases={allCases} allCaseTypes={allCaseTypes} allClientReq={allClientReq} allLawyers={allLawyers} activeCases={activeCases} />
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item>
                <Navigation userType={userType} onClick={changeIndex} setMessages={setMessages} setActiveCasesPerLawyer={setActiveCasesPerLawyer} setCasesPerLawyer={setCasesPerLawyer} setAllCases={setAllCases} setAllCaseTypes={setAllCaseTypes} setAllClientReq={setAllClientReq} setAllLawyers={setAllLawyers} setActiveCases={setActiveCases} Lawyer_uid={userUID} />
              </Item>
            </Grid>
          </Grid>
    </div>
  )
}

export default LawyerDashboard
