import React, { useEffect } from 'react'
import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const AddUser = (props) => {

    const [newLawyerUsername, setNewLawyerUsername] = useState('');
    const [newLawyerName, setNewLawyerName] = useState('');
    const [newLawyerPassword, setNewLawyerPassword] = useState('');
    const [showAdd, setShowAdd] = useState(true)

    const handleNewLawyerUsername = (event) => {
        setNewLawyerUsername(event.target.value);
    };
    const handleNewLawyerName = (event) => {
        setNewLawyerName(event.target.value);
    };
    const handleNewLawyerPassword = (event) => {
        setNewLawyerPassword(event.target.value);
    };

    const clearAllFields = () => {
        setNewLawyerUsername('');
        setNewLawyerName('');
        setNewLawyerPassword('');
    };


    const auth = getAuth();

    const createNewUser = () => {
        if (newLawyerUsername === '' || newLawyerPassword === '' || newLawyerName === '') {
            alert("empty fields")
            return
        }
        if (true) {
            createUserWithEmailAndPassword(auth, newLawyerUsername, newLawyerPassword)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const db = getDatabase();
                    let plaster;
                    if (props.userType === 'Lawyer') {
                        plaster = 'Users/' + user.uid;
                        set(ref(db, plaster), {
                            Name: newLawyerName,
                            Role: "Lawyer",
                        })

                    } else if (props.userType === 'Client') {
                        plaster = 'Users/' + user.uid;
                        set(ref(db, plaster), {
                            Name: newLawyerName,
                            Role: "User",
                        })
                        props.handleNewClinetName(newLawyerName)
                        props.setNewClinetUID(user.uid)
                        props.setCreatedNewUser(0)
                    } else {
                        alert("ERROR: create new user")
                    }
                }
                )
            clearAllFields()
            alert("התווסף משתמש חדש למערכת")
            setShowAdd(false)
        }
    };

    return (
        <>
            {showAdd ?
                <div className='addLawyer'>
                    <input type='text'
                        placeholder='הכנס/י שם משתמש חדש'
                        style={{ marginTop: '20px', marginRight: '10px', width: '100%', height: '45px', borderRadius: '4px', border: '1px solid #d0b49f', boxSizing: 'border-box', direction: 'rtl' }}
                        onChange={handleNewLawyerName}
                        id="name"
                    />

                    <input type='text'
                        placeholder='הכנס/י מייל משתמש חדש'
                        style={{ marginTop: '20px', marginRight: '10px', width: '100%', height: '45px', borderRadius: '4px', border: '1px solid #d0b49f', boxSizing: 'border-box', direction: 'rtl' }}
                        onChange={handleNewLawyerUsername}
                        id="mail"
                    />

                    <input type='password'
                        placeholder='הכנס/י סיסמה חדשה'
                        style={{ marginTop: '20px', marginRight: '10px', width: '100%', height: '45px', borderRadius: '4px', border: '1px solid #d0b49f', boxSizing: 'border-box', direction: 'rtl' }}
                        onChange={handleNewLawyerPassword}
                        id="pass"
                    />

                    <div>
                        <button onClick={createNewUser} className="btn-casetype" style={{ marginTop: '20px', width: '100%' }}>הוסף משתמש</button>
                    </div>
                </div>
                :
                <div>
                    <AddUser userType={'Lawyer'} lawyeruid={props.lawyeruid}/>
                </div>
            }
        </>


    )
}

export default AddUser