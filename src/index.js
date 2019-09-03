const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const serverConf = require('http');
const ioConf = require('socket.io');

const app = express();
const server = serverConf.Server(app);
const io = ioConf(server);

mongoose.connect('mongodb+srv://scobin:scobin2012@cluster0-5npqz.gcp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use(require('./routes'));

server.listen(3333);
