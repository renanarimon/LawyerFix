
import * as React from 'react';
import '../index.css';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Navigation from './Navigation';
import PreviewComp from './PreviewComp';




const LawyerDashboard = (userUID) => {

  // const previewComponent
  
  const [previewIndex,setPreviewIndex] = React.useState(0);
  const [allCases, setAllCases] = React.useState([]);
  const [allCaseTypes, setAllCaseTypes] = React.useState([]);
  const [allClientReq, setAllClientReq] = React.useState([]);
  const [allLawyers, setAllLawyers] = React.useState([]);
  const [activeCases, setActiveCases] = React.useState([]);


  //OnClick in Navigation conponent -> change the previewIndex 
  const changeIndex = (e,index) => {
    e.preventDefault();
    setPreviewIndex(index);
  }

  return (
    <div>
        <Grid container spacing={1} >
            <Grid item xs={9}>
              <Item>
                <PreviewComp preview={previewIndex} allCases={allCases} allCaseTypes={allCaseTypes} allClientReq={allClientReq} allLawyers={allLawyers} activeCases={activeCases} />
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item>
                <Navigation onClick={changeIndex} setAllCases={setAllCases} setAllCaseTypes={setAllCaseTypes} setAllClientReq={setAllClientReq} setAllLawyers={setAllLawyers} setActiveCases={setActiveCases}  />
              </Item>
            </Grid>
          </Grid>
    </div>

  )
}

export default LawyerDashboard
