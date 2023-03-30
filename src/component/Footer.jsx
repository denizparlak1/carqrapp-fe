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
                href="/kvkk.pdf"
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
