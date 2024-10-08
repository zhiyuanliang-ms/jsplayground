const connectionString = "InstrumentationKey=f02d78f6-0f63-44ba-a6c8-a46bf4814b93;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=cbe807ce-9938-42e2-a934-c51b1d0d4cbb";
const appInsights = require("applicationinsights");

appInsights.setup(connectionString)
    .setAutoCollectRequests(true)
    .setSendLiveMetrics(true)
    .start();

const api = require("@opentelemetry/api");
function attachTargetingId(id) {
    const span = api.trace.getActiveSpan();
    span.setAttribute("TargetingId", id)
}

//////////////////// express server //////////////////////
const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {

    
    attachTargetingId("123456");

    appInsights.defaultClient.trackEvent({name: "hellov3"});
    res.send(`hello world`);
});

app.get('/test', (req, res) => {
    attachTargetingId("123456");

    appInsights.defaultClient.trackEvent({name: "testv3"});
    res.send(`test`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});