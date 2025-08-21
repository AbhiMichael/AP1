import { Icon } from "@iconify/react";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

export default function CartCard({ product }) {
    return (
        <Box
            sx={{
                bgcolor: "beige",
                borderRadius: 3,
                p: 2,
                display: "flex",
                gap: 4,
                justifyContent: "space-between",
                px: 2,
                alignItems: "center",
            }}
        >
            <Box>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                    }}
                >
                    {product.name}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                    }}
                >
                    <Icon
                        icon="streamline-ultimate-color:rating-star"
                        width="24"
                        height="24"
                    />
                    <Typography>{product.rating}</Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button>
                    <Icon icon="ep:arrow-left-bold" width="24" height="24" />
                </Button>
                <Typography>{product.count}</Typography>
                <Button>
                    <Icon icon="ep:arrow-right-bold" width="24" height="24" />
                </Button>
            </Box>
        </Box>
    );
}