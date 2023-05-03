import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
} from '@mui/material';
import {
    getUserDataApi,
    updateUserEmailApi,
    updateUserLoginPermissionApi,
    updateUserPasswordApi
} from "../hook/UserDataApi";
import {useLocation, useNavigate} from "react-router-dom";

const FirstLoginPage = () => {
    const location = useLocation();
    const { userId } = location.state || {};
    const [userData, setUserData] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserLoginPermissionApi(userId);
            await updateUserPasswordApi(userId,password);
            await updateUserEmailApi(userId,email)
            localStorage.setItem('visited', true);
            navigate('/login')

        } catch (error) {
            console.error("Error occurred while updating user permission:", error);
            // handle the error, e.g., show an error message to the user
        }
    };

    useEffect(() => {
        if (!userId) {
            navigate('/login');
            return;
        }

        const fetchUserData = async () => {
            const response = await getUserDataApi(userId);
            const data = await response.json();
            setUserData(data);
        };
        fetchUserData();
    }, [userId, navigate]);

    useEffect(() => {
        if (userData.first_login) {
            navigate('/register', { state: { userId } });
        }
    }, [userData, navigate]);
    return (
        <Container maxWidth="xs">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt={8}
            >
                <Typography component="h1" variant="h5">
                    Kayıt Ol
                </Typography>
                <Box component="form" onSubmit={handleSubmit} mt={3}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Adresinizi Yazın"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Şifre Belirleyin"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        mt={2}
                    >
                        Hesabı Oluştur
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default FirstLoginPage;
