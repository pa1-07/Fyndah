// src/pages/About.js
import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';

const About = () => {
  return (
    <Container sx={{ my: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        About Fyndah
      </Typography>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h6">Our Mission</Typography>
        <Typography variant="body1">
          Our mission is to provide the best services and solutions for businesses, empowering them to grow and thrive in a competitive market.
        </Typography>
      </Box>

      <Box sx={{ mb: 5 }}>
        <Typography variant="h6">Our Vision</Typography>
        <Typography variant="body1">
          We envision a world where businesses of all sizes can leverage innovative tools to achieve success with ease.
        </Typography>
      </Box>

      <Typography variant="h5" align="center" gutterBottom>
        Meet Our Team
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Box sx={{ textAlign: 'center' }}>
            <img
              src="https://source.unsplash.com/random/150x150"
              alt="Team Member"
              style={{ borderRadius: '50%', width: '150px', height: '150px' }}
            />
            <Typography variant="h6">John Doe</Typography>
            <Typography variant="body2">CEO</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ textAlign: 'center' }}>
            <img
              src="https://source.unsplash.com/random/150x150"
              alt="Team Member"
              style={{ borderRadius: '50%', width: '150px', height: '150px' }}
            />
            <Typography variant="h6">Jane Smith</Typography>
            <Typography variant="body2">CTO</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box sx={{ textAlign: 'center' }}>
            <img
              src="https://source.unsplash.com/random/150x150"
              alt="Team Member"
              style={{ borderRadius: '50%', width: '150px', height: '150px' }}
            />
            <Typography variant="h6">Alex Johnson</Typography>
            <Typography variant="body2">COO</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
