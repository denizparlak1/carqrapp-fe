import React, { useEffect, useState } from "react";
import { styled, keyframes } from "@mui/system";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ParkMessageWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "0.3s",
    "&:hover": {
        boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)",
        transform: "translateY(-5px)",
    },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    fontSize: "1.2rem",
    fontWeight: 500,
    color: theme.palette.primary.dark,
}));

export const UserMessageComponent = ({ message }) => {
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimationComplete(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <CardContent>
            <ParkMessageWrapper
                sx={{ maxWidth: 290 }}
                style={{
                    animation: !animationComplete ? `${fadeIn} 1s forwards` : "",
                }}
            >
                <StyledTypography variant="body1" component="span">
                    {message || "Henüz bir mesaj eklenmemiş."}
                </StyledTypography>
            </ParkMessageWrapper>
        </CardContent>
    );
};
