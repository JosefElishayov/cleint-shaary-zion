import { Button, Dialog, DialogContent, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { MyContext } from '../../../context/myContext';
export default function ConnectUser(props) {
    const { setDonationConnect, setDonationUrl } = useContext(MyContext);
    const location = useLocation();
    const { isConnect, setIsConnect } = props;
    const nav = useNavigate()
    const handleClose = () => {
        setIsConnect(false);
    };
    return (
        <Dialog open={isConnect} onClose={handleClose} maxWidth="md" fullWidth>
            <Typography sx={{ background: 'red' }} variant="h4" align="center">המערכת זיהתה שאינך מחובר </Typography>
            <DialogContent sx={{ textAlign: "center" }}>
                <Typography className='my-5' variant="body1" align="center">שים לב אם הינך מחובר תוכל לראות את היסטוריית התרומות </Typography>
                <Button onClick={() => {
                    nav("/login");
                    setDonationConnect(true);
                    setDonationUrl(location.pathname)
                }}
                    color='warning' variant='contained'>משתמש רשום</Button>
                <Button onClick={() => { 
                    nav("/signup"); 
                    setDonationConnect(true); 
                    setDonationUrl(location.pathname) }}
                 className='mx-2' color='warning' variant='contained'>משתמש חדש</Button>
                <Button className='mt-3 mt-sm-0'
                 onClick={() => { setIsConnect(false); }} 
                color='warning' variant='contained'>ללא התחברות</Button>
            </DialogContent>
        </Dialog>
    )
}
