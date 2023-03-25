import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import Paper from '@mui/material/Paper';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import { styled } from '@mui/system';

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

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await getUserDataApi(userId)
            const data = await response.json()
            setUserData(data);
        };
        fetchUserData();
    }, [userId]);



    const openWhatsApp = (phone) => {
        const message = encodeURIComponent("Hello, I saw your QR code.");
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
                        🇹🇷 {userData.carPlate}
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


                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing(1) ,width: '18%'}}>
                    <Paper sx={{ display: 'flex',width: '100%' ,alignItems: 'center', backgroundColor: '#53bacc', padding: theme.spacing(1), borderRadius: '5px', fontSize: '20px','&:hover': { backgroundColor: '#f4fcf4' } }}>
                        <PhoneIcon sx={{ marginRight: 1 }} />
                        <Typography variant="body1" onClick={() => callPhone(userData.phone)} style={{ cursor: 'pointer' }}>
                           TELEFON İLE ARAMA YAP
                        </Typography>
                    </Paper>
                </Box>
                <Button variant="contained" color="primary" onClick={() => openWhatsApp(userData.phone)} sx={{ marginBottom: theme.spacing(1), backgroundColor: '#4CAF50', color: '#FFFFFF', '&:hover': { backgroundColor: '#388E3C' } }}>
                    <WhatsAppIcon />
                    Whatsap ile iletişime geç
                </Button>
            </div>
        </ThemeProvider>
    );

};

export default UserPage;
