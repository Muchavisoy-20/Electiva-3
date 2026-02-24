require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

connectDB();

const app = express();
app.use(express.json());

app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/snippets', require('./routes/snippetRoutes'));

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
);