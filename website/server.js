const https = require('https');
const fs = require('fs');
const path = require('path');

// 1. Load SSL certificates
const key = fs.readFileSync('10.10.81.74-key.pem');
const cert = fs.readFileSync('10.10.81.74.pem');

// 2. Create server
const server = https.createServer({ key, cert }, (req, res) => {
  console.log(`Request: ${req.url}`);
  
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