import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Fab } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Margin } from '@mui/icons-material';

const Search = (props) => {
    const [inputValue, setInputValue] = React.useState('');

    const updateCases = (e) => {
        props.onClick(e, inputValue)
        setInputValue('')

    }

 
   

  return (
    <div style={{marginTop:'12px' ,marginBottom:'12px'}}>

       <label> חיפוש תיק</label>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        style={{ display: 'inline-block' , width:'40%', height:'20px' , marginLeft:'10px' , marginRight:'10px'}}
      />
      <div style={{display:"inline-block"}}>
      <Tooltip title="שלח">
          <SearchIcon style={{ display:'inline-block' , fontSize:'large' , marginTop:'15px'}} onClick={updateCases} />
        </Tooltip>
      </div>
    
      
    </div>
  )
}

export default Search