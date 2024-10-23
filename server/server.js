const express = require('express');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDb = require('./config/db');
const dotenv = require('dotenv')
dotenv.config()

const app = express();
const PORT = process.env.PORT || 8080;

connectDb()

app.use(cors());
app.use(express.json());

// Use blog routes
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });