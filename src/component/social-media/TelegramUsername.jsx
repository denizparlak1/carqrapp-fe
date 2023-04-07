import React from "react";
import { ListItem, ListItemIcon, ListItemText, TextField, IconButton } from "@mui/material";
import { Telegram } from "@mui/icons-material";
import { Edit, Save, Close } from "@mui/icons-material";

const TelegramUsername = ({
                              telegramPermission,
                              telegramUsername,
                              handleSaveTelegramUsername,
                              handleEditTelegramUsername,
                              handleCancelTelegramUsername,
                              editingTelegramUsername,
                              handleTelegramUsernameChange,
                          }) => {
    if (!telegramPermission) {
        return null;
    }

    return (
        <ListItem>
            <ListItemIcon>
                <Telegram />
            </ListItemIcon>
            {editingTelegramUsername ? (
                <TextField
                    label="Telegram Kullanıcı Adı"
                    value={telegramUsername || ""}
                    onChange={handleTelegramUsernameChange}
                    fullWidth
                />
            ) : (
                <ListItemText primary="Telegram Kullanıcı Adı" secondary={telegramUsername || "N/A"} />
            )}
            {editingTelegramUsername ? (
                <IconButton edge="end" onClick={handleSaveTelegramUsername}>
                    <Save color="success" />
                </IconButton>
            ) : (
                <IconButton edge="end" onClick={handleEditTelegramUsername}>
                    <Edit color="error" />
                </IconButton>
            )}
            {editingTelegramUsername ? (
                <IconButton edge="end" onClick={handleCancelTelegramUsername}>
                    <Close />
                </IconButton>
            ) : null}
        </ListItem>
    );
};

export default TelegramUsername;
