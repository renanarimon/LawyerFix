
import * as React from 'react';
import '../index.css';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Navigation from './Navigation';
import PreviewComp from './PreviewComp';
import UserView from './UserView';
import UpperView from './UpperView';


const LawyerDashboard = ({userUID, loginType, setConnected, setUserUID, setloginType}) => {

  // const previewComponent
  
  const [previewIndex,setPreviewIndex] = React.useState(0);
  const [allCases, setAllCases] = React.useState([]);
  const [allCaseTypes, setAllCaseTypes] = React.useState([]);
  const [allClientReq, setAllClientReq] = React.useState([]);
  const [allLawyers, setAllLawyers] = React.useState([]);
  const [activeCases, setActiveCases] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const [renderAllCases, setRenderAllCases] = React.useState(false);
  const [myCases,setMyCases]= React.useState([])
  const [myActiveCases,setMyActiveCases]= React.useState([])
  const [myRequests,setMyRequestsCases]= React.useState([])
  const [myUserName,setMyUserName]= React.useState([])

  //OnClick in Navigation conponent -> change the previewIndex 
  const changeIndex = (e,index) => {
    e.preventDefault();
    setPreviewIndex(index);
  }

  return (
    <div>
      

      
      {/* <UpperView myUserName={myUserName} setConnected={setConnected} setUserUID={setUserUID} setloginType={setloginType}/> */}
      {/* <UserView myUserName={myUserName} setConnected={setConnected} setUserUID={setUserUID} setloginType={setloginType} /> */}
      <div>
        <Grid container spacing={1} >
            <Grid item xs={9}>
              <Item>
                <PreviewComp userUID={userUID} loginType={loginType} setRenderAllCases={setRenderAllCases} preview={previewIndex} allUsers={allUsers} allCases={allCases} allCaseTypes={allCaseTypes} allClientReq={allClientReq} allLawyers={allLawyers} activeCases={activeCases} myCases={myCases} myActiveCases={myActiveCases} myRequests={myRequests} />
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item>
                <Navigation  myUserName={myUserName} setConnected={setConnected} setUserUID={setUserUID} setloginType={setloginType} userUID={userUID} onClick={changeIndex} renderAllCases={renderAllCases} setMyUserName={setMyUserName} setRenderAllCases={setRenderAllCases} loginType={loginType} setAllUsers={setAllUsers} setAllCases={setAllCases} setAllCaseTypes={setAllCaseTypes} setAllClientReq={setAllClientReq} setAllLawyers={setAllLawyers} setActiveCases={setActiveCases} setMyCases={setMyCases} setMyActiveCases={setMyActiveCases} setMyRequestsCases={setMyRequestsCases} />
              </Item>
            </Grid>
          </Grid>
        </div>
    </div>

  )
}

export default LawyerDashboard
