const appInsights = require("applicationinsights");
appInsights.setup("InstrumentationKey=4d6ce866-937d-4ab4-8b1d-a9d4da485b64;IngestionEndpoint=https://eastasia-0.in.applicationinsights.azure.com/;LiveEndpoint=https://eastasia.livediagnostics.monitor.azure.com/;ApplicationId=9e20d3f8-2192-428e-b12f-77f8d601c7ba")
  .setAutoCollectRequests(true)
  .setSendLiveMetrics(true)
  .start();

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  res.end(`
    <h1>Hello World!</h1>
    <p>URL: ${req.url}</p>
    <p>Method: ${req.method}</p>
    <p>Headers:</p>
    <ul>
      ${Object.entries(req.headers).map(([key, value]) => `<li>${key}: ${value}</li>`).join('')}
    </ul>
  `);
});

var port = normalizePort(process.env.PORT || '3000');

server.listen(port);

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}