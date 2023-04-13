import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link, useNavigate} from "react-router-dom";
import {signOut} from "../../auth/auth";




const CorpNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Yönetici Paneli
                    </Typography>
                    <Button component={Link} to='/corp-qrcodes' color="inherit">QR Kodlarım</Button>
                    <Button color="inherit" onClick={handleLogout}>Çıkış</Button>
                </Toolbar>
            </AppBar>
    );
};

export default CorpNavbar;
