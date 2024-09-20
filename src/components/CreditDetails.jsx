import { Box, Button, Dialog, Grid2, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import finishGif from '../images/finish.gif'
import { fetchCart, selectAllItems, setCartItems } from '../states/cart-slice'
import { createOrder } from '../services/orders'
import { removeItemFromCart } from '../services/cart'
import { selectUser } from '../states/user-slice'
import { selectIsLoading } from '../states/cart-slice'

const CreditDetails = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [payMessage, setPayMessage] = useState(false)
    const isLoading = useSelector(selectIsLoading)

    const items = useSelector(selectAllItems)
    let totalToPay = 0
    items.map(item => totalToPay += item.car.price * item.quantity)
    const userId = useSelector(selectUser)?.userId

    const pay = async () => {
        const rentalsList = items.map(item => ({
            carId: item.carId,
            countDays: item.quantity
        }))
        const newOrder = { orderDate: new Date(), userId: userId, totalAmount: totalToPay, rentals: rentalsList }
        try {
            const res = await createOrder(newOrder)
            console.log('Order created successfully:', res)
        } catch (error) {
            console.error('Error creatung order:', error.message)
            alert('אירעה שגיאה בשמירת ההזמנה. אנא נסה שוב.')
        }
        items.map(async i => {
            await removeItemFromCart(i.cartItemId)
        })
        setPayMessage(true)
        setCartItems([])
    }

    useEffect(() => {
        const fetchItems = async () => {
            await dispatch(fetchCart(userId))
        }
        fetchItems();
    }, [dispatch, userId])

    return (
        <>
            {!isLoading && <><h2>דף תשלום מאובטח</h2>
                <TextField label={'מספר כרטיס אשראי'} pattern="[0-9]{16}" fullWidth variant='filled' />
                <Grid2 container>
                    <Grid2 item xs={4} m={1}>
                        <TextField label={'cvv'} type='number' variant='filled' fullWidth />
                    </Grid2>
                    <Grid2 item xs={7} m={1}>
                        <TextField label={'שם בעל הכרטיס'} variant='filled' fullWidth />
                    </Grid2>
                </Grid2>
                <Grid2 container>
                    <Grid2 item xs={5} alignContent={'end'}>
                        <Button onClick={() => pay()} variant='outlined' >pay</Button>
                    </Grid2>
                    <Grid2 item xs={6} m={1}>
                        <TextField variant='filled' type='month' label={'תוקף'} fullWidth>
                        </TextField>
                    </Grid2>
                </Grid2>
                <Dialog open={payMessage} onClose={() => navigate('/')}>
                    <Link to={'/'}>
                        <Button fullWidth>X</Button>
                    </Link>
                    <img src={finishGif} />
                    <Box p={5} align={'center'}>
                        <h2>איזה כיף! הזמנתך התקבלה </h2>
                        <h3> ואנחנו כבר מתחילים לטפל בה</h3>
                        <Typography m={2} textAlign={'center'}>נשלח בקרוב מייל עם פרטי ההזמנה</Typography>
                    </Box>
                </Dialog></>}
        </>
    )
}

export default CreditDetails