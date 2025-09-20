const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
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
    console.log(`Backend server running on port ${server.address().port}`);
});