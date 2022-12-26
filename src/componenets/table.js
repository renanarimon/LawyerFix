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


import { db } from "../utils/firebase";
import { onValue, ref , set,getDatabase,child,get} from "firebase/database";



// pullAllCases();

function pullAllCases(){
    return new Promise((resolve,reject)=>{
        let allCasesList=[];
        const dbRef = ref(getDatabase());
        get(child(dbRef, `Users/renana1414@gmailcom/Cases`)).then((snapshot) => {
            if (snapshot.exists()) {
                let index = 0;
                snapshot.forEach(snapshot => {
                  let case_num = snapshot.child("CaseNum").val();
                  let client_name = snapshot.child("ClientName").val();
                  let case_type= snapshot.child("CaseType").val();
                  let curr_stage= snapshot.child("CurrStage").val();
                  let curr_case = {'CaseNum':case_num,'ClientName':client_name,'CaseType':case_type,'CurrStage':curr_stage};
                  allCasesList.push(curr_case);
                })
    
                resolve(allCasesList);
            } else {
                console.log("No data available");
              }
            }).catch((error) => {
              console.error(error);
            });
    
            
    })
    
  
}


// function createData(id, client_name, case_type, curr_stage) {
//   return {
//     id,
//     client_name,
//     case_type,
//     curr_stage,
//     history: [
//       {
//         date: '2020-01-05',
//         customerId: '11091700',
//         amount: 3,
//       },
//       {
//         date: '2020-01-02',
//         customerId: 'Anonymous',
//         amount: 1,
//       },
//     ],
//   };
// }

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align='right'>
          {row.CaseNum}
        </TableCell>
        <TableCell align="right">{row.ClientName}</TableCell>
        <TableCell align="right">{row.CaseType}</TableCell>
        <TableCell align="right">{row.CurrStage}</TableCell>
        {/* <TableCell align="right">{row.protein}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.history.map((historyRow) => ( */}
                    <TableRow key="14/11/1996">
                      <TableCell component="th" scope="row">
                        {"14/11/1996"}
                      </TableCell>
                      <TableCell>{'historyRow.customerId'}</TableCell>
                      <TableCell align="right">{'historyRow.amount'}</TableCell>
                      <TableCell align="right">
                        {Math.round(3 * 17 * 100) / 100}
                      </TableCell>
                    </TableRow>
                  {/* ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    client_name: PropTypes.string.isRequired,
    curr_stage: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    case_type: PropTypes.string.isRequired,
  }).isRequired,
};

// const rows = [
//   createData('111', 'Roi Meshulam', 'ירושה', 3),
//   createData('222', 'Arik Tatievski', 'ירושה', 1),
//   createData('333', 'Taliya Shitreet', 'ירושה', 0),
//   createData('444', 'Renna Rimon', 'ירושה', 2),
//   createData('555', 'Benjamin Netanyau', 'ירושה', 5),
// ];

pullAllCases().then(rows=>{
    for (const row of rows) {
        const {CaseNum} = row
        console.log(CaseNum)
    }
});





export default function CollapsibleTable() {
    console.log("i am here");
   
    

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align='right'>מספר תיק</TableCell>
            <TableCell align="right" size = "small" >שם לקוח </TableCell>
            <TableCell align="right">סוג תיק</TableCell>
            <TableCell align="right">שלב נוכחי</TableCell>
            <TableCell align="right">פעולות</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))} */}

          {/* {rows.map((row)=>( */}
            {/* <Row key={row.id} row={row}/> */}

          {/* ))} */}


        </TableBody>
      </Table>
    </TableContainer>
  );
}