
const connectionString = "InstrumentationKey=f02d78f6-0f63-44ba-a6c8-a46bf4814b93;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=cbe807ce-9938-42e2-a934-c51b1d0d4cbb";


const { useAzureMonitor } = require("@azure/monitor-opentelemetry");

const options = {
  azureMonitorExporterOptions: {
    connectionString: connectionString
  },
  enableLiveMetrics: true,
  spanProcessors: [mySpanProcessor],
  logRecordProcessors: [myLogRecordProcessor]
};

useAzureMonitor(options);

const api = require("@opentelemetry/api");
function attachTargetingId(id) {
    const span = api.trace.getActiveSpan();
    span.setAttribute("TargetingId", id)
}

const api_logs_1 = require("@opentelemetry/api-logs");
const logger = api_logs_1.logs.getLogger("TestLogger");

function trackEvent(name) {
    const attributes = {};
    attributes["TargetingId"] = "test123456"
    const body = {name: name, version: 2};
    const logRecord = {attributes: attributes, body: body};
    logRecord.attributes["_MS.baseType"] = "EventData";
    logger.emit(logRecord);
}

const express = require('express');
const app = express();
const port = 5000;


app.get('/', (req, res) => {
    attachTargetingId("1234");
    trackEvent("test event");
    res.send("hello world");
});

app.get('/test', (req, res) => {
    res.send("test");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
