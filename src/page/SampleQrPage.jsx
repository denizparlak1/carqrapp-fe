import {AppBar, Button, Container, TextField, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {handleLogout} from "../component/LogoutComponent";
import Box from "@mui/material/Box";
import AlertSnackbar from "../alert/Alert";
import {styled} from "@mui/system";
import {createSampleQrApi} from "../hook/UserDataApi";


const StyledContainer = styled(Container)({
    marginTop: 64,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

export const SampleQrPage = () => {
    const [qrCodeCount,setQrCodeCount] = useState('')
    const [projectNzme,setProjectName] = useState('')
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    const handleCreateQrCodes = async () => {
        try {
            const response = await createSampleQrApi(projectNzme, qrCodeCount);
            if (response.ok) {
                setAlertMessage('QR codes created successfully!');
                setAlertSeverity('success');
                setAlertOpen(true);
            } else {
                // add logic to handle error response
                setAlertMessage('Failed to create QR codes');
                setAlertSeverity('error');
                setAlertOpen(true);
            }
        } catch (error) {
            // add logic to handle fetch error
            setAlertMessage('An error occurred while creating QR codes');
            setAlertSeverity('error');
            setAlertOpen(true);
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
                    <Button component={Link} to='/reports' color="inherit">Raporlar</Button>
                    <Button color="inherit" onClick={handleLogout}>Çıkış</Button>
                </Toolbar>
            </AppBar>

            <StyledContainer>
                <TextField
                    margin="normal"
                    label="Proje (Müşteri) İsmi"
                    type="text"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(event) => setProjectName(event.target.value)}
                />
                <TextField
                    margin="normal"
                    label="Oluşturulacak QR Miktarı"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={(event) => setQrCodeCount(event.target.value)}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 2 }}>
                    <Button variant="contained" color="primary"  sx={{backgroundColor: 'green' }} onClick={handleCreateQrCodes}>
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
    )
}
