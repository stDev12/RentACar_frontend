import React from 'react'
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const About = () => {
    return (
        <>
            <Box align={'center'} m={7}>
                <Typography variant='h4'>RENT-A-CAR אודות</Typography>
                <Typography variant='h6'>,אנו מציעים מגוון רחב של כלי רכב משנות הדגם האחרונות</Typography>
                <Typography variant='h6'>.שאותם ניתן להשכיר לתקופות ארוכות וקצרות טווח</Typography>
                <Typography variant='h6'>,אנו שמים דגש רב על שביעות רצונו של הלקוח</Typography>
                <Typography variant='h6'>,לשם השגת מטרה זו, מושקעים מאמצים רבים לשדרוג מתמיד של תשתית החברה</Typography>
                <Typography variant='h6'>.מחלקת התפעול והשירות , מוקד שירות הלקוחות</Typography>
                <Typography variant='h6'>.לחברה צוות עובדים מיומן ומקצועי בשילוב מערכות מידע מתקדמות</Typography>
                <p>:היתרונות שלנו</p>
                <h5> ללא דמי מנוי <DirectionsCarRoundedIcon /></h5>
                <h5> רכבים חדשים <DirectionsCarRoundedIcon /></h5>
                <h5> מלאי גדול וזמין <DirectionsCarRoundedIcon /></h5>
                <h5> פריסה רחבה של סניפים <DirectionsCarRoundedIcon /></h5>
                <h5> שירות ותמיכה 24 שעות ביממה <DirectionsCarRoundedIcon /></h5>
                <Typography>.אתם מוזמנים להצטרף לאלפי המנויים שלנו ולחוות עולם חדש וממכר: להשתמש ברכב מתי שאתם רק רוצים</Typography>
                <Typography>.באמצעות הזמנה פשוטה במערכת האוטומטית, דלתות הרכבים החדשים שלנו יפתחו עבורכם, בדיוק היכן ומתי שאתם צריכים</Typography>
                <Typography>.מאות הרכבים שלנו מחכים לכם, כדי להוביל אתכם לכל יעד בקלות, בבטחה והמון חדשנות</Typography>
                <Link to={'/cars'}>
                    <Button variant='contained' color='secondary'>הזמינו עכשיו</Button>
                </Link>
            </Box>
        </>
    )
}

export default About