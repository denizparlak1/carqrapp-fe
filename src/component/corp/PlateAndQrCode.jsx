import React, { useState, useEffect } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Grid,
} from "@mui/material";
import { getCorpQrApi } from "../../hook/UserDataApi";
import CorpNavbar from "./CorpNavbar";
import Button from "@mui/material/Button";

const PlateAndQrCode = ({ user }) => {
    const [qrCodeURLs, setQrCodeURLs] = useState(null);
    const [plateNumbers, setPlateNumbers] = useState({});

    useEffect(() => {
        const fetchQrCode = async () => {
            try {
                const response = await getCorpQrApi("daglar");
                const data = await response.json();
                setQrCodeURLs(data.urls);
            } catch (error) {
                console.error("Error fetching QR code URLs:", error);
            }
        };

        fetchQrCode();
    }, [user]);

    const handleChangePlateNumber = (index, value) => {
        setPlateNumbers({ ...plateNumbers, [index]: value });
    };

    const handleSavePlateNumbers = () => {
        console.log("Saving plate numbers:", plateNumbers);
        // Here you can make an API call to save the plate numbers to your database
    };

    const gridItemSize = qrCodeURLs ? 12 / qrCodeURLs.length : 12;

    return (
        <>
            <CorpNavbar/>
            <Paper
                elevation={3}
                sx={{
                    padding: 2,
                    background: "#f0f4f8",
                    borderRadius: 2,
                    marginTop: 2,
                    maxWidth: "100%",
                }}
            >
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                                    QR Kod
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
                                    Plaka Numarası
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {qrCodeURLs &&
                                qrCodeURLs.map((url, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <img
                                                src={url}
                                                alt={`QR Code ${index + 1}`}
                                                style={{ width: "25%", height: "auto" }} // Updated style
                                            />

                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                fullWidth
                                                label="Plaka Numarası"
                                                variant="outlined"
                                                size="small"
                                                value={plateNumbers[index] || ""}
                                                onChange={(event) =>
                                                    handleChangePlateNumber(index, event.target.value)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary" onClick={handleSavePlateNumbers}>
                                                Kaydet
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};


export default PlateAndQrCode;
