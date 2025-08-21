import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { decreaseCount } from "../Redux/Slice/ProductSlice";
import { buyProduct } from "../Redux/Slice/PurchasedSlice";

export default function AlertDialog({ setOpen, open, select }) {
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpen(false);
    };

    const ButtonHandle = () => {
        setOpen(false);
        dispatch(decreaseCount(select.id));
        dispatch(buyProduct(select));
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Are you sure to Buy this !!
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={ButtonHandle} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}