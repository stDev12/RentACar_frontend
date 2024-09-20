import React, { useEffect, useState } from 'react'
import { deleteOrder, getOrdersByUser } from '../services/orders'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { Alert, Box, Dialog, Grid, Grid2, IconButton, Paper, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { selectUser } from '../states/user-slice';
import CarDetails from '../components/CarDetails';

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [orderDetails, setOrderDetails] = useState()
    const [openDetails, setOpenDetails] = useState(false)
    const [currentCar, setCurrentCar] = useState(undefined)

    const userId = useSelector(selectUser)?.userId
    const getAllOrders = async (id) => {
        try {
            const ordersList = await getOrdersByUser(id)
            setOrders(ordersList)
        } catch (error) {
            alert("error ", error.message)
        }
    }
    const handleDeleteOrder = async (id) => {
        try {
            const deletedOrder = await deleteOrder(id)
            const filteredOrders = orders.filter(o => o.orderId !== id)
            setOrders(filteredOrders)
            alert(`הזמנה מספר ${deletedOrder.orderId} בוטלה`)
        } catch (error) {
            alert("error ", error.message)
        }
    }

    useEffect(() => {
        userId !== undefined && getAllOrders(userId)
    }, [])

    return (
        <>
            {userId === undefined ?
                <Alert severity="warning">
                    <h3>כדי לצפות בהזמנות עליך להכנס לחשבון</h3>
                </Alert>
                : <>
                    <Box align={'right'} m={7}>
                        <Typography variant='h3'>ההזמנות שלי</Typography>
                        <Typography variant='h6'>סה"כ {orders.length} הזמנות</Typography>
                    </Box>
                    {orders.map(
                        order =>
                            <Box key={order?.orderId} align='center' marginX={10}>
                                <Paper>
                                    <Typography align='right'>התבצעה ב: {order?.orderDate?.slice(0, 10)}</Typography>
                                </Paper>

                                <Grid container bgcolor={'secondary.light'} style={{ cursor: 'pointer' }} onClick={() => setOrderDetails(order?.rentals)}>
                                    <Grid item xs={2}>
                                        {(new Date(order?.orderDate).getTime() - Date.now()) / (1000 * 60 * 60) > -48 &&
                                            <IconButton color='primary' onClick={() => handleDeleteOrder(order?.orderId)}>
                                                <CancelPresentationIcon />
                                            </IconButton>}
                                    </Grid>
                                    <Grid item xs={4}
                                    >סה"כ שולם:
                                        <Typography variant='h5'> ש"ח {order?.totalAmount}</Typography>
                                    </Grid>
                                    <Grid item xs={4} alignSelf={'right'}>הזמנה מספר: {order?.orderId}</Grid>
                                </Grid>
                                {orderDetails === order?.rentals && order?.rentals.map(r =>
                                    <Grid2 container align={'right'} alignItems={'center'} p={2} key={r.rentalId} borderBottom={'1px #BDBDBD solid'}>
                                        <Grid2 color={'red'} item xs={2}>
                                            <h4>₪ {r?.car?.price * r?.countDays} :סה"כ</h4>
                                        </Grid2>
                                        <Typography >{r?.countDays} ימים</Typography>
                                        <Grid2 item xs={2}>
                                            <h4>₪ {r?.car?.price}</h4>
                                            <h5>ליום</h5>
                                        </Grid2>
                                        <Grid2 item xs={2}>
                                            <h4>{r?.car?.carName}</h4>
                                        </Grid2>
                                        <Grid2 item xs={2} onClick={() => { setOpenDetails(true); setCurrentCar(r?.car) }}>
                                            <img height={100} src={r?.car?.imagePath} alt={r?.car?.carName} />
                                        </Grid2>
                                        <Dialog open={openDetails} onClose={() => setOpenDetails(false)}>
                                            <CarDetails myCar={currentCar} />
                                        </Dialog>
                                    </Grid2>
                                )}
                            </Box>
                    )}
                </>
            }
        </>
    )
}

export default Orders