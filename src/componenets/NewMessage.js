import React from 'react'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Fab } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';


const NewMessage = (props) => {
    const [inputValue, setInputValue] = React.useState('');

    const updateMessage = () => {
        if(props.loginType === 'User'){
            props.setNewLaywerMessage({Role:'Client' ,Message:inputValue})
        }
        else{
            props.setNewLaywerMessage({Role:'Lawyer' ,Message:inputValue})
        }
        setInputValue('')

        
    }
   

  return (
    <div style={{marginTop:'12px'}}>

    
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        style={{ display: 'inline-block' , width:'80%', height:'20px' , marginLeft:'10px' }}
      />
      <div style={{display:"inline-block"}}>
      <Tooltip title="שלח">
          <ArrowCircleLeftIcon style={{ display:'inline-block' , fontSize:'large' , marginTop:'15px'}} onClick={updateMessage} />
        </Tooltip>
      </div>
    
      
    </div>
  )
}

export default NewMessage