import React, {useState} from 'react';
import {AppBar, Toolbar, Typography, Button, TextField, Container, CircularProgress} from '@mui/material';
import { styled } from '@mui/system';
import {signOut} from "../auth/auth";
import {useNavigate} from "react-router-dom";
import {generatePdfApi} from "../hook/GeneratePdfApi";
import Box from "@mui/material/Box";
import AlertSnackbar from "../alert/Alert";

import Logo from '../assets/uslu-logo.png'

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
    const [qrCodeCount, setQrCodeCount] = useState(0);
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

    const handleOpenPdf = () => {
        window.open(pdfUrl, '_blank');
    };

    const handleDownloadPdf = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'qrcodes.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleGeneratePdf = async () => {
        setIsLoading(true);
        try {
            setPdfUrl('');
            const pdfUrl = await generatePdfApi(customerName, qrCodeCount, 'user');
            setPdfUrl(pdfUrl.pdf_url);

            setAlertSeverity('success');
            setAlertMessage('PDF Başarıyla Oluşturuldu.');
            setAlertOpen(true);
            setIsLoading(false);
        } catch (error) {
            console.error('PDF generation error:', error.message);
            setAlertSeverity('error');
            setAlertMessage('PDF oluşturulamadı, tekrar deneyin!');
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
                    <Button color="inherit">Raporlar</Button>
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
                    onChange={(event) => setQrCodeCount(event.target.value)}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleGeneratePdf} sx={{backgroundColor: 'green' }}>
                        Oluştur
                    </Button>
                    {isLoading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 2 }}>
                            <CircularProgress />
                        </Box>
                    )}
                    {pdfUrl && (
                        <>
                            <Button variant="contained" color="primary" sx={{ marginLeft: 2 }} onClick={handleOpenPdf}>
                                Görüntüle
                            </Button>
                            <Button variant="contained" color="primary" sx={{ marginLeft: 2 }} onClick={handleDownloadPdf} download={`${customerName}.pdf`}>
                                İndir
                            </Button>
                        </>
                    )}
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
