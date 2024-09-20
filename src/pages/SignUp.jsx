import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../states/user-slice.js';
import { Box, Stack, TextField } from '@mui/material';
import { addUser, createUser, loginApi } from '../services/users.js';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [roleId, setRoleId] = useState(2);
    const [licenseNumber, setLicenseNumber] = useState('');
    const [age, setAge] = useState(0);

    const [error, setError] = useState(false)

    const user = useSelector(selectUser)

    const handleSubmit = async () => {
        const newUser = {
            userName: userName,
            idnumber: idNumber,
            email: email,
            phoneNumber: phoneNumber,
            userPassword: password,
            licenseNumber: licenseNumber,
            age: Number(age),
        }
        try {
            const result = await createUser(newUser)
            console.log('User created successfully:', result)
            handleLogin(result)
            navigate('/')
        } catch (error) {
            console.log(error.massage)
        }
    }
    const handleLogin = async (userResult) => {
        try {
            const response = await loginApi({ Idnumber: userResult.idnumber, UserPassword: userResult.userPassword })
            localStorage.setItem('token', response.tokens[0].tokenJwt)
            dispatch(login(response))
        } catch (error) {
            console.error('שגיאה במהלך ההתחברות:', error);
        }
    }

    const handleAddUser = async () => {
        const newUser = {
            userName: userName,
            idnumber: idNumber,
            email: email,
            phoneNumber: phoneNumber,
            userPassword: password,
            licenseNumber: licenseNumber,
            age: Number(age),
            roleId: roleId
        }
        try {
            await addUser(newUser)
            alert("משתמש נוסף בהצלחה")
            navigate('/')
        } catch (error) {
            console.log(error.massage)
        }
    }

    return (
        <>
            <Box>
                <Stack alignItems={''} >
                    <Box display={'flex'} sx={{ m: 1 }}>
                        <TextField required fullWidth label='שם מלא' onChange={(e) => setUserName(e.target.value)} />
                    </Box>
                    <Box display={'flex'} sx={{ m: 1 }}>
                        <TextField required fullWidth label='סיסמא' onChange={(e) => setPassword(e.target.value)} />
                    </Box>
                    <Box display={'flex'} sx={{ m: 1 }}>
                        <TextField required label='גיל' type='number' fullWidth onChange={(e) => setAge(e.target.value)} />
                        <TextField required label='טלפון' type='number' fullWidth onChange={(e) => setPhoneNumber(e.target.value)} />
                    </Box>
                    <TextField required label='מספר ת"ז / דרכון' onChange={(e) => setIdNumber(e.target.value)} />
                    {error ? <TextField error helperText={'כתובת דוא"ל לא תקינה'} required type='email' label='דוא"ל'
                        onChange={(e) => !e.target.value.includes('@') ? setError(true) : setError(false)} /> :
                        <TextField required type='email' label='דוא"ל'
                            onChange={(e) => {
                                !e.target.value.includes('@') ? setError(true) : setError(false);
                                setEmail(e.target.value)
                            }
                            } />}
                    <TextField required fullWidth label='מספר רשיון' onChange={(e) => setLicenseNumber(e.target.value)} />
                    {user?.roleId === 1 &&
                        <TextField required fullWidth type='number' label='מזהה תפקיד' onChange={(e) => setRoleId(e.target.value)} />}
                </Stack>
                {user?.roleId === 1 ?
                    <button onClick={handleAddUser}>הוספת משתמש</button>
                    : <button onClick={handleSubmit}>הרשמה</button>}
            </Box>

        </>
    );
};

export default SignUp;