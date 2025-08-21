import { Icon } from "@iconify/react";
import { Box, Dialog, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { cloneElement } from "react";

export default function GlobalDialogue({ open, setOpen, Data, children }) {
  const HandleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      onClose={HandleClose}
      open={open}
      sx={{
        px: { xs: 5, md: 10 },
      }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 4,
            minWidth: { xs: "100%", lg: 900 },
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 5,
          bgcolor: "#f4f6f8",
          p: 2,
          borderBottom: "0.2px solid #e5e8eb",
        }}
      >
        <Box>
          {Object.entries(Data.title).map(([key, value], index) => (
            <Stack direction={"row"} gap={1} key={index}>
              <Typography>{`${key} :`}</Typography>
              <Typography>{value}</Typography>
            </Stack>
          ))}
        </Box>
        {Data.close && (
          <IconButton onClick={HandleClose}>
            <Icon icon="carbon:close-filled" width="22" height="22" />
          </IconButton>
        )}
      </Box>
      {cloneElement(children, { Data: Data })}
    </Dialog>
  );
}