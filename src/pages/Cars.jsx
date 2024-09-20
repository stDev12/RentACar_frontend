import React, { useEffect, useState } from 'react'
import { getCars } from '../services/cars'
import { Link } from 'react-router-dom'
import { Box, Dialog, Paper, Typography } from '@mui/material'
import loadingGif from '../images/loading.gif'
import { PeopleAltOutlined } from '@mui/icons-material';

const Cars = () => {
    const [allCars, setAllCars] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getAllCars = async () => {
        setIsLoading(true)
        try {
            const carsList = await getCars()
            setAllCars(carsList)
        } catch (error) {
            alert("error ", error.message)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getAllCars()
    }, [])

    return (
        <>
            <Dialog open={isLoading}>
                <img src={loadingGif} alt='loading' />
            </Dialog>
            {!isLoading &&
                <Box sx={{ textAlign: 'center', padding: 1 }}>
                    <h6>מתלבטים? הוסיפו כל רכב שאתם רוצים לסל הקניות ושם תוכלו להשוות בקלות בין הרכבים שבחרתם</h6>
                    {allCars.map(car =>
                        <Paper key={car?.carId} sx={{ display: 'inline-block', margin: 3 }} elevation={5}>
                            <Link className='link' to={`${car.carId}`}>
                                <Box display={'inline-block'} bgcolor={'secondary.main'} width={0.6} m={'auto'} color={'primary.main'}
                                    sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>{car?.rating === 5 ? 'מומלץ' : ' '}</Box>
                                <Box paddingX={2}>
                                    <img className='img' src={car?.imagePath} alt={car?.carName} />
                                </Box>
                                <Box display={'flex'} color={'secondary.main'} alignItems={'center'} px={1}>
                                    <PeopleAltOutlined />
                                    <Typography flex={1} textAlign={'left'} margin={1}>{car?.numberOfPlaces}</Typography>
                                    <Typography flex={1} textAlign={'right'} margin={1}>{car?.carType}</Typography>
                                </Box>
                                <Box bgcolor={'black'} color={'white'}>
                                    <Typography>{car?.carName}</Typography>
                                    <Typography fontWeight={500}>₪ {car?.price}</Typography>
                                </Box>
                            </Link>
                        </Paper>
                    )}
                </Box>
            }
        </>
    )
}

export default Cars