// const connectionString = "InstrumentationKey=f02d78f6-0f63-44ba-a6c8-a46bf4814b93;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=cbe807ce-9938-42e2-a934-c51b1d0d4cbb";

// import appInsights from "applicationinsights"; // default import (module.default)
// appInsights.setup(connectionString)
//   .setAutoCollectRequests(true) // not work for esm
//   .setSendLiveMetrics(true)
//   .start();

// appInsights.defaultClient.trackEvent({name: "test"})

// const telemetry = new appInsights.TelemetryClient(connectionString);
// telemetry.config.enableAutoCollectRequests = true;
// telemetry.config.enableSendLiveMetrics = true;
// telemetry.initialize();
// telemetry.trackEvent({name: "test"});

// import * as applicationInsights from "applicationinsights" // namespace import

// applicationInsights.setup(connectionString).start();
// console.log(applicationInsights.defaultClient === undefined); // true

// const module = await import("applicationinsights"); // side effect import
// module.setup(connectionString).start()
// console.log(module)
// console.log(module.defaultClient === undefined) // true
// console.log(module.default.defaultClient === undefined) // false

import express from 'express';

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  const targetingId = req.headers['targetingid'];
  res.send(`id: ${targetingId}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


