import { Box, Container, Grid } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      px={{ xs: 0, sm: 0 }}
      py={{ xs: 0, sm: 2 }}
      bgcolor="#000"
      textAlign="center"
      sx={{ height: "27px" }}
    >
      <Container maxWidth="lg" sx={{ marginY: "0px" }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Box color="white">Help</Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box color="white">FAQ</Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box color="white">Privacy</Box>
          </Grid>
        </Grid>
        <Box textAlign="center" color="white">
          All Copy Right Reserved &reg; {new Date().getFullYear()}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
