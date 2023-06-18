const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// Database connection
//const mongoDBURI = process.env.MONGODB_URI;
mongoose.connect('mongodb://127.0.0.1:27017/contactlist_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret-key', resave: true, saveUninitialized: true }));

// Routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const contactsRouter = require('./routes/contacts');
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/contacts', contactsRouter);

// Start the server
//const port = process.env.PORT;
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
