import React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getDatabase, ref, set } from "firebase/database";
import { v4 as uuid } from 'uuid';


const ClientReq = (props) => {
    const uid = uuid(); 
    const [openNewClientRequest, setOpenNewClientRequest] = React.useState(false);
    const [newClientRequest, setNewClientRequest] = useState('');
    const [newClientTopic, setNewClientTopic] = useState('');
    const handleNewClientRequest = (event) => {
        setNewClientRequest(event.target.value);
    };
    const handleNewClinetTopic = (event) => {
        setNewClientTopic(event.target.value);
    };
    const handleClickOpenNewClientRequest = () => {
        setOpenNewClientRequest(true);
    };
    const handleCloseNewClientRequest = () => {
        setOpenNewClientRequest(false);
    };
    function writeUserData() {
        const db = getDatabase();
        let plaster = 'ClientReq/'+uid;
        set(ref(db, plaster), {
            Topic: newClientTopic,
            ClinetUID: props.userUID,
            LawyerUID: '11111111111',
            Chat: {
                0 : {
                    Role: "User",
                    message: newClientRequest,
                }
            },
        })
        handleCloseNewClientRequest();
        alert("הבקשה נשלחה בהצלחה")
    }
    return (
        <div className='container' style={{justifyContent:'center', display:'grid'}}>
            <div>
                <button onClick={handleClickOpenNewClientRequest} className="btn-casetype" style={{width:'100%'}}>שליחת בקשה לעו"ד</button>
             </div>

            <Dialog open={openNewClientRequest} onClose={handleCloseNewClientRequest}>
                <DialogTitle>בקשה לעורך דין</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        נא למלא את הפרטים באופן מלא
                    </DialogContentText>
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        id="נושא"
                        label="נושא"
                        fullWidth
                        variant="standard"
                        onChange={handleNewClinetTopic}
                    />
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        id="בקשה"
                        label="תיאור הבקשה"
                        fullWidth
                        variant="standard"
                        onChange={handleNewClientRequest}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNewClientRequest}>ביטול</Button>
                    <Button onClick={writeUserData}>שלח</Button>
                </DialogActions>
            </Dialog>
        
        </div>
    )
}

export default ClientReq