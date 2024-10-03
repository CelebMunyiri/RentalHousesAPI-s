const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./Config/config');
const { houseRoute } = require('./Routes/houseRoutes');
const { router } = require('./Routes/authRoutes');
const { notificationRoute } = require('./Routes/notificationRoute');
const { chatModule } = require('./Controllers/chat');
const chatRoute = require('./Routes/chatRoute');
const http = require('http');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true                
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public', { 'Content-Type': 'application/javascript' }));
app.use(helmet());

// MongoDB connection
mongoose.connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log("Connected to database!");
});

mongoose.connection.on('error', (err) => {
    console.error("Database connection error:", err);
});

// Routes
app.use('/house', houseRoute);
app.use('/user', router);
app.use('/notification', notificationRoute);
app.use('/chat', chatRoute);

// Server setup
const server = http.createServer(app);

// const io = new server.Server(server, {
//     pingTimeout: 60000,
//     cors: {
//       origin: 'http://localhost:3000',
//     },
//   });

// Attach socket.io to the server
chatModule.io.attach(server);

const PORT = config.port || 3005;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };
