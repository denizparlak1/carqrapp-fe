import React, {useEffect, useState} from "react";
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Grid,
    useTheme, IconButton,
} from "@mui/material";
import CorpNavbar from "../component/corp/CorpNavbar";
import {UserDetails} from "../component/corp/UserDetails";
import AddEmployeeComponent from "../component/corp/AddEmployeeComponent";
import {AddUserForm} from "../component/corp/AddUserForm";
import AlertSnackbar from "../alert/Alert";
import {useLocation} from "react-router-dom";
import {deleteCorporateUserApi, getCorporateUserApi} from "../hook/UserDataApi";
import DeleteIcon from "@mui/icons-material/Delete";
import {Delete, DeleteSweep} from "@mui/icons-material";

const StyledTableRow = (props) => {
    const theme = useTheme();
    return (
        <TableRow
            {...props}
            sx={{
                "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    color: theme.palette.getContrastText(theme.palette.primary.main),
                },
                "&:nth-of-type(odd)": {
                    backgroundColor: theme.palette.action.focus,
                },
            }}
        />
    );
};


const CorporationAdminPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [qrCodeURL, setQrCodeURL] = useState(null);
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [users, setUsers] = useState([]);
    const location = useLocation();
    const corporation_name = location.state?.corporation_name;

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleUserSave = () => {
        setShowAddUserForm(false);
        setSnackbar({
            open: true,
            message: "Çalışan Eklendi!",
            severity: "success",
        });
    };
    const handleDeleteUser = async (userId) => {
        try {
            await deleteCorporateUserApi(corporation_name,userId)
            setUsers(users.filter((user) => user.id !== userId));
            setSnackbar({
                open: true,
                message: "User deleted successfully!",
                severity: "success",
            });
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };


    const handleAddWorker = () => {
        setShowAddUserForm(!showAddUserForm);
    };
    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbar({ ...snackbar, open: false });
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getCorporateUserApi(corporation_name);
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching corporate users:", error);
            }
        };

        fetchUsers();
    }, [corporation_name]);


    return (
        <>
            <CorpNavbar />
            <Container>
                <Box sx={{ flexGrow: 1, marginTop: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ height: '300px', overflowY: 'auto' }}>
                                <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: "bold", color: "primary.main", fontSize: "1.2rem" }}>Çalışanlar</TableCell>
                                                <TableCell align="right">
                                                    <AddEmployeeComponent onClick={handleAddWorker} />
                                                </TableCell>
                                            </TableRow>

                                        </TableHead>
                                        <TableBody>
                                            {users.map((user) => (
                                                <StyledTableRow
                                                    key={user.id}
                                                    hover
                                                    onClick={() => setSelectedUser(user)}
                                                    sx={{ cursor: "pointer" }}
                                                >
                                                    <TableCell sx={{ fontSize: "1.1rem", padding: "1rem" }}>{user.username}</TableCell>
                                                    <TableCell align="right"> {/* Add this TableCell */}
                                                        <IconButton
                                                            edge="end"
                                                            color="inherit"
                                                            onClick={(e) => {
                                                                e.stopPropagation(); // Prevents selecting the user when clicking the delete button
                                                                handleDeleteUser(user.id);
                                                            }}
                                                        >
                                                            <DeleteIcon sx={{ color: "#8B0000" }} />
                                                        </IconButton>
                                                    </TableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid>
                        {selectedUser ? (
                            <>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        padding: 2 ,
                                        background: "#f0f4f8",
                                        borderRadius: 2,
                                        maxWidth: "55%",
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        marginTop:  2
                                    }}
                                >
                                    <UserDetails user={selectedUser} />
                                </Paper>
                            </>
                        ) : (
                            <Typography variant="subtitle1">Kullanıcının Bilgilerini Görmek için üzerine tıklayın</Typography>
                        )}

                        {showAddUserForm && (
                            <Grid item xs={12} md={8}>
                                <AddUserForm
                                    onSave={handleUserSave}
                                    onCancel={() => setShowAddUserForm(false)}
                                    corporation_name={corporation_name}
                                />
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Container>
            <AlertSnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                handleClose={handleSnackbarClose}
                autoHideDuration={5000}
            />
        </>
    );
};

export default CorporationAdminPage;
