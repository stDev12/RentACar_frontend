import React, { useEffect, useState } from 'react'
import { Box, Rating, Typography } from '@mui/material'
import { PeopleAltOutlined } from '@mui/icons-material'

const CarDetails = ({ myCar }) => {
    const [car, setCar] = useState()
    useEffect(() => {
        setCar(myCar)
        return () => {
            setCar(null)
        }
    }, [myCar])

    return (
        <>
            <Box p={5}>
                <Typography align='center' variant='h3'>{car?.carName}</Typography>
                <img src={car?.imagePath} alt={car?.carName} width={'100%'} />
                <Box display={'flex'} color={'secondary.main'} alignItems={'center'} m={2}>
                    <PeopleAltOutlined />
                    <Typography alignContent={'center'} flex={1} textAlign={'left'} margin={1}>{car?.numberOfPlaces}</Typography>
                    <Box flex={1} align={'center'}>
                        <h3>₪ {car?.price}</h3>
                        <h6>ליום</h6>
                    </Box>
                    <Typography flex={1} textAlign={'right'} margin={1}>{car?.carType}</Typography>
                </Box>
                <Box alignItems={'center'} display={'flex'}>
                    <Typography>{car?.rating}</Typography>
                    <Rating value={car?.rating || 0} precision={0.5} disabled />
                </Box>
            </Box>
        </>
    )
}

export default CarDetails