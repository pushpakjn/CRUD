
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const routes = require('./routes/TaskRoute');

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

app.use("/api",routes);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));