require('dotenv').config();
const https = require('https');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// 1. Load SSL certificates
const key = fs.readFileSync('10.10.81.74-key.pem');
const cert = fs.readFileSync('10.10.81.74.pem');

// Get backend URL from .env or fallback
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

// 2. Create server
const server = https.createServer({ key, cert }, (req, res) => {
  console.log(`Request: ${req.url}`);

  if (req.method === 'POST' && req.url === '/analyze') {
    let body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', async () => {
      body = Buffer.concat(body);
      let contentType = req.headers['content-type'] || '';
      try {
        // Forward the POST to the backend
        const backendRes = await axios.post(
          `${BACKEND_URL}/analyze`,
          body,
          {
            headers: {
              'Content-Type': contentType
            }
          }
        );
        res.writeHead(backendRes.status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(backendRes.data));
      } catch (err) {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Could not reach backend', details: err.message }));
      }
    });
    return;
  }

  // Serve static files
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.writeHead(200);
      res.end(content);
    }
  });
});

// 3. Start server
server.listen(5500, '10.10.81.74', () => {
  console.log('Server running at https://10.10.81.74:5500');
});