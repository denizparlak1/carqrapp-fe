import React from "react";
import { IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";

const AddEmployeeComponent = ({ onClick }) => {
    return (
        <IconButton aria-label="add-worker" onClick={onClick}>
            <Add />
        </IconButton>
    );
};

export default AddEmployeeComponent;
