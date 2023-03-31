import React, {useState} from 'react';
import { Button, TextField, Container } from '@mui/material';
import { styled } from '@mui/system';
import {signInWithEmailAndPassword} from "../auth/auth";
import { useNavigate } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import logo from '../assets/logo.png';
import Footer from "../component/Footer";

const StyledContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 64,
});


const StyledForm = styled('form')({
    width: '100%',
    marginTop: 8,
});

const StyledButton = styled(Button)({
    marginTop: 16,
});

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { user, customClaims } = await signInWithEmailAndPassword(email, password);
            if (user) {
                if (customClaims.role === "admin") {
                    navigate("/admin");
                }
                if (customClaims.role === "user"){
                    navigate("/customer", { state: { userId: user.uid } });
                }
            }


        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <StyledContainer component="main" maxWidth="xs">
            <Avatar src={logo} sx={{ width: 160, height: 70, marginBottom: 2, borderRadius: 0 }} />
            <h2> Qr Park Kullanıcı Girişi</h2>
            <div>

                <StyledForm onSubmit={handleSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
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
                        label="Şifre"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <StyledButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Giriş Yap
                    </StyledButton>
                </StyledForm>
            </div>
            <Footer />
        </StyledContainer>
    );
};

export default LoginPage;
