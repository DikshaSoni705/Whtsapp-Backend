// src/server.js

require("dotenv").config();    // ✅ Load .env before anything else

const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const initSocket = require("./config/socket");

// ✅ Environment Port
const PORT = process.env.PORT || 5000;

// Create server
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Connect MongoDB
connectDB();




// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
