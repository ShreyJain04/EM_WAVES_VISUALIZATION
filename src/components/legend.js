// src/components/Legend.js
import React from "react";
import { Box, Typography } from "@mui/material";

const Legend = () => (
  <Box
    style={{ padding: "20px", backgroundColor: "#eee", borderRadius: "5px" }}
  >
    <Typography variant="h6">Intensity Legend</Typography>
    <Box
      style={{
        display: "flex",
        height: "10px",
        background: "linear-gradient(to right, blue, red)",
      }}
    ></Box>
    <Typography variant="body2">
      Low Intensity (Blue) to High Intensity (Red)
    </Typography>
  </Box>
);

export default Legend;
