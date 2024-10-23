// src/pages/Contact.js
import React from 'react';
import { Typography, Container, TextField, Button } from '@mui/material';

const Contact = () => {
  return (
    <Container sx={{mt:2}}>
      <Typography variant="h4" gutterBottom>Contact Us</Typography>
      <form>
        <TextField label="Name" fullWidth margin="normal" />
        <TextField label="Email" fullWidth margin="normal" />
        <TextField label="Message" fullWidth multiline rows={4} margin="normal" />
        <Button variant="contained" color="primary" type="submit">Send</Button>
      </form>
    </Container>
  );
};

export default Contact;
