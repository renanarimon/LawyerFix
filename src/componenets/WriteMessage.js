import React from 'react'
import { useState, useEffect } from 'react'
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
    // const [counter, setCounter] = useState(1);
    const [count, setCount] = useState(() => {
        const storedCount = localStorage.getItem('count');
        return storedCount ? parseInt(storedCount, 10) : 1;
    });

    useEffect(() => {
        // When the count changes, update the value stored in local storage
        localStorage.setItem('count', count);
    }, [count]);

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
        setNewClientRequest('')
        GetMessages(caseNum)
        setCount(1)
    }

    const writeData = () => {
        if (true) {
            console.log("write: " + newClientRequest)
            const db = getDatabase();
            let path = 'Requests/' + caseNum
            let p;
            if (userType == 0) {
                p = count + "Req"
            } else {
                p = count + "Ans"
            }

            if (count === 1) {
                set(ref(db, path), {
                    [p]: newClientRequest
                })

            } else {
                update(ref(db, path), {
                    [p]: newClientRequest
                })

            }
            GetMessages(caseNum)
            setCount(count + 1)
            handleCloseNewClientRequest();
        }
    }

    return (

        <div className='container' style={{ justifyContent: 'center', display: 'grid' }}>
            <div>
                <button onClick={handleClickOpenNewClientRequest} className="btn-casetype" style={{ width: '50%' }}>שליחת בקשה</button>
                <button onClick={handleCloseReq} className="btn-casetype" style={{ width: '50%' }}>סגור פנייה</button>

            </div>
            {/* <div>
                <p>You have clicked the button {count} times</p>
                <button onClick={() => setCount(count + 1)}>Click me</button>
            </div> */}

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