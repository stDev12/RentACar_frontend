import React from 'react'
import car1 from '../images/cars/car1.jpg'
import car2 from '../images/cars/car2.jpg'
import car3 from '../images/cars/car3.jpg'
import car4 from '../images/cars/car4.jpg'
import car5 from '../images/cars/car5.jpg'
import car6 from '../images/cars/car6.jpg'
import car7 from '../images/cars/car7.webp'
import car8 from '../images/cars/car8.webp'
import car9 from '../images/cars/car9.webp'
import car10 from '../images/cars/car10.webp'
import car11 from '../images/cars/car11.webp'
import { Box } from '@mui/material'
import UseIndex from '../hooks/UseIndex'
import UseTimer from '../hooks/UseTimer'

const Home = () => {
    const images = [car1, car2, car3, car4, car5, car6, car7, car8, car9, car10, car11]
    const func = () => {
        setTime(1)
    }
    const [image, switchImage] = UseIndex(images, func)
    const { setTime } = UseTimer(1, switchImage)

    return (
        <>
            <Box align={"center"}>
                <img src={image[0]} width={'70%'} />
            </Box>
        </>
    )
}

export default Home