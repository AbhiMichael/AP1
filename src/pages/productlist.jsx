import {
    Badge,
    Box,
    Container,
    IconButton,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
    Chip,
    Stack,
    Divider,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../component/ProductCard";
import { Icon } from "@iconify/react";
import AlertDialog from "../component/Alert";
import { Link } from "react-router-dom";
import Sidebar from "../component/Sidebar";

export default function ProductSystem() {
    const products = useSelector((state) => state.product);
    const cart = useSelector((state) => state.cart);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const [select, setSelect] = useState(null);
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
                background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20), url("https://www.toptal.com/designers/subtlepatterns/patterns/crossword.png")`,
                backgroundSize: "cover",
            }}
        >
            <Sidebar isSmallScreen={isMediumScreen} />

            <Container
                maxWidth="lg"
                sx={{
                    padding: "2rem",
                    marginLeft: isMediumScreen ? 0 : "240px",
                    transition: "margin 0.3s ease",
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "white",
                        borderRadius: "16px",
                        boxShadow: "0 6px 30px rgba(0,0,0,0.1)",
                        padding: "2rem",
                        marginBottom: "2rem",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    {/* Header Section */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "1.5rem",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: "700",
                                    color: theme.palette.primary.main,
                                    letterSpacing: "0.5px",
                                }}
                            >
                                Products
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: "text.secondary",
                                    marginTop: "0.3rem",
                                }}
                            >
                                Explore our wide range of products curated just for you.
                            </Typography>
                        </Box>

                        <Box sx={{ cursor: "pointer" }}>
                            <Link to="/cart" style={{ textDecoration: "none" }}>
                                <Tooltip title="View Cart">
                                    <IconButton
                                        sx={{
                                            backgroundColor: theme.palette.primary.light,
                                            "&:hover": {
                                                backgroundColor: theme.palette.primary.main,
                                                color: "white",
                                            },
                                            position: "relative",
                                        }}
                                    >
                                        <Icon
                                            icon="mdi:cart"
                                            width="26"
                                            height="26"
                                            color={theme.palette.primary.contrastText}
                                        />
                                        {cart.length > 0 && (
                                            <Badge
                                                badgeContent={cart.length}
                                                overlap="circular"
                                                color="error"
                                                sx={{
                                                    position: "absolute",
                                                    top: -2,
                                                    right: -2,
                                                }}
                                            />
                                        )}
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </Box>
                    </Box>

                    {/* Product Grid */}
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "1fr 1fr",
                                md: "1fr 1fr 1fr",
                            },
                            gap: "2rem",
                        }}
                    >
                        <AlertDialog open={open} setOpen={setOpen} select={select} />
                        {products.map((e, index) => (
                            <ProductCard
                                product={e}
                                key={index}
                                setOpen={setOpen}
                                setSelect={setSelect}
                            />
                        ))}
                    </Box>

                    {/* Footer / Info Section */}
                    <Divider sx={{ marginY: "2rem" }} />
                    <Box textAlign="center">
                        <Typography
                            variant="body2"
                            sx={{
                                color: "text.secondary",
                                fontStyle: "italic",
                            }}
                        >
                            ✨ Discover amazing deals every day. New arrivals coming soon! ✨
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
