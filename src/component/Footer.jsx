import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

const Footer = () => {
    return (
        <Box sx={{
            p: 2,
            bgcolor: 'background.paper',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: 'center'
        }}>
            <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Qr Park. Tüm hakları saklıdır.
            </Typography>
            <Link
                href="https://storage.googleapis.com/daglarapp/kvkk/Kis%CC%A7isel%20Verilerin%20Is%CC%A7lenmesi%20Ve%20Korunmas%C4%B1%20Hakk%C4%B1nda%20Ayd%C4%B1nlatma%20Metni.pdf"
                target="_blank"
                rel="noopener"
                startIcon={<DescriptionIcon />}
                sx={{ display: 'flex', alignItems: 'center', mt: 1, justifyContent: 'center' }}
            >
                KVKK Bildirimi
            </Link>
        </Box>
    );
};

export default Footer;
