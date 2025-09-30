const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  'https://dbt-mitra.netlify.app',
  'https://68d5270420b9f80008d382bf--dbt-mitra.netlify.app',
  'http://localhost:3000', // For local development
];

const corsOptions = {
  origin: (origin, callback) => {
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));


app.use(bodyParser.json());

if (!process.env.MONGO_URI) {
    console.warn('Warning: MONGO_URI is not set. Backend will start, but DB operations will fail.');
}

mongoose.connect(process.env.MONGO_URI, { dbName: process.env.MONGO_DB || undefined })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error('MongoDB Connection Error:', err.message));

app.get('/', (req, res) => res.send('Backend server is running!'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));
app.use('/api/form', require('./routes/form'));
app.use('/api/community', require('./routes/community'));

const server = app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});