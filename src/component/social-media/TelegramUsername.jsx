import React, { useState } from "react";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    TextField,
    Avatar,
} from "@mui/material";
import { Edit, Save, Close } from "@mui/icons-material";

const TelegramUsername = (props) => {
    const { telegramPermission, telegramUsername, handleSaveTelegramUsername } = props;
    const [editingTelegramUsername, setEditingTelegramUsername] = useState(false);
    const [newTelegramUsername, setNewTelegramUsername] = useState("");

    const handleEditTelegramUsername = () => {
        setEditingTelegramUsername(true);
        setNewTelegramUsername(telegramUsername);
    };

    const handleSaveNewTelegramUsername = () => {
        handleSaveTelegramUsername(newTelegramUsername);
        setEditingTelegramUsername(false);
    };

    const handleCancelNewTelegramUsername = () => {
        setEditingTelegramUsername(false);
    };


    const handleTelegramUsernameChange = (event) => {
        setNewTelegramUsername(event.target.value);
    };

    return (
        <>
            {telegramPermission && (
                <ListItem>
                    <ListItemIcon>
                        <Avatar />
                    </ListItemIcon>
                    {editingTelegramUsername ? (
                        <TextField
                            label="Telegram Kullanıcı Adı"
                            value={newTelegramUsername || ""}
                            onChange={handleTelegramUsernameChange}
                            fullWidth
                        />
                    ) : (
                        <ListItemText primary="Telegram Kullanıcı Adı" secondary={telegramUsername || "N/A"} />
                    )}
                    {editingTelegramUsername ? (
                        <>
                            <IconButton edge="end" onClick={handleSaveNewTelegramUsername}>
                            <Save />
                            </IconButton>
                            <IconButton edge="end" onClick={handleCancelNewTelegramUsername}>
                            <Close />
                            </IconButton>
                        </>
                    ) : (
                        <IconButton edge="end" onClick={handleEditTelegramUsername}>
                            <Edit color="error" />
                        </IconButton>
                    )}
                </ListItem>
            )}
        </>
    );
};

export default TelegramUsername;
