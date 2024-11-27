const connectionString = "InstrumentationKey=1ed14b85-2501-4762-a20e-1b8339da0cd5;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=a4b55d1c-c833-4ca9-869e-e4bf8d1ecd4e";

import applicationInsights from "applicationinsights";
import { ConfigurationObjectFeatureFlagProvider, FeatureManager } from "@microsoft/feature-management";
import { publishTelemetry } from "./fm.mjs";

applicationInsights.setup(connectionString)
  .setAutoCollectRequests(false)
  .setSendLiveMetrics(true)
  .enableWebInstrumentation(true, connectionString)
  .start();

// const eventProperties = {
//   "TargetingId": "123456",
// };

// applicationInsights.defaultClient.trackEvent({name: "TestEvent", properties: eventProperties});

const json = {
  "feature_management": {
    "feature_flags": [
      {
        "id": "Beta",
        "enabled": true,
        "telemetry": {
          "enabled": true
        }
      }
    ]
  }
}

const fp = new ConfigurationObjectFeatureFlagProvider(json);
const fm = new FeatureManager(fp, { onFeatureEvaluated: publishTelemetry})


await fm.isEnabled("Beta");

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 5000;

app.get('/', (req, res) => {
    applicationInsights.defaultClient.trackEvent({name: "hello", properties: eventProperties})
    res.send(`hello world`);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});