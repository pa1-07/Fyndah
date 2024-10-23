// src/pages/Home.js
import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';

const Home = () => {
  return (
    <>
    <div>
      {/* Banner Section */}
      <Box
        sx={{
          height: '10vh',
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h2" align="center">
          Welcome to Fyndah
        </Typography>
      </Box>

      {/* Key Services Section */}
      <Container sx={{ my: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Our Key Services
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6">Service 1</Typography>
              <Typography variant="body1">
                Description of service 1. Highlight the value it offers.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6">Service 2</Typography>
              <Typography variant="body1">
                Description of service 2. Highlight the value it offers.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6">Service 3</Typography>
              <Typography variant="body1">
                Description of service 3. Highlight the value it offers.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box textAlign="center" sx={{ mt: 5 }}>
          <Button variant="contained" color="primary" size="large">
            Learn More About Our Services
          </Button>
        </Box>
      </Container>
    </div>
    </>
  );
};

export default Home;
