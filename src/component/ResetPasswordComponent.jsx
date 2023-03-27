import React from 'react';
import { IconButton, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material';
import {Save, Edit, Close, VpnKey} from '@mui/icons-material';

import FormHelperText from '@mui/material/FormHelperText';

const ResetPasswordComponent = ({
                                    isEditing,
                                    editableData,
                                    handleChange,
                                    handleEditToggle,
                                    setEditingField,
                                }) => {
    const isPasswordInvalid = () =>
        (!editableData.password || !editableData.confirmPassword ||
            editableData.password.length < 7 ||
            editableData.password !== editableData.confirmPassword);

    return (
        <ListItem>
            <ListItemIcon>
                <VpnKey />
            </ListItemIcon>
            {isEditing ? (
                <>
                    <TextField
                        label="Şifre"
                        type="password"
                        value={editableData.password || ""}
                        onChange={(e) => handleChange(e, "password")}
                        fullWidth
                        error={isPasswordInvalid()}
                    />
                    <TextField
                        label="Şifreyi Onayla"
                        type="password"
                        value={editableData.confirmPassword || ""}
                        onChange={(e) => handleChange(e, "confirmPassword")}
                        fullWidth
                        error={isPasswordInvalid()}
                    />
                    {isPasswordInvalid() && (
                        <FormHelperText error>
                            Şifre en az 7 karakter olmalı ve şifreler eşleşmeli.
                        </FormHelperText>
                    )}
                </>
            ) : (
                <ListItemText primary="Şifre" secondary="********" />
            )}
            {isEditing ? (
                <IconButton
                    edge="end"
                    onClick={() => handleEditToggle("password")}
                    disabled={isPasswordInvalid()}
                >
                    <Save color="success" />
                </IconButton>
            ) : (
                <IconButton
                    edge="end"
                    onClick={() => handleEditToggle("password")}
                >
                    <Edit color="error" />
                </IconButton>
            )}
            {isEditing ? (
                <IconButton
                    edge="end"
                    onClick={() => setEditingField(null)}
                >
                    <Close />
                </IconButton>
            ) : null}
        </ListItem>
    );
};


export default ResetPasswordComponent;
