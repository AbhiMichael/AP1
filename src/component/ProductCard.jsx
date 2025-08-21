import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/Slice/CartSlice";
import { Icon } from "@iconify/react";

export default function ProductCard({ product, setOpen, setSelect }) {
    const disable = product.available ? false : true;
    const dispatch = useDispatch();
    function CartHandle() {
        dispatch(
            addToCart({
                id: product.id,
                name: product.name,
                rating: product.rating,
                count: 1,
            }),
        );
    }
    function BuyHandle() {
        setOpen(true);
        setSelect(product);
    }
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 1,
                mt: 3,
                bgcolor: "beige",
                p: 2,
                borderRadius: 5,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bolder",
                    }}
                >
                    {product.name}
                </Typography>
                {product.available ? (
                    <Typography variant="body1">
                        Availability : {product.available}
                    </Typography>
                ) : (
                    <Typography color="error">Out Of Stock</Typography>
                )}{" "}
                <Box
                    sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Icon
                        icon="streamline-ultimate-color:rating-star"
                        width="24"
                        height="24"
                    />
                    <Typography> {product.rating}</Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                }}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    disabled={disable}
                    onClick={CartHandle}
                >
                    Add to Cart
                </Button>
                <Button variant="contained" disabled={disable} onClick={BuyHandle}>
                    Buy Now
                </Button>
            </Box>
        </Box>
    );
}