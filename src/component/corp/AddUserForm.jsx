import React, {useState} from "react";
import {
    Button,
    TextField,
    Grid,
    Paper,
    Box,
} from "@mui/material";
import {addCorpUserApi} from "../../hook/UserDataApi";

export const AddUserForm = ({ onSave, onCancel, corporation_name }) => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState('');

// AddUserForm

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await addCorpUserApi(corporation_name, name, surname, phone, email);
            if (response.ok) {
                const data = await response.json();
                onSave({
                    message: "User successfully added!",
                    severity: "success",
                });
            } else {
                console.error("Error adding user:", response.statusText);
            }
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };


    return (
        <Paper elevation={3} sx={{ padding: 2, background: "#f0f4f8", borderRadius: 2, marginTop: 2 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="İsim"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Soyisim"
                            variant="outlined"
                            fullWidth
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Telefon"
                            variant="outlined"
                            fullWidth
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button
                                type="button"
                                onClick={onCancel}
                                variant="outlined"
                                color="secondary"
                                sx={{ marginRight: 1 }}
                            >
                                İptal
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Kaydet
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};
