import React from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getDatabase, ref, set, update, remove } from "firebase/database";



const WriteMessage = ({ caseNum, userType, GetMessages }) => {
    const [openNewClientRequest, setOpenNewClientRequest] = React.useState(false);
    const [newClientRequest, setNewClientRequest] = useState('');
    const [counter, setCounter] = useState(1);

    const handleNewClientRequest = (event) => {
        setNewClientRequest(event.target.value);
    };
    const handleClickOpenNewClientRequest = () => {
        setOpenNewClientRequest(true);
    };
    const handleCloseNewClientRequest = () => {
        setOpenNewClientRequest(false);

    };

    

    const handleCloseReq = () => {
        const db = getDatabase();
        let path = 'Requests/' + caseNum
        remove(ref(db, path))
        // setIsOpen(false)
        setNewClientRequest('')
        GetMessages(caseNum)
        setCounter(1)
        // console.log("counter on close: " + counter)
        // alert("פנייה נסגרה בהצלחה")
    }

    const writeData = () => {
        if (true) {
            console.log("write: " + newClientRequest)
            const db = getDatabase();
            let path = 'Requests/' + caseNum

            let p = counter + "Req"
            if (counter === 1) {
                set(ref(db, path), {
                    [p]: newClientRequest
                })

            } else {
                update(ref(db, path), {
                    [p]: newClientRequest
                })

            }
            GetMessages(caseNum)
            setCounter(counter + 1)
            handleCloseNewClientRequest();
        }
    }

    return (

        <div className='container' style={{ justifyContent: 'center', display: 'grid' }}>
            <div>
                <button onClick={handleClickOpenNewClientRequest} className="btn-casetype" style={{ width: '50%' }}>שליחת בקשה</button>
                <button onClick={handleCloseReq} className="btn-casetype" style={{ width: '50%' }}>סגור פנייה</button>

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
                        id="בקשה"
                        label="תיאור הבקשה"
                        fullWidth
                        variant="standard"
                        onChange={handleNewClientRequest}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNewClientRequest}>ביטול</Button>
                    <Button onClick={writeData}>שלח</Button>
                </DialogActions>
            </Dialog>


        </div>
    )
}

export default WriteMessage