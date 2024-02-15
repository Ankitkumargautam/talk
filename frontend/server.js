const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const http = require('http');

const app = express();
const port = 3287;

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Proxy requests with "/api" prefix to another server
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:5000', // Your API server's address
    changeOrigin: true,
  })
);

// Serve index.html for all other routes
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
