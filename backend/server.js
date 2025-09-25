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
  'https://68d2206223fa0d098efee478--dbt-mitra.netlify.app',
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

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log('MongoDB Connection Error: ', err));

app.get('/', (req, res) => res.send('Backend server is running!'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));
app.use('/api/form', require('./routes/form'));
app.use('/api/community', require('./routes/community'));

const server = app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});