import React from 'react'
import logo from '../images/logo.png'
import { Link, NavLink, Outlet } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { selectConutItems } from '../states/cart-slice';
import { useSelector } from 'react-redux';
import { Button, Container, Toolbar, AppBar, Badge, IconButton, Tooltip, Grid2 } from '@mui/material'
import { selectUser } from '../states/user-slice';
import Login from './Login';

const Header = () => {
    const user = useSelector(selectUser)
    const countItems = useSelector(selectConutItems)

    return (
        <>
            <AppBar position="sticky">
                <Container maxWidth='xl'>
                    <Toolbar disableGutters>
                        <Grid2 mr={0} container alignItems={'center'}>
                            <Grid2 size={"auto"}>
                                {/* <Button sx={{ color: 'primary.contrastText', width: 1 / 4, m: 'auto' }} ><Typography >English</Typography></Button> */}
                                <Grid2 size={"grow"}>
                                    <Login />
                                </Grid2>
                                {user !== null &&
                                    <>
                                        <Grid2 size={"auto"}>
                                            <Tooltip title='סל קניות' >
                                                <IconButton size="large">
                                                    <Link to={'/cart'}>
                                                        <Badge sx={{ color: 'primary.contrastText' }} badgeContent={countItems} color="error">
                                                            <ShoppingCartOutlinedIcon />
                                                        </Badge>
                                                    </Link>
                                                </IconButton>
                                            </Tooltip>
                                        </Grid2>
                                        <Grid2 size={"auto"}>
                                        </Grid2>
                                    </>}
                            </Grid2>
                            <Grid2 size={8} textAlign={'center'}>
                                <Link to={'/'} title='דף הבית'>
                                    <img src={logo} alt='לוגו' width={'30%'} />
                                </Link>
                            </Grid2>
                            <Grid2 size={"auto"} sx={{ display: { xs: 'block', sm: 'flex' } }}>
                                <Grid2 size={4}>
                                    <Button sx={{ ":hover": { backgroundColor: 'secondary.main' } }}>
                                        <NavLink to={'/contact'} className={'link'} style={({ isActive }) => isActive ? { color: '#018786' } : { color: 'white' }}>
                                            צור קשר</NavLink>
                                    </Button>
                                </Grid2>
                                <Grid2 size={4}>
                                    <Button sx={{ ":hover": { backgroundColor: 'secondary.main' } }}>
                                        <NavLink to={'/cars'} className={'link'} style={({ isActive }) => isActive ? { color: '#018786' } : { color: 'white' }}>
                                            השכרת רכב</NavLink>
                                    </Button>
                                </Grid2>
                                {user?.roleId === 1 || user?.roleId === 3 ?
                                    <Button color='secondary' variant='contained'>
                                        <Link to={'/signUp'}>הוספת משתמש</Link>
                                    </Button>
                                    :
                                    <Grid2 size={4} >
                                        <Button sx={{
                                            ":hover": { backgroundColor: 'secondary.main' }
                                        }}>
                                            <NavLink to={'/about'} className={'link'} style={({ isActive }) => isActive ? { color: '#018786' } : { color: 'white' }}>
                                                אודות</NavLink>
                                        </Button>
                                    </Grid2>}
                            </Grid2>
                        </Grid2>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
        </>
    );
}
export default Header