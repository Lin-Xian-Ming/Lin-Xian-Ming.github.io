const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const ROOT = 'D:\\CODEXYUNXING';

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml"
};

http.createServer((req, res) => {
  let filePath = req.url === "/" ? "/index.html" : decodeURIComponent(req.url).split('?')[0];
  const fullPath = path.join(ROOT, filePath);
  const ext = path.extname(fullPath);
  
  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    res.writeHead(200, { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Content-Type': MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => {
  process.on('uncaughtException', function(e) { console.error(e); });
console.log("Server running at http://localhost:" + PORT);
});




