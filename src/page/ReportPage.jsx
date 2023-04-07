import React, { useState, useEffect } from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell, Button, AppBar, Toolbar, Typography} from '@mui/material';
import {downloadReportApi, getAdminReportApi} from "../hook/UserDataApi";
import {Link} from "react-router-dom";


const ReportPage = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAdminReportApi();
                const data = await response.json();
                console.log(data.files);
                setFiles(data.files);
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            }
        };
        fetchData();
    }, []);

    const downloadFile = async (fileName) => {
        try {
            // Call the downloadReportApi to get the file bytes
            const response = await downloadReportApi(fileName);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error(`Error downloading file: ${error}`);
        }
    };


    return (
        <>
        <AppBar position="static">
            <Toolbar>

                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Uslu Ajans
                    Yönetici Paneli
                </Typography>
                <Button component={Link} to='/admin/' color="inherit">
                    Proje Oluştur
                </Button>


            </Toolbar>
        </AppBar>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Proje İsmi</TableCell>
                    <TableCell>Oluşturma Tarihi</TableCell>
                    <TableCell>Rapor</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {files.map((file) => (
                    <TableRow key={file}>
                        <TableCell>{file}</TableCell>
                        <TableCell>{new Date().toLocaleString()}</TableCell>
                        <TableCell>
                            <Button onClick={() => downloadFile(file)}>İndir</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </>
    );

};

export default ReportPage;
