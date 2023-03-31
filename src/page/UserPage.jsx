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
import AdSense from "../component/Adsens";




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

    const CarPlateWrapper = styled(Box)(({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(1),
        borderRadius: '5px',
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
    }));

    const ParkMessageWrapper = styled(Box)(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${theme.palette.primary.main}`,
    }));
    return (
        <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100vh', backgroundColor: theme.palette.background.paper }}>
                {userData.photo ? (
                    <Avatar alt={userData.email} src={userData.photo} style={{ margin: theme.spacing(1), width: 100, height: 100 }} />
                ) : (
                    <Avatar style={{ margin: theme.spacing(1), backgroundColor: theme.palette.primary.main }}>
                        {userData.email && userData.email.charAt(0).toUpperCase()}
                    </Avatar>
                )}


                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: theme.spacing(1) }}>
                    <CarPlateWrapper>
                        <DriveEtaIcon sx={{ marginRight: 1 }} />
                        🇹🇷 {userData.plate}
                    </CarPlateWrapper>
                </Box>




                <Typography variant="h5" gutterBottom>
                    {userData.email}
                </Typography>
                <CardContent>
                    <ParkMessageWrapper>
                        <MessageIcon fontSize="small" sx={{ marginRight: 1, color: theme.palette.primary.main }} />
                        <Typography variant="body1" component="span">
                            Park Mesajı: {userData.message}
                        </Typography>
                    </ParkMessageWrapper>
                </CardContent>


                <Button variant="contained" color="primary" onClick={() => callPhone(userData.phone)}  sx={{marginBottom: theme.spacing(1),backgroundColor: '#af4c4c', color: '#FFFFFF',}}>
                    <PhoneIcon sx={{ marginRight: 1 }} />
                    TELEFON İLE ARAMA YAP
                </Button>

                {userData.phone && userData.whatsapp_permission && (
                    <Button variant="contained" color="primary" onClick={() => openWhatsApp(userData.phone)} sx={{ marginBottom: theme.spacing(1), backgroundColor: '#4CAF50', color: '#FFFFFF', '&:hover': { backgroundColor: '#388E3C' } }}>
                        <WhatsAppIcon sx={{ marginRight: 1 }}/>
                        Whatsap ile iletişime geç
                    </Button>
                )}


                {userData.telegram && userData.telegram_permission && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => openTelegram(userData.telegram)}
                            sx={{marginBottom: theme.spacing(1), backgroundColor: '#0088cc', color: '#ffffff', '&:hover': { backgroundColor: '#004465' }
                            }}
                        >
                            <Telegram/>
                            Telegram ile mesaj gönder
                        </Button>
                )}

            </div>
        </ThemeProvider>
    );

};

export default UserPage;
