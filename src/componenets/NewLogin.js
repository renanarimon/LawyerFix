import React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { textAlign } from '@mui/system';






function NewLogin(props) {
    const {setloginType} = props
  const  openAdminPortal = () => {
    setloginType("admin");
    handleCloseMenu();
  };
  const  openUserPortal = () => {
    setloginType("user");
    handleCloseMenu();
  };
  const  openMainPortal = () => {
    setloginType("main");
    handleCloseMenu();
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };   
  return (
    <div >

      <button 
      style={{ textAlign:'center'  ,display: 'block', marginLeft: 'auto',
      marginRight: 'auto'}}
      onClick={handleOpenMenu} 
      aria-controls={open ? 'fade-menu' : undefined} 
      aria-haspopup="true" 
      aria-expanded={open ? 'true' : undefined}
       className="btn-casetype">
        פורטלים
      </button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        TransitionComponent={Fade}
        style={{right:'100px'}}
      >
        <MenuItem value="main" onClick={openMainPortal} style={{justifyContent:'center'}}>דף ראשי</MenuItem>
        <MenuItem value="user" onClick={openUserPortal} style={{justifyContent:'center'}}>פורטל לקוחות</MenuItem>
        <MenuItem value="admin" onClick={openAdminPortal} style={{justifyContent:'center'}}>פורטל מנהלים</MenuItem>
      </Menu>
    </div>
  );
}

export default NewLogin;