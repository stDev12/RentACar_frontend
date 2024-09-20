import React, { useEffect, useState } from 'react'
import { getCarById } from '../services/cars'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCount, selectAllItems, subtractFromCount, fetchCart, addToCart, deleteFromCart } from '../states/cart-slice'
import { Box, Rating, IconButton, Typography, Button, Alert } from '@mui/material'
import NotFound from './NotFound'
import { Redo } from '@mui/icons-material'
import { addItemToCart, removeItemFromCart, updateQuantity } from '../services/cart'
import { selectUser } from '../states/user-slice'

const CarSelected = () => {
    const dispatch = useDispatch()
    const userId = useSelector(selectUser)?.userId
    const items = useSelector(selectAllItems)
    const [findItem, setFindItem] = useState()
    const [findCar, setFindCar] = useState([])
    const { id } = useParams()

    const getCar = async () => {
        try {
            const car = await getCarById(id)
            setFindCar(car)
        } catch (error) {
            alert("error ", error.message)
        }
    }

    const subtractAmount = async () => {
        const updatedItem = { ...findItem, quantity: findItem.quantity - 1 }
        setFindItem(updatedItem)
        if (findItem.quantity === 1) {
            const removedItem = await removeItemFromCart(findItem.cartItemId)
            dispatch(deleteFromCart(removedItem))
        }
        else {
            try {
                const res = await updateQuantity(updatedItem);
                dispatch(subtractFromCount(res))
            } catch (error) {
                console.error('Error updating item:', error.message)
                alert('אירעה שגיאה בעדכון הכמות. אנא נסה שוב.')
                setFindItem({ ...findItem, quantity: findItem.quantity })
            }
        }
    }
    const addAmount = async () => {
        if (findItem) {
            const updatedItem = { ...findItem, quantity: findItem.quantity + 1 }
            setFindItem(updatedItem);
            try {
                const res = await updateQuantity(updatedItem)
                dispatch(addToCount(res))
            } catch (error) {
                console.error('Error updating item:', error.message)
                alert('אירעה שגיאה בעדכון הכמות. אנא נסה שוב.')
                setFindItem({ ...findItem, quantity: findItem.quantity })
            }
        }
        else {
            const newItem = { userId: userId, carId: findCar.carId }
            try {
                const res = await addItemToCart(newItem)
                res.car = findCar
                setFindItem(res)
                dispatch(addToCart(res))
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    useEffect(() => {
        const fetchItems = async () => {
            await dispatch(fetchCart(userId))
        }
        fetchItems()
    }, [dispatch, userId])

    useEffect(() => {
        if (items.length > 0) {
            const specificItem = items.find(item => item.carId === findCar.carId)
            if (specificItem) {
                setFindItem(specificItem)
            }
        }
    }, [items, id])

    useEffect(() => {
        getCar()
    }, [])

    return (
        <>
            {userId === undefined ?
                <Alert severity="warning">
                    <h3>כדי לצפות בפרטי הרכב עליך להכנס לחשבון</h3>
                </Alert> :
                !findCar ? <NotFound /> :
                    <Box align={'center'}>
                        <Box align={'right'} mr={20}>
                            <Link to={'/cars'}>
                                <IconButton size='large' color='black' title='חזרה לרשימת הרכבים'>
                                    <Redo />
                                </IconButton>
                            </Link>
                        </Box>
                        <Box mb={1}>
                            <img src={`.${findCar?.imagePath}`} alt={findCar?.carName} width={'30%'} />
                            <h2>{findCar?.carName}</h2>
                            <p>רכב {findCar?.carType}, {findCar?.numberOfPlaces} מושבים {findCar?.info}</p>
                            <Rating value={findCar?.rating || 0} precision={0.5} disabled sx={{ color: '#018786' }} />
                        </Box>
                        <Box>
                            <p> :מחיר ליום</p>
                            <h3>₪ {findCar?.price}</h3>
                        </Box>
                        <Box display={'inline-flex'} alignItems={'center'} border={'1px #018786 solid'} borderRadius={2.5}>
                            {findItem?.quantity === 60 ?
                                <Button disabled >+</Button>
                                : <Button color={'secondary'} onClick={addAmount}>+</Button>
                            }
                            <h5>{findItem?.quantity || 0}</h5>
                            {findItem?.quantity > 0 ?
                                <Button color={'secondary'} onClick={subtractAmount}>-</Button> :
                                <Button disabled>-</Button>
                            }
                        </Box>
                        <Typography fontSize={'10px'}>בחר כמות ימים</Typography>
                        <Box m={2}>
                            {findItem?.quantity > 0 &&
                                <Link to={'/cart'}>
                                    <Button color='secondary' variant='contained'>לסל הקניות</Button>
                                </Link>}
                        </Box>
                    </Box >
            }
        </>
    )
}

export default CarSelected