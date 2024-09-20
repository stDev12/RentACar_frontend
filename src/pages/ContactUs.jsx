import { Box, Button, Dialog, DialogContentText, FormControl, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';

const ContactUs = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Box display={'block'} align={'center'} m={'auto'} mt={10} maxWidth={800}>
                <Paper>
                    <Box m={4}>
                        <Typography my={2} variant='h5'>:לקוחות יקרים, תוכלו ליצור איתנו קשר בדרכים הבאות</Typography>
                        <Typography variant='h4'><CallRoundedIcon /> *6402</Typography>
                        <Typography variant='h4'><MailRoundedIcon /> office@rentacar.com</Typography>
                    </Box>
                    <Typography m={1}>או מלאו את הפרטים ונחזור אליכם בהקדם</Typography>
                    <FormControl >
                        <TextField placeholder='שם מלא' />
                        <TextField placeholder='טלפון' />
                        <TextField placeholder='דוא"ל' />
                        <TextField placeholder='תוכן ההודעה' />
                        <Button variant='contained' onClick={() => setOpen(true)}>שלח</Button>
                        <h5>שירות הלקוחות זמין עבורכם בימים א-ה. בין השעות 09:00-17:00</h5>
                        <Dialog open={open} >
                            <Link to={'/'}>
                                <Button>X</Button>
                            </Link>
                            <DialogContentText m={10}>בקשתכם נשלחה בהצלחה</DialogContentText>
                        </Dialog>
                    </FormControl>
                </Paper>
            </Box>
        </>
    )
}

export default ContactUs