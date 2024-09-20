import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCount, deleteFromCart, fetchCart, selectAllItems, selectIsLoading, subtractFromCount } from '../states/cart-slice'
import { Link } from 'react-router-dom'
import CarDetails from '../components/CarDetails'
import { Alert, Box, Button, Dialog, Grid2, IconButton, Stack, Typography } from '@mui/material'
import { Add, ControlPoint, Delete, Redo, Remove } from '@mui/icons-material'
import Extras from '../components/Extras'
import cart from '../images/cart.jpg'
import { removeItemFromCart, updateQuantity } from '../services/cart'
import loadingGif from '../images/loading.gif'
import Payment from '../components/Payment'
import { selectUser } from '../states/user-slice'

const ShoppingCart = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [openDetails, setOpenDetails] = useState(false)
    const [openPayment, setOpenPayment] = useState(false)
    const [currentCar, setCurrentCar] = useState(undefined)
    const [currentItem, setCurrentItem] = useState(undefined)

    const [isLoading, setIsLoading] = useState(useSelector(selectIsLoading))
    const items = useSelector(selectAllItems)
    const userId = useSelector(selectUser)?.userId

    let totalToPay = 0
    items.map(item => {
        totalToPay += item.car.price * item.quantity
        item?.extras.map(e => totalToPay += e.price)
    })
    const discount = items.length > 2 ? totalToPay * 0.15 : 0

    const addCount = async (cartItem) => {
        const updatedItem = { ...cartItem, quantity: cartItem.quantity + 1 }
        try {
            const res = await updateQuantity(updatedItem)
            console.log('Item updated successfully:', res)
            dispatch(addToCount(res))
        } catch (error) {
            console.error('Error updating item:', error.message)
            alert('אירעה שגיאה בעדכון הכמות. אנא נסה שוב.')
        }
    }
    const subtractCount = async (cartItem) => {
        if (cartItem.quantity === 1) {
            removeFromCart(cartItem.cartItemId)
        }
        else {
            const updatedItem = { ...cartItem, quantity: cartItem.quantity - 1 }
            try {
                const res = await updateQuantity(updatedItem)
                console.log('Item updated successfully:', res)
                dispatch(subtractFromCount(res))
            } catch (error) {
                console.error('Error updating item:', error.message)
                alert('אירעה שגיאה בעדכון הכמות. אנא נסה שוב.')
            }
        }

    }

    const removeFromCart = async (id) => {
        try {
            const removedItem = await removeItemFromCart(id)
            dispatch(deleteFromCart(removedItem))
        } catch (error) {
            alert("error ", error.message)
        }
    }

    useEffect(() => {
        const fetchItems = async () => {
            await dispatch(fetchCart(userId))
        };
        userId != undefined && fetchItems()
        return () => {
            setIsLoading(false)
        }
    }, [dispatch, userId])

    return (
        <>
            <Dialog open={isLoading}>
                <img src={loadingGif} alt='loading' />
            </Dialog>
            {userId === undefined ?
                <Alert severity="warning">
                    <h3>כדי לצפות בעגלת הקניות עליך להכנס לחשבון</h3>
                </Alert> :
                !isLoading &&
                (items.length > 0 ?
                    <Grid2 container spacing={8} marginLeft={10} marginTop={5} maxWidth={0.9}>
                        <Grid2 item xs={4} bgcolor={'primary.light'} padding={5} maxHeight={'300px'}>
                            <Typography variant='h5' textAlign='center'>סיכום הזמנה</Typography>
                            <Grid2 container m={2} borderTop={'2px solid #9E9E9E'}>
                                <Grid2 item xs={6} align={'left'}>₪ {totalToPay}</Grid2>
                                <Grid2 item xs={6} align={'right'}>סכום ביניים</Grid2>
                            </Grid2>
                            <Grid2 container m={2} borderTop={'2px solid #9E9E9E'}>
                                <Grid2 item xs={6} align={'left'}>₪ {discount}</Grid2>
                                <Grid2 item xs={6} align={'right'}>הנחה</Grid2>
                            </Grid2>
                            <Grid2 container align={'center'} m={2} borderTop={'2px solid #9E9E9E'}>
                                <Grid2 item xs={6} align={'left'}>₪ {totalToPay - discount}</Grid2>
                                <Grid2 item xs={6} align={'right'}>סה"כ לתשלום</Grid2>
                            </Grid2>
                            <Button variant='contained' fullWidth onClick={() => setOpenPayment(true)}>לסיום הזמנה</Button>
                        </Grid2>
                        <Grid2 item xs={8}>
                            <Typography variant='h5' fontWeight={'bold'} textAlign={'center'}>הסל שלי</Typography>
                            <Stack>
                                {items.map(item =>
                                    <Grid2 container align={'right'} alignItems={'center'} p={2} key={item?.cartItemId} borderBottom={'1px #BDBDBD solid'}>
                                        <Grid2 color={'red'} item xs={2}>
                                            <h4>₪ {item?.car?.price * item?.quantity} :סה"כ</h4>
                                            <p>
                                                ₪ {(item?.extras?.reduce((total, extra) => total + (+extra?.price), 0) || 0) * item?.quantity}
                                                :סה"כ תוספות
                                            </p>
                                        </Grid2>
                                        <Grid2 align={'center'} item xs={2}>
                                            {item?.quantity === 60 ?
                                                <IconButton disabled variant='outlined'><ControlPoint /></IconButton>
                                                : <IconButton sx={{ ":hover": { backgroundColor: 'secondary.main' } }} variant='outlined' onClick={() => addCount(item)}><Add /></IconButton>}
                                            <Typography >{item?.quantity}</Typography>
                                            <IconButton sx={{ ":hover": { backgroundColor: 'secondary.main' } }} variant='outlined' onClick={() => subtractCount(item)}><Remove /></IconButton>
                                        </Grid2>
                                        <Grid2 item xs={2}>
                                            <h4>₪ {item?.car?.price}</h4>
                                            <h5>ליום</h5>
                                        </Grid2>
                                        <Grid2 item xs={2}>
                                            <h4>{item?.car?.carName}</h4>
                                        </Grid2>
                                        <Grid2 item xs={2} onClick={() => { setOpenDetails(true); setCurrentCar(item?.car) }}>
                                            <img height={100} src={item?.car?.imagePath} alt={item?.car?.carName} />
                                        </Grid2>
                                        <Grid2 item xs={2}>
                                            <IconButton color='secondary' onClick={() => removeFromCart(item?.cartItemId)}>
                                                <Delete />
                                            </IconButton>
                                        </Grid2>
                                        <Button color='secondary' variant='contained' onClick={() => { setCurrentItem(item); setOpen(true) }}>תוספות</Button>
                                        <Dialog open={open} onClose={() => setOpen(false)}>
                                            <Extras cartItem={currentItem} />
                                        </Dialog>
                                        <Dialog open={openDetails} onClose={() => setOpenDetails(false)}>
                                            <CarDetails myCar={currentCar} />
                                        </Dialog>
                                        <Dialog open={openPayment} onClose={() => setOpenPayment(false)}>
                                            <Payment total={totalToPay - discount} />
                                        </Dialog>
                                    </Grid2>
                                )}
                            </Stack>
                            <Box align={'right'}>
                                <Link to={'/cars'}>
                                    <IconButton color='black' title='חזרה לרשימת הרכבים'>
                                        <Redo />
                                    </IconButton>
                                </Link>
                            </Box>
                        </Grid2>
                    </Grid2>
                    : <Box align={'center'}>
                        <img className='img' src={cart} />
                        <h3>עגלת הקניות שלך ריקה</h3>
                        <h5>מומלץ להוסיף את הרכבים האהובים עליך ולהשוות ביניהם</h5>
                        <Link to={'/cars'}>
                            <Button variant='contained' color='secondary'>לרשימת הרכבים</Button>
                        </Link>
                    </Box>)}
        </>
    )
}

export default ShoppingCart