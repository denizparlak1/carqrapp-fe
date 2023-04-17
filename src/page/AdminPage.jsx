import React, {useState} from 'react';
import {AppBar, Toolbar, Typography, Button, TextField, Container} from '@mui/material';
import { styled } from '@mui/system';
import {signOut} from "../auth/auth";
import {Link, useNavigate} from "react-router-dom";
import {generatePdfApi} from "../hook/GeneratePdfApi";
import Box from "@mui/material/Box";
import AlertSnackbar from "../alert/Alert";
import {handleLogout} from "../component/LogoutComponent";


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
    const [layerCount, setLayerCount] = useState('1');


    const handleGeneratePdf = async () => {
        setIsLoading(true);
        try {
            setPdfUrl('');
            const pdfUrl = await generatePdfApi(customerName, qrCodeCount, 'user',layerCount);
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
                    <Button component={Link} to='/sample-qr' color="inherit">Örnek QR Oluştur</Button>
                    <Button component={Link} to='/reports' color="inherit">Raporlar</Button>
                    <Button color="inherit" onClick={handleLogout}>Çıkış</Button>
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
                    label="Baskı Tabaka Miktarı"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    defaultValue={qrCodeCount}
                    disabled
                    //onChange={(event) => setQrCodeCount(event.target.value)}
                />
                <TextField
                    margin="normal"
                    label="Baskı Sayısı"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    defaultValue={layerCount}
                    onChange={(event) => setLayerCount(event.target.value)}
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
        </>
    );
};

export default AdminPage;
