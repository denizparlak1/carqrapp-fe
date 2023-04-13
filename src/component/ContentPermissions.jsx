import React from "react";
import {
    Typography,
    ListItem,
    ListItemIcon,
    FormControlLabel,
    Switch,
} from "@mui/material";
import {PhoneCallbackOutlined, WhatsApp, Telegram,ContactEmergency} from "@mui/icons-material";

const ContactPermissions = (props) => {
    const { phonePermission, whatsappPermission, telegramPermission,namePermission, handleTogglePermission } = props;
    return (
        <>
            <Typography variant="h6" component="h3" align="left">
                İletişim İzinleri
            </Typography>
            <ListItem>
                <ListItemIcon>
                    <PhoneCallbackOutlined />
                </ListItemIcon>
                <FormControlLabel
                    control={
                        <Switch
                            checked={phonePermission}
                            onChange={() => handleTogglePermission("phone_permission")}
                        />
                    }
                    label="Telefon ile arama izni"
                />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <WhatsApp />
                </ListItemIcon>
                <FormControlLabel
                    control={
                        <Switch
                            checked={whatsappPermission}
                            onChange={() => handleTogglePermission("whatsapp_permission")}
                        />
                    }
                    label="Whatsapp İzni"
                />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <ContactEmergency />
                </ListItemIcon>
                <FormControlLabel
                    control={
                        <Switch
                            checked={namePermission}
                            onChange={() => handleTogglePermission("name_permission")}
                        />
                    }
                    label="İsim Görünürlüğü"
                />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <Telegram />
                </ListItemIcon>
                <FormControlLabel
                    control={
                        <Switch
                            checked={telegramPermission}
                            onChange={() => handleTogglePermission("telegram_permission")}
                        />
                    }
                    label="Telegram İzni"
                />
            </ListItem>
        </>
    );
};

export default ContactPermissions;
