import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUserDetails } from '../states/user-slice.js';
import { Box, Stack, TextField } from '@mui/material';
import { updateUser } from '../services/users.js';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const user = useSelector(selectUser)

    const [userName, setUserName] = useState(user?.userName);
    const [password, setPassword] = useState(user?.userPassword);
    const [email, setEmail] = useState(user?.email);
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);

    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userToUpdate = {
            userName: userName,
            idnumber: user?.idnumber,
            email: email,
            phoneNumber: phoneNumber,
            userPassword: password,
        }
        try {
            const result = await updateUser(userToUpdate)
            console.log('User updated successfully:', result)
            dispatch(updateUserDetails(result))
            navigate('/')
        } catch (error) {
            console.log(error.massage)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Stack alignItems={''} >
                    <Box display={'flex'} sx={{ m: 1 }}>
                        <TextField required fullWidth label='שם מלא' value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </Box>
                    <Box display={'flex'} sx={{ m: 1 }}>
                        <TextField required fullWidth label='סיסמא' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Box>
                    <Box display={'flex'} sx={{ m: 1 }}>
                        <TextField required label='טלפון' type='number' value={phoneNumber} fullWidth onChange={(e) => setPhoneNumber(e.target.value)} />
                    </Box>
                    {error ? <TextField error helperText={'כתובת דוא"ל לא תקינה'} value={email} required type='email' label='דוא"ל'
                        onChange={(e) => { !e.target.value.includes('@') ? setError(true) : setError(false); setEmail(e.target.value) }} /> :
                        <TextField required type='email' label='דוא"ל' value={email}
                            onChange={(e) => {
                                !e.target.value.includes('@') ? setError(true) : setError(false);
                                setEmail(e.target.value)
                            }
                            } />}
                </Stack>
                <button type="submit">עדכון</button>
            </form>
        </>
    )
}

export default UserProfile