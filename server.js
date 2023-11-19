const express = require('express');
const http = require('http');
const chokidar = require('chokidar');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

// Serve static files from the root folder
app.use(express.static(__dirname));

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('A user connected');
});

// Watch for changes in the root directory
const watcher = chokidar.watch(__dirname);

watcher.on('change', (filePath) => {
  console.log(`${filePath} has changed. Reloading...`);
  io.emit('reload'); // Emit a reload event to connected clients
});

// Explicitly handle requests to the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
