// src/pages/Services.js
import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box } from '@mui/material';

const Services = () => {
  return (
    <Container sx={{ my: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Our Services
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="https://source.unsplash.com/random"
              alt="Service 1"
            />
            <CardContent>
              <Typography variant="h6">Service 1</Typography>
              <Typography variant="body2" color="text.secondary">
                Detailed description of Service 1.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="https://source.unsplash.com/random"
              alt="Service 2"
            />
            <CardContent>
              <Typography variant="h6">Service 2</Typography>
              <Typography variant="body2" color="text.secondary">
                Detailed description of Service 2.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image="https://source.unsplash.com/random"
              alt="Service 3"
            />
            <CardContent>
              <Typography variant="h6">Service 3</Typography>
              <Typography variant="body2" color="text.secondary">
                Detailed description of Service 3.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Services;
