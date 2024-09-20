import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import notFoundGif from '../images/notFound.gif'
import { Link } from 'react-router-dom'
import UseTimer from '../hooks/UseTimer'


const NotFound = () => {
    const [message, setMessge] = useState(false)
    UseTimer(4, () => setMessge(true))

    return (
        <Box bgcolor={'primary'} align={'center'}>
            <img src={notFoundGif} />
            {message &&
                <>
                    <h2>עמוד לא נמצא</h2>
                    <Box align={'center'}>
                        <Link to={'/'}>
                            <Button variant='contained' color='secondary'>חזרה לדף הבית</Button>
                        </Link>
                    </Box>
                </>}
        </Box>
    )
}

export default NotFound