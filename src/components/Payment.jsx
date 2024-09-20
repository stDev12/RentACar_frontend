import React from 'react'
import { Box, Typography } from '@mui/material'
import CreditDetails from './CreditDetails'

const Payment = ({ total }) => {

    return (
        <>
            <Box align={'center'} m={5} bgcolor={'primary.light'} p={2}>
                <h4>:סכום לתשלום</h4>
                <Typography border={'2px solid grey'} variant='h3' maxWidth={300}>₪ {total}</Typography>
            </Box>
            <Box>
                <CreditDetails />
            </Box>
        </>
    )
}

export default Payment