import React, {useState} from 'react';
import {AppBar, Toolbar, Typography, Button, TextField, Container} from '@mui/material';
import { styled } from '@mui/system';
import {signOut} from "../auth/auth";
import {Link, useNavigate} from "react-router-dom";
import {generatePdfApi} from "../hook/GeneratePdfApi";
import Box from "@mui/material/Box";
import AlertSnackbar from "../alert/Alert";


const StyledContainer = styled(Container)({
    marginTop: 64,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const LogoImage = styled('img')({
    width: '90%',
    maxWidth: '300px',
    marginRight: '16px', // Adjust spacing as needed
});



const AdminPage = () => {
    const [customerName, setCustomerName] = useState('');
    const [qrCodeCount, setQrCodeCount] = useState(30);
    const [pdfUrl, setPdfUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };



    const handleGeneratePdf = async () => {
        setIsLoading(true);
        try {
            setPdfUrl('');
            const pdfUrl = await generatePdfApi(customerName, qrCodeCount, 'user');
            setPdfUrl(pdfUrl.message);

            setAlertSeverity('success');
            setAlertMessage('QR Kod Baskısı info@qrpark.com.tr adresine iletilecektir..');
            setAlertOpen(true);
            setIsLoading(false);
        } catch (error) {
            console.error('PDF generation error:', error.message);
            setAlertSeverity('error');
            setAlertMessage('QR Kod Baskısı oluşturulamadı, tekrar deneyin!');
            setAlertOpen(true);
            setIsLoading(false);
        }
    };


    return (
        <>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Uslu Ajans
                        Yönetici Paneli
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Çıkış</Button>
                    <Button component={Link} to='/reports' color="inherit">Raporlar</Button>
                </Toolbar>
            </AppBar>
            <StyledContainer>
                <TextField
                    margin="normal"
                    label="Müşteri (Proje) İsmi"
                    variant="outlined"
                    onChange={(event) => setCustomerName(event.target.value)}
                />
                <TextField
                    margin="normal"
                    label="Basılacak QR Miktarı"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    defaultValue={qrCodeCount}
                    disabled
                    //onChange={(event) => setQrCodeCount(event.target.value)}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleGeneratePdf} sx={{backgroundColor: 'green' }}>
                        Oluştur
                    </Button>


                </Box>
            </StyledContainer>
            <AlertSnackbar
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                message={alertMessage}
                severity={alertSeverity}
            />


            {pdfUrl === null && isLoading === false && (
                <Typography sx={{ marginTop: 2 }}>PDF dosyası henüz oluşturulmadı.</Typography>
            )}
        </>
    );
};

export default AdminPage;
