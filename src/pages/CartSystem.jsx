import { Box, Container, Typography, useTheme, useMediaQuery, Paper, Button, Badge } from "@mui/material";
import React from "react";
import CartCard from "../component/CartCard";
import { useSelector } from "react-redux";
import Sidebar from '../component/Sidebar';
import { Icon } from '@iconify/react';

export default function CartSystem() {
    const cart = useSelector((state) => state.cart);
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    
    // Calculate total items and total price
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <Box sx={{ display: 'flex', height: '100vh', width: '95vw', overflow: 'hidden' }}>
            <Sidebar isSmallScreen={isMediumScreen}/>
            
            <Container maxWidth="lg" sx={{ 
                py: 4,
                ml: isMediumScreen ? 0 : '240px',
                transition: 'margin 0.3s ease'
            }}>
                <Paper elevation={2} sx={{
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 4,
                        flexWrap: 'wrap',
                        gap: 2
                    }}>
                        <Typography variant="h4" sx={{
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <Icon icon="mdi:cart" width={32} />
                            Your Shopping Cart
                        </Typography>
                        
                        
                        
                    </Box>

                    {cart.length > 0 ? (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3
                        }}>
                            {cart.map((e, index) => (
                                <CartCard key={index} product={e} />
                            ))}
                            
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                mt: 3,
                                pt: 3,
                                borderTop: `1px solid ${theme.palette.divider}`
                            }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        borderRadius: 2
                                    }}
                                >
                                    Proceed to Checkout (₹)
                                </Button>
                            </Box>
                        </Box>
                    ) : (
                        <Box sx={{
                            textAlign: 'center',
                            py: 8,
                            border: `2px dashed ${theme.palette.grey[300]}`,
                            borderRadius: 2,
                            backgroundColor: theme.palette.grey[50]
                        }}>
                            <Icon icon="mdi:cart-remove" width={64} color={theme.palette.grey[400]} />
                            <Typography variant="h5" sx={{ 
                                mt: 2,
                                color: theme.palette.text.secondary,
                                fontWeight: 500
                            }}>
                                Your cart is empty
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                color: theme.palette.text.disabled,
                                mt: 1
                            }}>
                                Start shopping to add items to your cart
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </Container>
        </Box>
    );
}