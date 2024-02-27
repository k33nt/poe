const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
const config = require('./config/config.json')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const fileRoutes = require('./routes/file');

const User = require('./models/user');
const File = require('./models/file');

app.use(express.json());

// Serve static HTML files from the 'public' folder
app.use(express.static('public'));

// Routes for serving HTML files
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/register.html');
});

app.use('/auth', authRoutes);
app.use('/files', fileRoutes);
app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync(); // Sync models with the database
  })
  .then(() => {
    console.log('Models have been synchronized.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
