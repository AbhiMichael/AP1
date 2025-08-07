import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherThunk } from "../Redux/Slice/weatherSlice";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  useTheme
} from "@mui/material";
import CustomDialogue from "../component/CustomDialogue";
import Sidebar from "../component/Sidebar";

export default function Weather() {
  const [place, setPlace] = useState("");
  const [open, setOpen] = useState(false);
  const { weather, loading, error } = useSelector((state) => state.weather);
  const dispatch = useDispatch();
  const theme = useTheme();

  const searchHandle = async () => {
    dispatch(weatherThunk(place))
      .unwrap()
      .then(() => setOpen(true));
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw", bgcolor: "#f4f6f8" }}>
      {/* Sidebar */}
      <Sidebar isSmallScreen={false} />

      {/* Main content */}
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 5,
            borderRadius: 4,
            width: "100%",
            maxWidth: 500,
            textAlign: "center",
            backgroundColor: "#ffffff",
            boxShadow: theme.shadows[5],
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={3} color="primary">
            Weather Finder
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              justifyContent: "center",
              mb: 3,
            }}
          >
            <TextField
              label="Enter a city"
              variant="outlined"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              fullWidth
              error={!!error.flag}
              helperText={error.flag ? error.message : ""}
            />
            <Button
              variant="contained"
              onClick={searchHandle}
              disabled={loading}
              sx={{ whiteSpace: "nowrap", px: 3 }}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </Box>

          {/* Dialog for Weather Data */}
          <CustomDialogue setOpen={setOpen} open={open} Data={Object.entries(weather)} />
        </Paper>
      </Container>
    </Box>
  );
}
