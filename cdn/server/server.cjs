const https = require('https');
const fs = require('fs');
const url = require('url');

const selfsigned = require('selfsigned');
const attrs = [{ name: 'commonName', value: 'localhost' }];
const certOptions = { keySize: 2048, selfSigned: true };

const pems = selfsigned.generate(attrs, certOptions);

// Write the key and certificate to files
fs.writeFileSync('server.key', pems.private);
fs.writeFileSync('server.cert', pems.cert);


// Load SSL certificate and private key
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

const responseBody = {
  items: [
    {
      key: ".appconfig.featureflag/Alpha",
      label: null,
      value: "{\"id\":\"Alpha\",\"description\":\"\",\"enabled\":false,\"conditions\":{}}",
      contentType: "application/vnd.microsoft.appconfig.ff+json;charset=utf-8",
      eTag: {},
      lastModified: "2024-07-08T01:48:04+00:00",
      isReadOnly: false,
      tags: {}
    },
    {
      key: ".appconfig.featureflag/Beta",
      label: null,
      value: "{\"id\":\"Beta\",\"description\":\"\",\"enabled\":false,\"conditions\":{}}",
      contentType: "application/vnd.microsoft.appconfig.ff+json;charset=utf-8",
      eTag: {},
      lastModified: "2024-07-08T01:47:58+00:00",
      isReadOnly: false,
      tags: {}
    }
  ]
};

// Create an HTTPS server
https.createServer(options, (req, res) => {
  // const { method, headers } = req;
  // const requestUrl = url.parse(req.url, true);
  // console.log(`Received ${method} request for ${requestUrl.pathname}`);
  // console.log('Headers:', headers);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(responseBody));

}).listen(8443, () => {
  console.log('Server listening on https://localhost:8443');
});

