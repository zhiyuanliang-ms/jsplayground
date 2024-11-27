import https from 'https';
import { readFileSync } from 'fs';
import { parse } from 'url';

// Load SSL certificate and private key
const options = {
  key: readFileSync('server.key'),
  cert: readFileSync('server.cert')
};

// Create an HTTPS server
https.createServer(options, (req, res) => {
  // Log request details
  const { method, headers } = req;
  const requestUrl = parse(req.url, true);

  console.log(`Received ${method} request for ${requestUrl.pathname}`);
  console.log('Headers:', headers);

  // Log the body if there's any
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    if (body) {
      console.log('Body:', body);
    }

    // Respond to the request
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, HTTPS!\n');
  });

}).listen(8443, () => {
  console.log('Server listening on https://localhost:8443');
});
