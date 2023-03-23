import { Typography, Box, IconButton } from "@mui/material";
import React from "react";

const CancelUrl = () => {
  return (
    <Box>
      <Box>
        <Typography variant="h4">Payment Denied !!!</Typography>
      </Box>
      <IconButton size="small">Try Again</IconButton>
    </Box>
  );
};

export default CancelUrl;
