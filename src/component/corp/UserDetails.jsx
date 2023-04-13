import {Grid, Typography} from "@mui/material";
import {AccountCircle, DriveEta, Email, Phone} from "@mui/icons-material";
import Button from "@mui/material/Button";
import QrCodeIcon from "@mui/icons-material/QrCode";
import React from "react";

export const UserDetails = ({ user }) => (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
                <AccountCircle sx={{ mr: 1, color: "primary.main" }} />
                Çalışan Detayları
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1">
                <strong>İsim:</strong> {user.name}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1">
                <strong>Soyisim:</strong> {user.surname}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1">
                <Phone sx={{ mr: 1, verticalAlign: "middle", color: "secondary.main" }} />
                {user.phone}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1">
                <DriveEta sx={{ mr: 1, verticalAlign: "middle", color: "success.main" }} />
                {user.carPlate}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1">
                <Email sx={{ mr: 1, verticalAlign: "middle", color: "success.main" }} />
                {user.mail}
            </Typography>
        </Grid>

        <Grid item xs={6}>
            <Button variant="contained" color="primary" startIcon={<QrCodeIcon />} >
                Qr Kod Ata
            </Button>
        </Grid>
    </Grid>
);


