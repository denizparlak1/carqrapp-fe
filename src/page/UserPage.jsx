import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { getUserDataApi } from "../hook/UserDataApi";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MessageIcon from '@mui/icons-material/Message';
import PhoneIcon from '@mui/icons-material/Phone';
import Box from '@mui/material/Box';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import { styled } from '@mui/system';
import Telegram from '@mui/icons-material/Telegram';
import {CarPlateComponent} from "../component/CarPlateComponent";
import {UserMessageComponent} from "../component/UserMessageComponent";
import {Sms} from "@mui/icons-material";


const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f44336',
        },
        background: {
            paper: '#f5f5f5',
        },
    },
});
const UserPage = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserData = async () => {
            const response = await getUserDataApi(userId)
            const data = await response.json()
            setUserData(data);
        };
        fetchUserData();

    }, [userId]);

    useEffect(() => {

        if (userData.first_login) {
            navigate('/register',{ state: { userId } });
        }
    }, [userData, navigate]);


    const openTelegram = (username) => {
        const url = `https://t.me/${username}`;
        window.open(url, '_blank');
    }


    const openWhatsApp = (phone) => {
        const message = encodeURIComponent("Merhaba QR Kod üzerinden size ulaşıyorum.");
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    };

    const callPhone = (phone) => {
        window.open(`tel:${phone}`, '_blank');
    };

    const sendSMS = (phone) => {
        window.open(`sms:${phone}`, '_blank');
    };


    return (
        <ThemeProvider theme={theme}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100vh', backgroundColor: 'rgba(65,61,61,0.06)' }}>
                {userData.photo ? (
                    <Avatar alt={userData.email} src={userData.photo} style={{ margin: theme.spacing(1), width: 100, height: 100 }} />
                ) : (
                    <Avatar style={{ margin: theme.spacing(1), backgroundColor: theme.palette.primary.main }}>
                        {userData.email && userData.email.charAt(0).toUpperCase()}
                    </Avatar>
                )}
                {userData.name_permission ? (
                    <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
                        {userData.name} {userData.surname}
                    </Typography>
                ) : (
                    <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
                {userData.name && userData.name.substring(0,2)}*** {userData.surname && userData.surname.substring(0,2)}***
                    </Typography>
                )}
                <CarPlateComponent plateNumber={userData.plate} sx={{margin: theme.spacing(10)}}/>
                <UserMessageComponent message={userData.message} />


                <Typography variant="h5" gutterBottom>
                    {userData.email}
                </Typography>

                <Button variant="contained" color="primary" onClick={() => callPhone(userData.phone)} sx={{ width: 300, marginBottom: theme.spacing(1), backgroundColor: '#af4c4c', color: '#FFFFFF' }}>
                    <PhoneIcon sx={{ marginRight: 1 }} />
                    TELEFON İLE ARAMA YAP
                </Button>

                {userData.sms_permission && (
                    <Button variant="contained" color="primary" onClick={() => sendSMS(userData.phone)} sx={{ width: 300, marginBottom: theme.spacing(1), backgroundColor: '#ceae3f', color: '#FFFFFF' }}>
                        <Sms sx={{ marginRight: 1 }} />
                        SMS İLE İLETİŞİME GEÇ
                    </Button>
                )}

                {userData.phone && userData.whatsapp_permission && (
                    <Button variant="contained" color="primary" onClick={() => openWhatsApp(userData.phone)} sx={{ width: 300, marginBottom: theme.spacing(1), backgroundColor: '#4CAF50', color: '#FFFFFF', '&:hover': { backgroundColor: '#388E3C' } }}>
                        <WhatsAppIcon sx={{ marginRight: 1 }} />
                        WHATSAPP İLE MESAJ GÖNDER
                    </Button>
                )}

                {userData.telegram && userData.telegram_permission && (
                    <Button variant="contained" color="primary" onClick={() => openTelegram(userData.telegram)} sx={{ width: 300, marginBottom: theme.spacing(1), backgroundColor: '#0088cc', color: '#ffffff', '&:hover': { backgroundColor: '#004465' } }}>
                        <Telegram sx={{ marginRight: 1 }}/>
                        TELEGRAM İLE İLETİŞİME GEÇ
                    </Button>
                )}


            </div>
        </ThemeProvider>
    );

};

export default UserPage;
