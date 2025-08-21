import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function PurchasedCard({ product }) {
    return (
        <Box
            bgcolor={"beige"}
            p={1}
            borderRadius={4}
            sx={{
                border: "1px solid black",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
            }}
        >
            <Box>
                <Typography>{product.name}</Typography>
                <Typography>Rating : {product.rating}</Typography>
                <Link to="#">more...</Link>
            </Box>
            <Box>
                <Typography>Delivery on 01/01/2025</Typography>
            </Box>
        </Box>
    );
}