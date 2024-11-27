const connectionString = "InstrumentationKey=f02d78f6-0f63-44ba-a6c8-a46bf4814b93;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=cbe807ce-9938-42e2-a934-c51b1d0d4cbb";

// const http = require("http");

const appInsights = require("applicationinsights");

appInsights.setup(connectionString)
    .setAutoCollectRequests(true)
    .setSendLiveMetrics(true)
    .start();
appInsights.defaultClient.trackEvent({name: "test"});

// const telemetry = new appInsights.TelemetryClient(connectionString);
// telemetry.config.enableAutoCollectRequests = true;
// telemetry.config.enableSendLiveMetrics = true;
// telemetry.initialize();
// telemetry.trackEvent({name: "test"});

const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    currentActiveSpan
  });

app.get('/test', (req, res) => {
  res.send("test");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});