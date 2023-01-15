import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styled from '@emotion/styled';
import TableDescription from './TableDescription';


const Container = styled(Collapse)({

  ".MuiCollapse-wrapper": {
    width: 50
  }
})

function Row(props) {

  const { name, descriptions, index } = props;
  const [open, setOpen] = React.useState(false);

  let descriptionKey = 0

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
          {props.name}
        </TableCell>
        {/* <TableCell align="right">
          פעולות
        </TableCell> */}

      </TableRow>
      <TableRow>
        <Container in={open} timeout="auto" unmountOnExit>
          {

            descriptions[index].map((description) => (
              descriptionKey = descriptionKey + 1,
              <TableDescription index={descriptionKey} text={description} />
            ))
          }
        </Container>
      </TableRow>
    </React.Fragment>
  );
}

const CaseTypeTable = ({ casesType, casesTypeNames }) => {
  let caseTypeKey = -1


  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right">סוג התיק</TableCell>
            {/* <TableCell align="right">פעולות</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>

          {
            casesTypeNames.map((name) => (
              caseTypeKey = caseTypeKey + 1,
              <Row key={caseTypeKey} name={name} descriptions={casesType} index={caseTypeKey} />
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CaseTypeTable