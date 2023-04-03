import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Container, Button, TextField } from '@mui/material';
import {resetPasswordWithEmail} from "../auth/auth";


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

const PasswordResetPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();

        try {
            await resetPasswordWithEmail(email);
            setSuccess(true);
            setError(null);
        } catch (err) {
            setError(err.message);
            setSuccess(false);
        }
    };

    return (
        <StyledContainer component="main" maxWidth="xs">
            <h2>Kayıtlı Mail Adresinizi Yazın</h2>
            <div>
                {success && (
                    <p>
                        Email adresine şifre sıfırlama linkini gönderdik. Lütfen email adresinizi kontrol edin ve şifre sıfırlama adımlarını uygulayın
                    </p>
                )}
                {!success && (
                    <StyledForm onSubmit={handleReset}>
                        {error && <p>{error}</p>}
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
                        <StyledButton type="submit" fullWidth variant="contained" color="primary">
                            Şifre Sıfırla
                        </StyledButton>
                    </StyledForm>
                )}
            </div>
        </StyledContainer>
    );
};

export default PasswordResetPage;
