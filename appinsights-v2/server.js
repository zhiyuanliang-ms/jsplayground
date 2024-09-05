const connectionString = "InstrumentationKey=f02d78f6-0f63-44ba-a6c8-a46bf4814b93;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=cbe807ce-9938-42e2-a934-c51b1d0d4cbb";

const appInsights = require("applicationinsights");




appInsights.setup(connectionString)
    .setAutoCollectRequests(true)
    .setSendLiveMetrics(true)
    .start();

const express = require('express');
const app = express();
const port = 5000;

const attachTargetingId = (envelope) => {
  const context = appInsights.getCorrelationContext();
  if (context) {
    envelope.data.baseData.properties["TargetingId"] = context?.customProperties.getProperty("TargetingId");
  }
}

appInsights.defaultClient.addTelemetryProcessor(attachTargetingId);


app.get('/', (req, res) => {

  const context = appInsights.getCorrelationContext();
  context.customProperties.setProperty("TargetingId", "123abc")

  res.send(`hello`);
});

app.get('/test', (req, res) => {
  res.send(`test`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});