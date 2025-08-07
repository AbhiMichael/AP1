import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";

export default function CustomDialogue({ open, setOpen, Data }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Added Details</DialogTitle>
      <List>
        {Data.map(([key, value], index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ListItemAvatar
              sx={{
                fontWeight: "bolder",
              }}
            >
              {key} :
            </ListItemAvatar>
            <ListItemText>{value}</ListItemText>
          </ListItem>
        ))}{" "}
      </List>
    </Dialog>
  );
}