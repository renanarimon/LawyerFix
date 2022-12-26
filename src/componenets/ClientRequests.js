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

import { onValue, ref , set,getDatabase,child,get} from "firebase/database";
import { display } from '@mui/system';
import styled from '@emotion/styled';


const Container = styled(Collapse)({

  ".MuiCollapse-wrapper":{
    width: 50
  }
  })


function Row(props) {
    
    const { request} = props;
    const [open, setOpen] = React.useState(false);
      
    //   let descriptionKey=0
    //   console.log(descriptions[index])
      



    
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
            {/* {props.name} */}
            {request.ClientName}
          </TableCell>
          <TableCell align="right">
            {request.Contact}
          </TableCell>
          <TableCell align="right">
            {request.Status ? "טופל" : "לא טופל"}
          </TableCell>
          
        </TableRow>
        <TableRow>
          {/* <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}> */}
            <Container in={open} timeout="auto" unmountOnExit>
                <p>{request.Request}</p>
            </Container>
          {/* </TableCell> */}
        </TableRow>
      </React.Fragment>
    );
  }




const ClientRequests = (props) => {
    let requestID = -1
    

    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="right">שם הלקוח</TableCell>
              <TableCell align="right">יצירת קשר</TableCell>
              <TableCell align="right">פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  
            {    
             props.Requests.map((request) => (   
              requestID= requestID+1,
              console.log("key check:"+requestID),
              console.log(request),
              <Row key={requestID} request={request}/> 
            ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

export default ClientRequests