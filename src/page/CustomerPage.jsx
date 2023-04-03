import React, {useState, useEffect} from "react";
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
    Snackbar, FormControlLabel, Switch
} from "@mui/material";
import InlineSVG from "react-inlinesvg";
import {
    DriveEta,
    Edit,
    Close,
    Save,
    GetApp,
    WhatsApp,
    Telegram,
    PhoneAndroid,
    EmailTwoTone,
    MessageTwoTone,
    PhoneCallbackOutlined
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import ResetPasswordComponent from '../component/ResetPasswordComponent';
import {
    getUserDataApi,
    updateUserEmailApi,
    updateUserMessageApi, updateUserPasswordApi,
    updateUserPhoneApi, updateUserPhonePermissionApi,
    updateUserPlateApi, updateUserTelegramLinkApi, updateUserTelegramPermissionApi, updateUserWhatsappPermissionApi
} from "../hook/UserDataApi";
import { useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {ProfileImageComponent} from "../component/ProfileImageComponent";
import ContactPermissions from "../component/ContentPermissions";
import TelegramUsername from "../component/social-media/TelegramUsername";


const CustomerPage = () => {
    const [data, setData] = useState({});
    const location = useLocation();
    const userId = location.state?.userId;
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [qrImageUrl, setQrImageUrl] = useState(null);

    const [editingField, setEditingField] = useState(null);
    const [editableData, setEditableData] = useState({ ...data });

    const [whatsappPermission, setWhatsappPermission] = useState(null);
    const [telegramPermission, setTelegramPermission] = useState(null);
    const [phonePermission, setPhonePermission] = useState(null);
    const [telegramUsername, setTelegramUsername] = useState(null);

    const [editingTelegramUsername, setEditingTelegramUsername] = useState(false);


    useEffect(() => {
        if (!userId) return;
        const fetchData = async () => {
            const response = await getUserDataApi(userId);
            const result = await response.json();
            setQrImageUrl(result.qr);
            setData(result);
            setWhatsappPermission(result.whatsapp_permission);
            setTelegramPermission(result.telegram_permission);
            setPhonePermission(result.phone_permission);
            setTelegramUsername(result.telegram);
        };
        fetchData();
    }, [userId]);

    const handleTelegramUsernameChange = async (event) => {
        setTelegramUsername(event.target.value);
    };

    const handleEditTelegramUsername = () => {
        setEditingTelegramUsername(true);
    };

    const handleSaveTelegramUsername = async () => {
        const response = await updateUserTelegramLinkApi(userId, telegramUsername);
        if (response.ok) {
            setSuccessMessage('Telegram kullanıcı adı başarıyla güncellendi!');
            setSnackbarOpen(true);
        } else {
            // Handle any errors that may occur.
        }
        setEditingTelegramUsername(false);
    };

    const handleCancelTelegramUsername = () => {
        setEditingTelegramUsername(false);
    };
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
            if (field === "plate") {
                editableData.plate = editableData.plate.toUpperCase();
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
            if (field === "password") {
                if (editableData.password !== editableData.confirmPassword) {
                    setSuccessMessage('Şifreler eşleşmiyor! Lütfen şifreleri kontrol edin.');
                    setSnackbarOpen(true);
                    return;
                }

                const response = await updateUserPasswordApi(userId, editableData.password);
                if (response.ok) {
                    setSuccessMessage('Şifre başarıyla güncellendi!');
                    setSnackbarOpen(true);
                }
            }

            setEditingField(null);
        } else {
            setEditableData({ ...data });
            setEditingField(field);
        }
    };

    const handleTogglePermission = async (field) => {

        if (field === "whatsapp_permission") {
            setWhatsappPermission(!whatsappPermission);
            const response = await updateUserWhatsappPermissionApi(userId,!whatsappPermission)
            setSuccessMessage('Whatsapp İzni Güncellendi');
            setSnackbarOpen(true);
            if (!response.ok){

                console.error("Error updating Whatsapp permission");
            }
        } else if (field === "telegram_permission") {
            setTelegramPermission(!telegramPermission);
            const response = await updateUserTelegramPermissionApi(userId, !telegramPermission);
            setSuccessMessage('Telegram İzni Güncellendi');
            setSnackbarOpen(true);
            if (!response.ok) {
                // Handle any errors that may occur
                console.error("Error updating Telegram permission");
            }
        } else if (field === "phone_permission"){
            setPhonePermission(!phonePermission);
            const response = await updateUserPhonePermissionApi(userId, !phonePermission);
            setSuccessMessage('Arama İzni Güncellendi');
            setSnackbarOpen(true);
            if (!response.ok) {
                // Handle any errors that may occur
                console.error("Error updating Telegram permission");
            }
        }
    };

    const downloadQRCode = async () => {
        if (!qrImageUrl) return;

        try {
            const response = await fetch(qrImageUrl);
            const blob = await response.blob();

            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = "qr-code.svg";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } catch (error) {
            console.error("Error downloading QR code image:", error);
        }
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
                        <Save color="success" />
                    </IconButton>
                ) : (
                    <IconButton edge="end" onClick={() => handleEditToggle(fieldKey)}>
                        <Edit color="error" />
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
                        <ProfileImageComponent url={data.photo} mail={data.mail} userId={userId} />
                        {qrImageUrl && (
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <InlineSVG src={qrImageUrl} style={{ width: '100px', height: '100px' }} onError={(error) => console.error(error)} />
                                <Button onClick={downloadQRCode} sx={{ marginLeft: 1 }}>
                                    <GetApp />
                                </Button>
                            </Box>
                        )}
                    </Box>
                    <Typography variant="h5" component="h2" align="center">
                        Bilgilerim
                    </Typography>
                    <Divider sx={{ marginY: 2 }} />
                    <List>
                        {renderField("mail", "E-posta Adresi", EmailTwoTone)}
                        {renderField("message", "Park Mesajı", MessageTwoTone)}
                        {renderField("phone", "Telefon Numarası", PhoneAndroid)}
                        {renderField("plate", "Araç Plakası", DriveEta)}
                        <ResetPasswordComponent
                            isEditing={editingField === 'password'}
                            editableData={editableData}
                            handleChange={handleChange}
                            handleEditToggle={handleEditToggle}
                            setEditingField={setEditingField}
                        />
                    </List>
                    <Typography variant="h6" component="h3" align="left">
                        İletişim İzinleri
                    </Typography>
                    <ContactPermissions
                        phonePermission={phonePermission}
                        whatsappPermission={whatsappPermission}
                        telegramPermission={telegramPermission}
                        handleTogglePermission={handleTogglePermission}
                    />
                    <TelegramUsername
                        telegramPermission={telegramPermission}
                        telegramUsername={telegramUsername}
                        handleSaveTelegramUsername={handleSaveTelegramUsername}
                    />

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
