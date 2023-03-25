import React, { useState, useEffect } from "react";
import {
    Container,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    IconButton,
    TextField,
    Alert,
    Snackbar
} from "@mui/material";
import QRCode from "qrcode.react";
import {Email, Message, Phone, DriveEta, Edit, Close, Save,Share} from "@mui/icons-material";
import Box from "@mui/material/Box";
import {
    getUserDataApi,
    updateUserEmailApi,
    updateUserMessageApi,
    updateUserPhoneApi,
    updateUserPlateApi
} from "../hook/UserDataApi";
import { useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

const CustomerPage = () => {
    const [data, setData] = useState({});
    const location = useLocation();
    const userId = location.state?.userId;
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [qrImageUrl, setQrImageUrl] = useState(null);

    const [editingField, setEditingField] = useState(null);
    const [editableData, setEditableData] = useState({ ...data });


    useEffect(() => {
        if (!userId) return;
        const fetchData = async () => {
            const response = await getUserDataApi(userId);
            const result = await response.json();
            setQrImageUrl(result.qr);
            setData(result);
        };
        fetchData();
    }, [userId]);

    const handleEditToggle = async (field) => {
        if (editingField === field) {
            setData(editableData);

            if (field === "mail") {
                const response = await updateUserEmailApi(userId, editableData.mail);
                if (response.ok) {
                    setSuccessMessage('E-posta adresi başarıyla güncellendi!');
                    setSnackbarOpen(true);
                }
            }
            if (field === "message") {
                const response = await updateUserMessageApi(userId, editableData.message);
                if (response.ok) {
                    setSuccessMessage('Mesaj başarıyla güncellendi!');
                    setSnackbarOpen(true);
                }
            }
            if (field === "plate") editableData.plate = editableData.plate.toUpperCase();{
                const response = await updateUserPlateApi(userId, editableData.plate);
                if (response.ok) {
                    setSuccessMessage('Araç plakası başarıyla güncellendi!');
                    setSnackbarOpen(true);
                }
            }
            if (field === "phone") {
                const response = await updateUserPhoneApi(userId, editableData.phone);
                if (response.ok) {
                    setSuccessMessage('Telefon numarası başarıyla güncellendi!');
                    setSnackbarOpen(true);
                }
            }


            setEditingField(null);
        } else {
            setEditableData({ ...data });
            setEditingField(field);
        }
    };

    const handleShare = () => {
        if (!navigator.share) {
            alert('Web Share API is not supported on your browser');
            return;
        }

        navigator.share({
            title: 'My QR Code',
            text: 'Check out my QR code!',
            url: qrImageUrl
        })
            .then(() => console.log('Shared successfully'))
            .catch((error) => console.log('Error sharing:', error));
    };

    const handleChange = (event, field) => {
        setEditableData({ ...editableData, [field]: event.target.value });
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };
    const renderField = (fieldKey, label, IconComponent) => {
        const isEditing = editingField === fieldKey;
        return (
            <ListItem>
                <ListItemIcon>
                    <IconComponent />
                </ListItemIcon>
                {isEditing ? (
                    <TextField
                        label={label}
                        value={editableData[fieldKey] || ""}
                        onChange={(e) => handleChange(e, fieldKey)}
                        fullWidth
                        onKeyPress={
                            fieldKey === "phone"
                                ? (e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }
                                : null
                        }

                    />
                ) : (
                    <ListItemText primary={label} secondary={data[fieldKey] || "N/A"} />
                )}
                {isEditing ? (
                    <IconButton edge="end" onClick={() => handleEditToggle(fieldKey)}>
                        <Save />
                    </IconButton>
                ) : (
                    <IconButton edge="end" onClick={() => handleEditToggle(fieldKey)}>
                        <Edit />
                    </IconButton>
                )}
                {isEditing ? (
                    <IconButton edge="end" onClick={() => setEditingField(null)}>
                        <Close />
                    </IconButton>
                ) : null}
            </ListItem>
        );
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Avatar
                            src={data.photo}
                            alt={`${data.mail || 'User'}'s profile image`}
                            sx={{ width: 100, height: 100 }}
                        />
                        {qrImageUrl && (
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <QRCode size={50} value={qrImageUrl} />
                                <IconButton onClick={handleShare} sx={{ marginLeft: 1 }}>
                                    <Share />
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                    <Typography variant="h5" component="h2" align="center">
                        Bilgilerim
                    </Typography>
                    <Divider sx={{ marginY: 2 }} />
                    <List>
                        {renderField("mail", "E-posta Adresi", Email)}
                        {renderField("message", "Park Mesajı", Message)}
                        {renderField("phone", "Telefon Numarası", Phone)}
                        {renderField("plate", "Araç Plakası", DriveEta)}
                    </List>
                </Paper>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                        {successMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
};

export default CustomerPage;
