import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginApi } from '../services/users'
import { login, logout, selectUser } from '../states/user-slice'
import { Badge, Button, IconButton, Menu, MenuItem, TextField, Typography } from '@mui/material'
import { FormatListBulleted } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [anchorEl, setAnchorEl] = useState(null)
    const openLogin = Boolean(anchorEl)
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleLogin = async () => {
        try {
            const response = await loginApi({ Idnumber: id, UserPassword: password })
            localStorage.setItem('token', response.tokens[0].tokenJwt)
            dispatch(login(response))
            setAnchorEl(null)
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data);
            } else {
                console.log('שגיאה בלתי צפויה:', error);
            }
        }
    }

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div>
            {user ? (
                <>
                    <Button color='primary' variant='contained' onClick={handleClick}>
                        !שלום, {user.userName}
                    </Button>
                    <Menu anchorOrigin={{ vertical: 'top', horizontal: 'left', }}
                        anchorEl={anchorEl}
                        open={openLogin}
                        onClose={() => setAnchorEl(null)}>
                        <MenuItem onClick={() => setAnchorEl(null)}>
                            <IconButton>
                                <Link to={'/orders'}>
                                    <Badge sx={{ color: 'secondary.main' }}>
                                        <Typography> ההזמנות שלי </Typography>
                                        <FormatListBulleted />
                                    </Badge>
                                </Link>
                            </IconButton>
                        </MenuItem>
                        <MenuItem onClick={() => setAnchorEl(null)}>
                            <Button>
                                <Link to={'/userProfile'}>
                                    <Typography>עדכון הפרטים שלי</Typography>
                                </Link>
                            </Button>
                        </MenuItem>
                        <MenuItem onClick={() => setAnchorEl(null)}>
                            <Button color='error' variant='contained' onClick={handleLogout}>התנתק</Button>
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <>
                    <Button color='error' variant='contained' onClick={handleClick}>
                        כניסה
                    </Button>
                    <Menu anchorOrigin={{ vertical: 'top', horizontal: 'left', }}
                        anchorEl={anchorEl}
                        open={openLogin}
                        onClose={() => setAnchorEl(null)}>
                        <MenuItem>
                            <TextField type="tel" label="מספר זהות" variant="outlined" onChange={e => setId(e.target.value)} />
                        </MenuItem>
                        <MenuItem>
                            <TextField type="password" label="סיסמא" variant="outlined" onChange={e => setPassword(e.target.value)} />
                        </MenuItem>
                        <MenuItem>
                            <Button onClick={handleLogin}>התחבר</Button>
                            <Link to={'/signUp'}>אין לך חשבון? הרשם</Link>
                        </MenuItem>
                    </Menu>
                </>
            )}
        </div>
    )
}

export default Login

