// A preview of the site over http: a browser won't load the font from file://, so open the pages through this.
// Their registration's own static files (/js, /css, /images on their server) are fetched from their site, read-only;
// nothing is ever sent to their server, so no test registration can reach it.
//   node serve.cjs   → http://localhost:5050
const http = require('http');
const fs = require('fs');
const path = require('path');
const DIR = __dirname;
const PORT = 5050;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.woff2': 'font/woff2',
};

http.createServer(async (req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  if (req.method === 'GET' && /^\/(js|css|images)\//.test(url)) {
    try {
      const r = await fetch(`https://www.incoseil.org${req.url}`);
      res.writeHead(r.status, { 'content-type': r.headers.get('content-type') || 'application/octet-stream' });
      return res.end(Buffer.from(await r.arrayBuffer()));
    } catch {
      res.writeHead(502);
      return res.end('their server did not answer');
    }
  }
  const file = path.join(DIR, url === '/' ? 'index.html' : url);
  if (!file.startsWith(DIR) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404);
    return res.end('not found');
  }
  res.writeHead(200, { 'content-type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`the site: http://localhost:${PORT}`));
