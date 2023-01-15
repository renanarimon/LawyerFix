import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import QuickChanges from './QuickChanges';
import { onValue, ref , set,getDatabase,child,get} from "firebase/database";
import styled from '@emotion/styled';
import TableDescription from './TableDescription';



const Container = styled(Collapse)({

  ".MuiCollapse-wrapper":{
    width: 50
  }
  })


function Row(props) {
    
  const { row ,cases , casesTypes ,index, setRenderAllCases ,loginType} = props;
  const [open, setOpen] = React.useState(false);
  
    //filter cases type to descriptions
    let descriptionKey=0
    const casesTypeprop = casesTypes
    let Descriptions=[]
    const b = Object.entries(casesTypeprop)
    const c = b.filter((caseType) => {
      if (caseType[0]== row.CaseType) {
        Descriptions= caseType[1]
        return caseType[1]
      }
    })
    
    
  
  return (
    
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="right">
          <IconButton
            
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right" component="th" scope="row">
          {row.CaseNum}
        </TableCell>
        <TableCell align="right">{row.ClientName}</TableCell>
        <TableCell align="right">{row.CaseType}</TableCell>
        <TableCell align="right">{row.CurrStage}</TableCell>
        <TableCell align="right"> {<QuickChanges setRenderAllCases={setRenderAllCases} CaseNum={row.CaseNum} currCaseDetails={row} currCaseTypeDetails={casesTypes} loginType={loginType}/>} </TableCell>
      </TableRow>
      <TableRow>
        
          <Container in={open} timeout="auto" unmountOnExit>
             {
                Descriptions.length>0 ? Descriptions.map((description) => (
                  descriptionKey=descriptionKey+1 ,
                  <TableDescription key= {descriptionKey} index ={descriptionKey} text={description}/>
                  
                ))
                :
                <></>
                
                }

           
          </Container>
        
      </TableRow>
    </React.Fragment>
  );
}


export default function CollapsibleTable(props) {

  //previewIndex: 
  // 0--> תיקים פעילים
  // 1--> כל התיקים
  let index = -1

        return (
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell align="right">מספר תיק</TableCell>
                    <TableCell align="right">שם הלקוח</TableCell>
                    <TableCell align="right">סוג התיק</TableCell>
                    <TableCell align="right">שלב נוכחי</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {
                   
                 props.cases.map((row) => (
                    index=index+1,
                    <Row key={row.CaseNum} row={row} casesTypes={props.casesType} setRenderAllCases={props.setRenderAllCases} index={index} loginType={props.loginType}/>
                  ))
                  
                  
                  }
                </TableBody>
              </Table>
            </TableContainer>
          );




    
    
  
}